export default function Hero() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center gap-2 font-mono text-sm lowercase text-secondary-text">
        <span className="size-2 shrink-0 rounded-full bg-signal" />
        <span>
          based in LA <span className="text-border-content">|</span> open for
          new roles
        </span>
      </div>
      <div className="flex max-w-[755px] flex-col gap-4 font-display text-default-text">
        <h1 className="text-[32px] font-semibold leading-[1.3] sm:text-[40px]">
          Hi! I&apos;m Mari.
        </h1>
        <p className="text-[20px] font-light leading-[1.4] sm:text-[24px]">
          I am a product designer who solved complex enterprise problems at
          companies like <strong className="font-bold">Webflow</strong>,{" "}
          <strong className="font-bold">Optimizely</strong>, and{" "}
          <strong className="font-bold">IBM</strong>.
        </p>
        <p className="text-[20px] font-light leading-[1.4] sm:text-[24px]">
          I enjoy learning new problem spaces deeply until they feel like my
          own. Lately, I&apos;ve been using AI to bring ideas to life faster and
          uncover even deeper insights.
        </p>
      </div>
    </section>
  );
}
