export default function Hero() {
  return (
    <section className="flex flex-col gap-10">
      <p className="font-mono text-sm text-secondary-text">
        // about
      </p>
      <div className="flex max-w-[830px] flex-col gap-4 font-display text-default-text">
        <p className="text-[20px] font-light leading-[1.5] sm:text-[24px]">
          Hi there, I&apos;m Mari.{" "}
          <strong className="font-semibold">Senior product designer</strong>{" "}
          based in LA.
        </p>
        <p className="text-[20px] font-light leading-[1.5] sm:text-[24px]">
          I enjoy working with complex systems, where I get to design simplified
          experiences without losing what makes the systems powerful.
        </p>
        <p className="text-[20px] font-light leading-[1.5] sm:text-[24px]">
          Previously at <strong className="font-semibold">Webflow</strong>,{" "}
          <strong className="font-semibold">Optimizely</strong>, and{" "}
          <strong className="font-semibold">IBM</strong>, I untangled intricate
          challenges for developers, designers, and marketers.
        </p>
      </div>
    </section>
  );
}
