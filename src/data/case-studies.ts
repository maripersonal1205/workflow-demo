export type LaunchDetail = {
  label: string;
  href: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  tag: string;
  cardImage: string;
  modalImage: string;
  role: string;
  company: string;
  timeframe: string;
  body: string[];
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
    modalImage: "/images/case-studies/modal-aeo-analytics.png",
    role: "Design lead",
    company: "Webflow",
    timeframe: "Dec 2025 - May 2026",
    body: [
      "As AI-powered search reshapes how people discover brands online, companies began losing organic traffic to answer engines they had no visibility into. A wave of standalone AEO tools emerged to help, but they couldn't connect insights to action on the website itself — leaving Webflow customers managing yet another disconnected platform. Webflow was uniquely positioned to solve this natively: insights and recommendations built directly into the product, tied to the actual site.",
      "I was the lead designer for the analytics and insights workstream — the data foundation the entire AEO product depended on. Working within a tight 6-month timeline across three parallel design workstreams, I used AI-assisted development tools to rapidly build coded prototypes that got in front of customers early and often. This let us gather real behavioral feedback rather than scripted reactions, make faster sequencing decisions under pressure, and hand off to engineering with significantly less back-and-forth.",
      "The product launched in May 2026 to all enterprise customers. Through a private beta with continuous feedback sessions, we closed 50+ deals before general availability and generated $1.3M in revenue ahead of GA launch.",
    ],
    launchDetails: [
      { label: "Product feature page", href: "#" },
      { label: "Feature announcement", href: "#" },
    ],
  },
  {
    id: "experiment-ai-copy",
    title: "Experiment AI copy suggestions",
    description:
      "An AI assistant that generates copy variations for A/B tests based on best practices.",
    tag: "Webflow - 2025",
    cardImage: "/images/case-studies/experiment-ai-copy.png",
    modalImage: "/images/case-studies/modal-experiment-ai-copy.png",
    role: "Design lead",
    company: "Webflow",
    timeframe: "Shipped in summer 2025",
    body: [
      "Marketers using Webflow Optimize had the tools to run experiments, but not the time or bandwidth to come up with what to test. Without a way to quickly generate quality ideas, customers weren't running experiments, weren't seeing value, and were at risk of churning. The challenge was designing a solution that helped them move faster without sacrificing the quality of what they were testing.",
      "I led design from discovery through launch, scoping the feature around AI-powered copy suggestions — the most frequently run and highest-impact experiment type. The key design challenge was fitting a marketer's workflow into a product built primarily for designers and developers. The solution wasn't a different interface, but a different interaction: users opt in to AI assistance at the start of experiment setup, land on a draft with pre-populated best-practice prompts already waiting, and receive structured copy variations they can apply in a few clicks — guided enough for speed, without diverging from Webflow's existing AI patterns.",
      "The feature shipped in summer 2025. Experiments created increased by approximately 30% following launch, and the interaction pattern was designed to scale — setting the foundation for future AI-assisted suggestion types beyond copy.",
    ],
    launchDetails: [{ label: "Feature announcement", href: "#" }],
  },
  {
    id: "conclude-experiments",
    title: "Conclude experiments",
    description:
      "A workflow that seamlessly applies experiment variations to the base.",
    tag: "Webflow - 2025",
    cardImage: "/images/case-studies/conclude-experiments.png",
    modalImage: "/images/case-studies/conclude-experiments.png",
    role: "Design lead",
    company: "Webflow",
    timeframe: "2025",
    body: [
      "A workflow that seamlessly applies experiment variations to the base.",
    ],
  },
  {
    id: "variable-suggestions",
    title: "Variable suggestions",
    description:
      "AI-generated experiment variables based on a user's hypothesis.",
    tag: "Optimizely - 2024",
    cardImage: "/images/case-studies/variable-suggestions.png",
    modalImage: "/images/case-studies/variable-suggestions.png",
    role: "Design lead",
    company: "Optimizely",
    timeframe: "2024",
    body: [
      "AI-generated experiment variables based on a user's hypothesis.",
    ],
  },
  {
    id: "feature-flag-dashboard",
    title: "Feature flag dashboard improvement",
    description:
      "A redesigned dashboard that surfaces experiment variations, status, and results at a glance.",
    tag: "Optimizely - 2024",
    cardImage: "/images/case-studies/feature-flag-dashboard.png",
    modalImage: "/images/case-studies/feature-flag-dashboard.png",
    role: "Design lead",
    company: "Optimizely",
    timeframe: "2024",
    body: [
      "A redesigned dashboard that surfaces experiment variations, status, and results at a glance.",
    ],
  },
  {
    id: "opal-ai-guidelines",
    title: "Opal AI guidelines",
    description:
      "Unified visual and AI patterns across Optimizely's product suite.",
    tag: "Optimizely - 2024",
    cardImage: "/images/case-studies/opal-ai-guidelines.png",
    modalImage: "/images/case-studies/opal-ai-guidelines.png",
    role: "Design lead",
    company: "Optimizely",
    timeframe: "2024",
    body: [
      "Unified visual and AI patterns across Optimizely's product suite.",
    ],
  },
];
