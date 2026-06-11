"use client";

import { useState } from "react";
import { caseStudies } from "@/data/case-studies";
import Card from "./Card";
import CaseStudyModal from "./CaseStudyModal";

export default function CaseStudiesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCaseStudy = caseStudies.find((cs) => cs.id === activeId);

  return (
    <section id="work" className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {caseStudies.map((caseStudy) => (
        <Card
          key={caseStudy.id}
          caseStudy={caseStudy}
          onClick={() => setActiveId(caseStudy.id)}
        />
      ))}
      {activeCaseStudy && (
        <CaseStudyModal
          caseStudy={activeCaseStudy}
          onClose={() => setActiveId(null)}
        />
      )}
    </section>
  );
}
