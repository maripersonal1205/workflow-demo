export default function Hero() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col items-start gap-6">
        <div className="flex w-full max-w-[755px] flex-col font-serif text-[32px] leading-[1.1] text-default-text sm:text-[40px]">
          <p className="w-full font-normal">
            I learn problems until they feel like my own.
          </p>
          <p className="w-full font-light">
            Now that ideas can become real in hours, I am uncovering user
            insights and constraints I couldn&apos;t reach before.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-16 text-base">
        <div className="animate-fade-in-up relative flex flex-col items-start gap-0.5 pl-6 text-default-text">
          <span className="animate-grow-vertical absolute top-0 left-0 h-full w-[3px] bg-default-text" />
          <p>Previously:</p>
          <p className="font-semibold">Webflow · Optimizely · IBM</p>
        </div>
        <div className="animate-fade-in-up relative flex flex-col items-start gap-0.5 pl-6 text-secondary-text">
          <span className="animate-fade-in absolute top-0 left-0 h-full w-0.5 bg-border-content" />
          <p>Focus areas:</p>
          <p>Enterprise SaaS · Analytics · Experimentation · AI</p>
        </div>
      </div>
    </section>
  );
}
