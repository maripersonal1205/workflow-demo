import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import MainContainer from "@/components/MainContainer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col" style={{ background: "linear-gradient(331deg, #FFF -4.03%, #E2E2FF 333.9%)" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[4px] focus:bg-white focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-default-text focus:shadow-card"
      >
        skip to main content
      </a>
      <Header />
      <MainContainer>
        <Hero />
        <RevealOnScroll className="flex flex-col gap-20">
          <CaseStudiesSection />
          <div className="flex w-full max-w-[1000px] flex-col gap-6">
            <WorkExperience />
            <Education />
          </div>
        </RevealOnScroll>
      </MainContainer>
      <RevealOnScroll>
        <Footer />
      </RevealOnScroll>
    </div>
  );
}
