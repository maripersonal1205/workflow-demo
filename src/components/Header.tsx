const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#work-experience" },
];

const SOCIAL_LINKS = [
  { label: "Linkedin", href: "https://www.linkedin.com/in/marihiranouw/" },
  { label: "Email", href: "mailto:hello@marihirano.com" },
];

const underlineClass =
  "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-none group-hover:scale-x-100 group-hover:transition-transform group-hover:duration-300 group-hover:delay-150 group-hover:ease-out";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background py-6">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-start gap-4 px-6 text-base md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 font-serif text-default-text">
          <p className="whitespace-nowrap font-medium">Mari Hirano</p>
          <p className="whitespace-nowrap font-normal">Senior Product Designer</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 whitespace-nowrap font-serif font-normal text-default-text">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="group relative">
              {link.label}
              <span className={underlineClass} />
            </a>
          ))}
          <span className="text-[18px] text-border-content">|</span>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-secondary-text"
              {...(link.label === "Linkedin"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
              <span className={underlineClass} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
