import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllProjectsPage from "./pages/AllProjectsPage";

function HomePage() {
  const location = useLocation();

  // Handle navigation from navbar (scrollToSection in sessionStorage)
  useEffect(() => {
    const sectionToScroll = sessionStorage.getItem("scrollToSection");
    if (sectionToScroll) {
      sessionStorage.removeItem("scrollToSection");
      const element = document.getElementById(sectionToScroll);
      if (element) {
        // Hide page, scroll instantly, then fade in
        document.body.style.opacity = "0";

        setTimeout(() => {
          element.scrollIntoView({ behavior: "instant" });

          // Fade in smoothly
          document.body.style.transition = "opacity 0.3s ease";
          document.body.style.opacity = "1";
        }, 50);
      }
    }
  }, []);

  // Handle hash-based navigation (e.g., /#about) - no visible scrolling
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Hide page, scroll instantly, then fade in
        document.body.style.opacity = "0";

        setTimeout(() => {
          element.scrollIntoView({ behavior: "instant" });

          // Fade in smoothly
          document.body.style.transition = "opacity 0.3s ease";
          document.body.style.opacity = "1";
        }, 50);
      }
    }
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  // Handle browser back/forward navigation - prevent scroll animation
  useEffect(() => {
    const handlePopState = () => {
      // Hide page and disable smooth scroll
      document.body.style.opacity = "0";
      document.body.style.transition = "none";
      document.documentElement.style.scrollBehavior = "auto";

      // If returning to home and we have a saved projects scroll pos
      const savedProjectsPos = sessionStorage.getItem("projectsScrollPos");
      if (window.location.pathname === "/" && savedProjectsPos) {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedProjectsPos),
            behavior: "instant",
          });
          sessionStorage.removeItem("projectsScrollPos");
        }, 50);
      }

      setTimeout(() => {
        // Re-enable smooth scroll and fade in
        document.documentElement.style.scrollBehavior = "smooth";
        document.body.style.transition = "opacity 0.3s ease";
        document.body.style.opacity = "1";
      }, 150);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Restore scroll position after reload (runs after React mounts)
  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem("scrollPosBeforeReload");
    const savedPath = sessionStorage.getItem("reloadPath");

    if (savedScrollPos && savedPath === window.location.pathname) {
      // Hide page, scroll instantly, then fade in
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScrollPos), behavior: "instant" });
        sessionStorage.removeItem("scrollPosBeforeReload");
        sessionStorage.removeItem("reloadPath");

        // Fade in smoothly
        document.body.style.transition = "opacity 0.3s ease";
        document.body.style.opacity = "1";
      }, 10);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-darkBg min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
