import { createFileRoute } from "@tanstack/react-router";
import { PageLoader } from "@/components/page-loader";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Stats } from "@/components/stats";
import { Projects } from "@/components/projects";
import { ProjectModal } from "@/components/project-modal";
import { Skills } from "@/components/skills";
import { Process } from "@/components/process";
import { Statement } from "@/components/statement";
import { SocialSection, Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <main className="site-main">
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Skills />
        <Process />
        <Statement />
        <SocialSection />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ProjectModal />
    </>
  );
}
