export type LaunchDetail = {
  label: string;
  href: string;
};

export type CaseStudyImage = {
  src: string;
  /** CSS object-position, used to match the crop shown in the Figma design */
  objectPosition?: string;
  /** Higher-resolution version of `src`, used in the lightbox instead of `src` */
  lightboxSrc?: string;
  /** Optional caption shown above the image (e.g. "Before" / "After") */
  label?: string;
};

export type CaseStudyImageGroup = {
  /** Caption shown above the row of images */
  label: string;
  images: CaseStudyImage[];
};

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  tag: string;
  cardImage: string;
  /** Full-width media shown at the top of the modal. Placeholder until video is ready. */
  coverImage: string;
  /** Optional looping video shown at the top of the modal instead of `coverImage`. */
  coverVideo?: string;
  role: string;
  company: string;
  status: string;
  impact?: string;
  images?: CaseStudyImage[];
  /** Labeled groups of images shown on a dark panel (alternative to `images`) */
  imageGroups?: CaseStudyImageGroup[];
  body: string[];
  /** Heading shown before the launch links. Defaults to "To learn more, visit:" */
  launchLabel?: string;
  launchDetails?: LaunchDetail[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "aeo-analytics",
    title: "AEO Analytics",
    description:
      "Analytics that help marketers stay visible as search shifts from traditional engines to AI.",
    tag: "Webflow - 2026",
    cardImage: "/images/case-studies/aeo-analytics.png",
    coverImage: "/images/case-studies/placeholder/aeo-analytics.png",
    coverVideo: "/case-videos/AEO.mp4",
    role: "Design lead",
    company: "Webflow",
    status: "Shipped in Spring 2026",
    impact: "$1.3M in revenue",
    images: [
      { src: "/images/case-studies/modal/aeo-analytics/1.png", objectPosition: "97% 41%" },
      { src: "/images/case-studies/modal/aeo-analytics/2.png" },
      { src: "/images/case-studies/modal/aeo-analytics/3.png", objectPosition: "100% 24%" },
      { src: "/images/case-studies/modal/aeo-analytics/4.png", objectPosition: "100% 32%" },
    ],
    body: [
      "As AI-powered search reshapes how people discover brands online, companies began losing organic traffic to answer engines they had no visibility into. A wave of standalone AEO tools emerged to help, but they couldn't connect insights to action on the website itself — leaving Webflow customers managing yet another disconnected platform. Webflow was uniquely positioned to solve this natively: insights and recommendations built directly into the product, tied to the actual site.",
      "I was the lead designer for the analytics and insights workstream — the data foundation the entire AEO product depended on. Working within a tight 6-month timeline across three parallel design workstreams, I used AI-assisted development tools to rapidly build coded prototypes that got in front of customers early and often. This let us gather real behavioral feedback rather than scripted reactions, make faster sequencing decisions under pressure, and hand off to engineering with significantly less back-and-forth.",
      "The product launched in May 2026 to all enterprise customers. Through a private beta with continuous feedback sessions, we closed 50+ deals before general availability and generated $1.3M in revenue ahead of GA launch.",
    ],
    launchDetails: [
      { label: "Product feature page", href: "https://webflow.com/feature/aeo" },
      { label: "Feature announcement", href: "https://webflow.com/blog/introducing-webflow-aeo" },
    ],
  },
  {
    id: "experiment-ai-copy",
    title: "Experiment AI copy suggestions",
    description:
      "An AI assistant that generates copy variations for A/B tests based on best practices.",
    tag: "Webflow - 2025",
    cardImage: "/images/case-studies/experiment-ai-copy.png",
    coverImage: "/images/case-studies/placeholder/experiment-ai-copy.png",
    coverVideo: "/case-videos/experiment-ai-copy.mp4",
    role: "Design lead",
    company: "Webflow",
    status: "Shipped in summer 2025",
    impact: "Product adoption increase by 30%",
    images: [
      { src: "/images/case-studies/modal/experiment-ai-copy/1.png", lightboxSrc: "/images/case-studies/modal/experiment-ai-copy/1-full.png" },
      { src: "/images/case-studies/modal/experiment-ai-copy/2.png", objectPosition: "100% 25%" },
    ],
    body: [
      "Marketers using Webflow Optimize had the tools to run experiments, but not the time or bandwidth to come up with what to test. Without a way to quickly generate quality ideas, customers weren't running experiments, weren't seeing value, and were at risk of churning. The challenge was designing a solution that helped them move faster without sacrificing the quality of what they were testing.",
      "I led design from discovery through launch, scoping the feature around AI-powered copy suggestions — the most frequently run and highest-impact experiment type. The key design challenge was fitting a marketer's workflow into a product built primarily for designers and developers. The solution wasn't a different interface, but a different interaction: users opt in to AI assistance at the start of experiment setup, land on a draft with pre-populated best-practice prompts already waiting, and receive structured copy variations they can apply in a few clicks — guided enough for speed, without diverging from Webflow's existing AI patterns.",
      "The feature shipped in summer 2025. Experiments created increased by approximately 30% following launch, and the interaction pattern was designed to scale — setting the foundation for future AI-assisted suggestion types beyond copy.",
    ],
    launchDetails: [
      {
        label: "Feature announcement",
        href: "https://webflow.com/updates/custom-prompts-optimize",
      },
    ],
  },
  {
    id: "conclude-experiments",
    title: "Conclude experiments",
    description:
      "A workflow that seamlessly applies experiment variations to the base.",
    tag: "Webflow - 2025",
    cardImage: "/images/case-studies/conclude-experiments.png",
    coverImage: "/images/case-studies/placeholder/conclude-experiments.png",
    coverVideo: "/case-videos/conclude-experiment.mp4",
    role: "Design lead",
    company: "Webflow",
    status: "Shipped in summer 2025",
    impact: "Product adoption increase by 12%",
    images: [
      { src: "/images/case-studies/modal/conclude-experiments/1.png", lightboxSrc: "/images/case-studies/modal/conclude-experiments/reports.png" },
      { src: "/images/case-studies/modal/conclude-experiments/2.png", objectPosition: "48% 71%" },
    ],
    body: [
      "When marketers in Webflow Optimize identified a winning experiment variation, applying those changes to their base site required a slow, manual process — cross-referencing reports, identifying changed elements, and updating them one by one. Beyond the friction, a hidden technical constraint meant that any element tied to an unarchived experiment couldn't be used in new experiments, putting a hard ceiling on how much customers could actually test.",
      "I led design from discovery through launch, and expanded the scope mid-project after surfacing the archiving constraint. The solution combined a streamlined conclude-and-apply flow with automatic archiving as the default — but first required validating a key trade-off: would customers accept losing visual change history in exchange for the ability to run more experiments? Research sessions with existing customers gave a clear answer — every participant chose experimentation flexibility over record-keeping, and most were already managing visual records elsewhere. Copy also required close collaboration with a content designer, as the concepts involved were complex and needed to feel effortless in the UI.",
      "The feature launched in summer 2025 and drove a 12% increase in new experiments started. Customers consistently flagged it in sales calls as a meaningful quality-of-life improvement — a strong signal for a feature that solved a pain point quietly but effectively.",
    ],
    launchDetails: [
      {
        label: "Feature announcement",
        href: "https://webflow.com/updates/easily-apply-winning-variations-in-optimize",
      },
    ],
  },
  {
    id: "variable-suggestions",
    title: "Variable suggestions",
    description:
      "AI-generated experiment variables based on a user's hypothesis.",
    tag: "Optimizely - 2024",
    cardImage: "/images/case-studies/variable-suggestions-2.png",
    coverImage: "/images/case-studies/placeholder/variable-suggestions.png",
    role: "Design lead",
    company: "Optimizely",
    status: "Shipped in 2024",
    impact: "Feature adoption increased by 2X",
    images: [
      { src: "/images/case-studies/modal/variable-suggestions/1.png", lightboxSrc: "/images/case-studies/modal/variable-suggestions/1-full.png" },
      { src: "/images/case-studies/modal/variable-suggestions/2.png", objectPosition: "50% 1%", lightboxSrc: "/images/case-studies/modal/variable-suggestions/2-full.png" },
    ],
    body: [
      "Optimizely's Feature Experimentation was purpose-built for engineers, and as the user base expanded to include non-technical users like marketers, that foundation started to create friction. Variables — one of the most powerful features in the product — were going largely unused because the concept was too abstract and the UI assumed technical fluency. Without variables, users couldn't build meaningful experiment variations, which meant fewer experiments, less realized value, and customers at risk of churning.",
      "I identified AI as the right solution for this specific problem: educational copy could explain what variables were, but it couldn't generate relevant examples for a user's specific experiment. After validating the concept informally in ChatGPT, I designed the feature around Optimizely's global AI assistant side panel — context-aware, so it would automatically prompt users for their experiment hypothesis when they entered the variable creation flow. The AI's response was structured as ready-to-use variables that could be pulled directly into input fields with a click.",
      "Within a month of launch, variables created doubled, variations increased by 50%, and experiments enabled grew by 33%. The AI-to-input interaction pattern introduced here became a reusable standard adopted across multiple Optimizely products.",
    ],
    launchDetails: [
      {
        label: "Product feature page",
        href: "https://support.optimizely.com/hc/en-us/articles/38655200299789-Create-flag-variables",
      },
    ],
  },
  {
    id: "feature-flag-dashboard",
    title: "Feature flag dashboard improvement",
    description:
      "A redesigned dashboard that surfaces experiment variations, status, and results at a glance.",
    tag: "Optimizely - 2024",
    cardImage: "/images/case-studies/feature-flag-dashboard.png",
    coverImage: "/images/case-studies/placeholder/feature-flag-dashboard.png",
    role: "Design lead",
    company: "Optimizely",
    status: "Shipped in 2024",
    impact: "Pattern adoption beyond the product",
    images: [
      {
        src: "/images/case-studies/modal/feature-flag-dashboard/before.png",
        label: "Before",
        objectPosition: "0% 0%",
      },
      {
        src: "/images/case-studies/modal/feature-flag-dashboard/after.png",
        label: "After",
        objectPosition: "0% 0%",
      },
    ],
    body: [
      "Optimizely's Feature Experimentation was originally built for engineers managing feature flags, but as the user base grew to include non-technical users like marketers running experiments across platforms, the existing dashboard couldn't keep up. The table surfaced only flag name, environment, and key — any detail on the experiments or variations living inside a flag required digging through multiple pages. For marketers building comparison reports, this meant manually screenshotting data from separate pages and pasting it together, since there was no way to view experiments side by side.",
      "Through several rounds of iteration, I redesigned the table to be expandable, nesting experiment-level detail directly within each flag row so users could compare experiments without leaving the page. I also introduced custom filters and configurable columns — capabilities the original table lacked — letting different personas tailor the view to their own workflow.",
      "This wasn't a problem unique to Feature Experimentation. Other teams across Optimizely had been running into the same limitation without a shared solution to point to. The expandable, customizable table pattern became that solution — adopted as a reusable system well beyond the scope of this one product.",
    ],
    launchLabel: "See implementation:",
    launchDetails: [
      {
        label: "Product page",
        href: "https://www.optimizely.com/products/feature-management/",
      },
    ],
  },
  {
    id: "opal-ai-guidelines",
    title: "Opal AI guidelines",
    description:
      "Unified visual and AI patterns across Optimizely's product suite.",
    tag: "Optimizely - 2024",
    cardImage: "/images/case-studies/opal-ai-guidelines.png",
    coverImage: "/images/case-studies/placeholder/opal-ai-guidelines.png",
    role: "Design lead",
    company: "Optimizely",
    status: "Shipped in 2024",
    impact: "Reusable design language for Opal AI",
    imageGroups: [
      {
        label: "AI guidelines",
        images: [
          { src: "/images/case-studies/modal/opal-ai-guidelines/ai-guidelines-1.png", objectPosition: "0% 0%" },
          { src: "/images/case-studies/modal/opal-ai-guidelines/ai-guidelines-2.png", objectPosition: "0% 0%" },
        ],
      },
      {
        label: "Opal visual language & components",
        images: [
          { src: "/images/case-studies/modal/opal-ai-guidelines/visual-language-1.png", objectPosition: "0% 0%" },
          { src: "/images/case-studies/modal/opal-ai-guidelines/visual-language-2.png", objectPosition: "0% 0%" },
        ],
      },
    ],
    body: [
      "As Optimizely scaled its AI assistant Opal across products, the vision was a consistent AI experience regardless of which product a user was in. In practice, each product pillar was building AI features independently, with no shared visual language, components, or guidelines to work from. I felt this firsthand while building several AI features myself, constantly piecing together direction from scattered sources — and realized the lack of a shared foundation was actively working against Opal's vision.",
      "Rather than wait for this to be solved top-down, I formed a guild with the designers leading AI work across other product pillars, along with a representative from the design systems team to ensure anything we created stayed grounded in the company's existing system. Over two months of collaborative iteration and stakeholder socialization, we developed a shared framework: core principles for AI usage, interaction patterns, and a defined visual language and component set for Opal.",
      "The guidelines were published and became the foundation the team used to think about AI design across Opal's product surface. That foundation still shows up in Opal today — the visual language and interaction patterns we established have held up as the product has evolved.",
    ],
  },
];
