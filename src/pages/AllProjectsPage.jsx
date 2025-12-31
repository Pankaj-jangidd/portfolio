import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import { projects } from "../data/projectsData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AllProjectsPage() {
  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on mount when navigating (not on reload)
  useEffect(() => {
    const isReload = sessionStorage.getItem("scrollPosBeforeReload") !== null;
    if (!isReload) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  // Handle back button click - restore scroll position
  const handleBack = () => {
    const savedScrollPos = sessionStorage.getItem("projectsScrollPos");
    navigate("/");
    if (savedScrollPos) {
      // Wait for page to fully render before restoring scroll
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScrollPos), behavior: "instant" });
        sessionStorage.removeItem("projectsScrollPos");
      }, 150);
    }
  };

  return (
    <div className="bg-darkBg min-h-screen">
      <Navbar />

      <section className="py-12 pt-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header with Back Button on same line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative text-center mb-16"
          >
            {/* Back Button - positioned on the left */}
            <button
              onClick={handleBack}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-darkBorder text-textGray hover:text-accent hover:border-accent transition-colors"
            >
              <FaArrowLeft />
            </button>

            <h2 className="text-4xl sm:text-5xl font-bold text-textWhite mb-2">
              PROJECTS
            </h2>
            <p className="text-accent text-base">Some of My Work</p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  onPrivateClick={() => setShowPrivateModal(true)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Repo Modal */}
      {showPrivateModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200]"
          onClick={() => setShowPrivateModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-darkCard border border-darkBorder rounded-2xl p-8 max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-accent text-2xl" />
            </div>
            <h3 className="text-textWhite text-xl font-semibold mb-2">
              Private Repository
            </h3>
            <p className="text-textGray text-sm mb-6">
              This is an internship project. The source code is proprietary and
              cannot be shared publicly.
            </p>
            <button
              onClick={() => setShowPrivateModal(false)}
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accentHover transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function ProjectCard({ project, onPrivateClick }) {
  return (
    <div className="bg-darkCard rounded-xl overflow-hidden border border-darkBorder hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5 bg-darkCard flex-1 flex flex-col">
        <h3 className="text-textWhite font-semibold text-lg mb-2">
          {project.name}
        </h3>
        <p className="text-textGray text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-1.5 py-0.5 bg-darkBg text-textGray rounded-md border border-darkBorder"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          {project.isPrivate ? (
            <button
              onClick={onPrivateClick}
              className="flex-1 flex items-center justify-center gap-2 bg-darkBg text-textGray text-sm py-2.5 px-4 rounded-lg hover:bg-gray-800 hover:text-textWhite transition-colors"
            >
              <FaLock className="text-xs" />
              Private
            </button>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-darkBg text-white text-sm py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <FaGithub />
              See Code
            </a>
          )}
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-white text-sm py-2.5 px-4 rounded-lg hover:bg-accentHover transition-colors"
          >
            <FaExternalLinkAlt className="text-xs" />
            View Project
          </a>
        </div>
      </div>
    </div>
  );
}

export default AllProjectsPage;
