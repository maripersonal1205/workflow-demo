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
      <Header />
      <MainContainer>
        <Hero />
        <RevealOnScroll className="flex flex-col gap-20">
          <CaseStudiesSection />
          <div className="flex flex-col gap-6">
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
