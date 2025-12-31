import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { projects } from "../data/projectsData";

function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const controls = useAnimation();

  // Check if returning from AllProjectsPage (skip animations)
  const isReturning = sessionStorage.getItem("projectsScrollPos") !== null;

  useEffect(() => {
    if (isReturning) {
      // Skip animation, show immediately
      controls.start({ opacity: 1, y: 0 });
      return;
    }
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 30 });
    }
  }, [isInView, controls, isReturning]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={isReturning ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      animate={controls}
      transition={{
        duration: isReturning ? 0 : 0.5,
        delay: isReturning ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function Projects() {
  const [showPrivateModal, setShowPrivateModal] = useState(false);

  return (
    <section id="projects" className="bg-darkBg py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-textWhite mb-2">
            PROJECTS
          </h2>
          <p className="text-accent text-base">Some of my Work</p>
        </AnimatedSection>

        {/* Mobile View: Show only 2 projects */}
        <div className="sm:hidden">
          <div className="grid grid-cols-1 gap-6 mb-8">
            {projects.slice(0, 2).map((project, index) => (
              <AnimatedSection key={project.id} delay={0.2 + index * 0.15}>
                <ProjectCard
                  project={project}
                  onPrivateClick={() => setShowPrivateModal(true)}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* View More Button - Mobile Only */}
          <AnimatedSection className="text-center" delay={0.3}>
            <Link
              to="/projects"
              onClick={() =>
                sessionStorage.setItem(
                  "projectsScrollPos",
                  window.scrollY.toString()
                )
              }
              className="inline-flex items-center gap-3 border-2 border-accent text-accent px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-300 group"
            >
              View More Projects
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Desktop View: Show first 3 projects + View More button */}
        <div className="hidden sm:block">
          {/* Projects Grid - 3 cards */}
          <AnimatedSection
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            delay={0.2}
          >
            {projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPrivateClick={() => setShowPrivateModal(true)}
              />
            ))}
          </AnimatedSection>

          {/* View More Button - Desktop */}
          <AnimatedSection className="text-center" delay={0.3}>
            <Link
              to="/projects"
              onClick={() =>
                sessionStorage.setItem(
                  "projectsScrollPos",
                  window.scrollY.toString()
                )
              }
              className="inline-flex items-center gap-3 border-2 border-accent text-accent px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-300 group"
            >
              View More Projects
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </div>

      {/* Private Repo Modal */}
      {showPrivateModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200]"
          onClick={() => setShowPrivateModal(false)}
        >
          <div
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
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, onPrivateClick }) {
  return (
    <motion.div
      className="bg-darkCard rounded-xl overflow-hidden border border-darkBorder hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
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
      <div className="p-5 bg-darkCard">
        <h3 className="text-textWhite font-semibold text-lg mb-2">
          {project.name}
        </h3>
        <p className="text-textGray text-sm mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-nowrap gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-1.5 py-0.5 bg-darkBg text-textGray rounded-md border border-darkBorder whitespace-nowrap flex-shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {project.isPrivate ? (
            <button
              onClick={onPrivateClick}
              className="flex-1 flex items-center justify-center gap-1.5 bg-darkBg text-textGray text-xs py-2.5 px-3 rounded-lg hover:bg-gray-800 hover:text-textWhite transition-colors whitespace-nowrap"
            >
              <FaLock className="text-xs" />
              Private
            </button>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-darkBg text-white text-xs py-2.5 px-3 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              <FaGithub />
              See Code
            </a>
          )}
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-accent text-white text-xs py-2.5 px-3 rounded-lg hover:bg-accentHover transition-colors whitespace-nowrap"
          >
            <FaExternalLinkAlt className="text-xs" />
            View Project
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;
