import { workExperience } from "@/data/work-experience";

export default function WorkExperience() {
  return (
    <section id="work-experience" className="flex flex-col gap-6 scroll-mt-24">
      <h2 className="font-serif text-lg font-semibold text-default-text">
        Work experience
      </h2>
      <div className="flex flex-col">
        {workExperience.map((entry, index) => (
          <div key={entry.company} className="flex gap-4">
            <div className="flex w-3 flex-col items-center">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-previous-signal" />
              {index < workExperience.length - 1 && (
                <span className="mt-2 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 pb-8 sm:flex-row">
              <p className="shrink-0 text-base text-secondary-text sm:w-[207px]">
                {entry.dates}
              </p>
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="flex flex-col">
                  <p className="font-serif text-lg font-semibold text-default-text">
                    {entry.company}
                  </p>
                  <p className="text-base text-secondary-text">{entry.role}</p>
                </div>
                <p className="text-base text-default-text">
                  {entry.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
