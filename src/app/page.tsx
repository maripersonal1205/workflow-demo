import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-[844px] flex-1 flex-col gap-16 px-6 py-16">
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
