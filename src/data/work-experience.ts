export type WorkExperienceEntry = {
  dates: string;
  company: string;
  role: string;
  description: string;
};

export const workExperience: WorkExperienceEntry[] = [
  {
    dates: "Sep 2024 - Jun 2026",
    company: "Webflow",
    role: "Senior Product Designer",
    description:
      "Took AEO Analytics from concept to launch in 6 months — a new product helping marketers maintain visibility as search shifts to AI — contributing to multi-million dollar revenue. Across Webflow Optimize, shipped workflow improvements and AI-assisted ideation tools that measurably increased product adoption.",
  },
  {
    dates: "Dec 2021 - Sep 2024",
    company: "Optimizely",
    role: "Senior Product Designer",
    description:
      "Designed core features for Optimizely's experimentation and personalization platform. Built an AI-powered variable suggestion tool that doubled adoption of the feature. Established the AI design system for Opal — creating the component library and guidelines that standardized AI patterns across the product suite.",
  },
  {
    dates: "May 2021 - Dec 2021",
    company: "IBM",
    role: "UX Designer",
    description:
      "Partnered with enterprise clients to surface workflow pain points, then translated those findings into product designs that positioned IBM's automation capabilities as targeted solutions.",
  },
  {
    dates: "Jun 2020 - May 2021",
    company: "Core Digital Media",
    role: "UX Designer",
    description:
      "Redesigned the mortgage lender search experience based on user research — driving a 30% increase in revenue per visitor. Supported ongoing experimentation by writing test hypotheses and designing A/B variations.",
  },
  {
    dates: "Apr 2015 - Jul 2017",
    company: "SoftBank",
    role: "Product Manager",
    description:
      "Brought analytics and IoT products from concept to launch, working with enterprise partners such as GE Digital and Google to define product direction and ship new offerings.",
  },
];
