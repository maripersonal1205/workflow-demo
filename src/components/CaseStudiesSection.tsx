"use client";

import { useState } from "react";
import { caseStudies } from "@/data/case-studies";
import Card from "./Card";
import CaseStudyModal from "./CaseStudyModal";

export default function CaseStudiesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = caseStudies.findIndex((cs) => cs.id === activeId);
  const activeCaseStudy = caseStudies[activeIndex];
  const previousCaseStudy =
    activeIndex > 0 ? caseStudies[activeIndex - 1] : undefined;
  const nextCaseStudy =
    activeIndex >= 0 && activeIndex < caseStudies.length - 1
      ? caseStudies[activeIndex + 1]
      : undefined;

  return (
    <section id="work" className="flex scroll-mt-25 flex-col gap-6">
      <h2 className="font-mono text-sm lowercase text-secondary-text">
        // recent work
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {caseStudies.map((caseStudy) => (
          <Card
            key={caseStudy.id}
            caseStudy={caseStudy}
            onClick={() => setActiveId(caseStudy.id)}
          />
        ))}
      </div>
      {activeCaseStudy && (
        <CaseStudyModal
          caseStudy={activeCaseStudy}
          onClose={() => setActiveId(null)}
          previousCaseStudy={previousCaseStudy}
          nextCaseStudy={nextCaseStudy}
          onNavigate={(caseStudy) => setActiveId(caseStudy.id)}
        />
      )}
    </section>
  );
}
