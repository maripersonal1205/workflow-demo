import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col" style={{ background: "linear-gradient(331deg, #FFF -4.03%, #E2E2FF 333.9%)" }}>
      <Header />
      <main className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col gap-20 px-4 pt-14 pb-20 md:px-6 md:py-20">
        <Hero />
        <CaseStudiesSection />
        <div className="flex flex-col gap-6">
          <WorkExperience />
          <Education />
        </div>
      </main>
      <Footer />
    </div>
  );
}
