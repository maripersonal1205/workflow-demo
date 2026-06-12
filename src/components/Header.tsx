const NAV_LINKS = [
  { label: "Work", href: "/" },
  { label: "Resume", href: "#work-experience" },
];

const SOCIAL_LINKS = [
  { label: "Linkedin", href: "https://www.linkedin.com/in/marihiranouw/" },
  { label: "Email", href: "mailto:hello@marihirano.com" },
];

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
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
          <span className="text-[18px] text-border-content">|</span>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-secondary-text"
              {...(link.label === "Linkedin"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
