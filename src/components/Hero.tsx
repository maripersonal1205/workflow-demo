export default function Hero() {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex flex-col items-start gap-6">
        <p className="w-full font-serif text-[48px] leading-[1.1] tracking-[-0.008em] text-default-text">
          <span className="font-medium">I learn problems until they feel like my own.</span>{" "}
          <span className="font-light">
            Now that ideas can become real in hours, I can uncover user
            insights and constraints I simply couldn&apos;t reach before.
          </span>
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 border-l-4 border-border-content pl-6 text-base">
        <div className="flex flex-wrap items-start gap-x-2">
          <p className="shrink-0 text-secondary-text">Previously:</p>
          <p className="min-w-0 text-default-text">Webflow, Optimizely, IBM</p>
        </div>
        <div className="flex flex-wrap items-start gap-x-2">
          <p className="shrink-0 text-secondary-text">Expertise:</p>
          <p className="min-w-0 text-default-text">
            Enterprise SaaS, Analytics, Experimentation, AI
          </p>
        </div>
      </div>
    </section>
  );
}
