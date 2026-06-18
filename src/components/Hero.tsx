export default function Hero() {
  return (
    <section className="flex flex-col gap-10">
      <p className="font-mono text-sm text-secondary-text">
        // senior product designer{" "}
        <span className="text-border-content">|</span> based in LA
      </p>
      <div className="flex max-w-[755px] flex-col gap-4 font-display text-default-text">
        <h1 className="text-[32px] font-bold leading-[1.3] sm:text-[40px]">
          Hi! I&apos;m Mari.
        </h1>
        <p className="text-[20px] font-light leading-[1.4] sm:text-[24px]">
          I enjoy learning new problem spaces deeply until they feel like my
          own. Lately, I&apos;ve been using AI to bring ideas to life faster and
          uncover insights we couldn&apos;t reach before.
        </p>
        <p className="text-[20px] font-light leading-[1.4] sm:text-[24px]">
          Previously at <strong className="font-semibold">Webflow</strong>,{" "}
          <strong className="font-semibold">Optimizely</strong>, and{" "}
          <strong className="font-semibold">IBM</strong>, I solved complex
          challenges for enterprise customers.
        </p>
      </div>
    </section>
  );
}
