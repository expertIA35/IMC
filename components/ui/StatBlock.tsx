import React from "react";

export const StatBlock: React.FC = () => {
  const stats = [
    { valeur: "100%", label: "Diplômes vérifiés & certifiés", precision: "Contrôle unitaire avant publication" },
    { valeur: "82%", label: "Taux de résolution amiable", precision: "Sur les dossiers de médiation instruits" },
    { valeur: "< 15 j", label: "Délai moyen de prise en charge", precision: "Orientation procédurale urgente" },
    { valeur: "2 ans", label: "Validité du Label privé", precision: "Renouvellement soumis à audit continu" },
  ];

  return (
    <section className="py-16 bg-[#0B1F3A] text-white border-b border-[#143054]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C9A227] mb-2">
                {s.valeur}
              </span>
              <span className="text-sm font-semibold text-neutral-200 mb-1">
                {s.label}
              </span>
              <span className="text-xs text-neutral-400">
                {s.precision}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

