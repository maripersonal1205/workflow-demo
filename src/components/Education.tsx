import { education } from "@/data/education";

export default function Education() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-mono text-sm lowercase text-secondary-text">
        // education
      </h2>
      <div className="flex flex-col">
        {education.map((entry, index) => (
          <div key={entry.school} className="flex gap-4">
            <div className="flex w-3 flex-col items-center">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-previous-signal" />
              {index < education.length - 1 && (
                <span className="mt-2 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 pb-6 sm:flex-row">
              <p className="shrink-0 font-mono text-sm lowercase text-secondary-text sm:w-[207px]">
                {entry.dates}
              </p>
              <div className="flex flex-col">
                <p className="text-base font-semibold text-default-text">
                  {entry.school}
                </p>
                <p className="text-base text-secondary-text">{entry.program}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
