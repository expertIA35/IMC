import { NextResponse, type NextRequest } from "next/server";

// Fallback in-memory rate limiter si Upstash n'est pas configuré en dev/test
const localIpMap = new Map<string, { count: number; timestamp: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const maxReq = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "60", 10);
  const windowSec = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || "60", 10);

  if (upstashUrl && upstashToken) {
    try {
      const key = `rate-limit:${ip}`;
      // Incrément atomique via REST API Upstash
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, windowSec],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const currentCount = data?.[0]?.result || 1;
        return currentCount <= maxReq;
      }
    } catch (e) {
      console.warn("Échec contact Upstash Redis, repli mémoire :", e);
    }
  }

  // Fallback in-memory
  const now = Date.now();
  const entry = localIpMap.get(ip);
  if (!entry || now - entry.timestamp > windowSec * 1000) {
    localIpMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= maxReq;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirection forcée HTTP -> HTTPS en production
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host") || "";
  if (
    process.env.NODE_ENV === "production" &&
    proto === "http" &&
    !host.includes("localhost")
  ) {
    return NextResponse.redirect(
      `https://${host}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    );
  }

  // Rate Limiting par adresse IP
  const ip =
    request.ip ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";

  const isAllowed = await checkRateLimit(ip);
  if (!isAllowed) {
    return new NextResponse(
      JSON.stringify({
        error: "Trop de requêtes. Veuillez patienter avant de renouveler l'opération.",
        status: 429,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    );
  }

  // Génération du Nonce CSP cryptographique
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com data:;
    connect-src 'self' https://*.upstash.io https://api.resend.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  // Propagation des headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Headers de sécurité institutionnels stricts
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    /*
     * Matcher toutes les routes de requêtes sauf :
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico, sitemap.xml, robots.txt
     * - fichiers avec extension (.svg, .png, .jpg, .jpeg, .pdf)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};

