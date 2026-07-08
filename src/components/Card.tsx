import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies";

type CardProps = {
  caseStudy: CaseStudy;
  onClick: () => void;
};

export default function Card({ caseStudy, onClick }: CardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer flex-col items-start overflow-hidden rounded-[8px] text-left border border-border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]"
    >
      <div className="relative aspect-16/9 w-full overflow-hidden">
        <Image
          src={caseStudy.cardImage}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-4 border-t border-border bg-background p-4">
        <div className="flex flex-col gap-0.5 text-default-text">
          <p className="text-base font-semibold">{caseStudy.title}</p>
          <p className="text-base">{caseStudy.description}</p>
        </div>
        <p className="font-mono text-sm lowercase text-secondary-text">
          {caseStudy.tag}
        </p>
      </div>
    </button>
  );
}
