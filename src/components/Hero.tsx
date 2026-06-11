export default function Hero() {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex flex-col items-start gap-6">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-signal" />
            <p className="whitespace-nowrap text-secondary-text">Available for work</p>
          </div>
          <p className="whitespace-nowrap text-base text-border-content">|</p>
          <p className="whitespace-nowrap text-secondary-text">Based in LA</p>
        </div>
        <p className="w-full font-serif text-[32px] leading-[1.2] text-default-text">
          I learn problems until they feel like my own — now that ideas can
          become real in hours, I can uncover user insights and constraints I
          simply couldn&apos;t reach before.
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 border-l border-border-content pl-6 text-sm">
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
