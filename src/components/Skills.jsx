import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGit,
  FaDocker,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPostman,
  SiFigma,
  SiSupabase,
} from "react-icons/si";
import { TbApi, TbLock, TbDatabase } from "react-icons/tb";
import SkillsBackground from "./SkillsBackground";

function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 30 });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function Skills() {
  const skillCategories = [
    {
      name: "FRONTEND",
      skills: [
        { name: "HTML", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Framer Motion", icon: SiFramer, color: "#FF0080" },
      ],
    },
    {
      name: "BACKEND",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "RESTful APIs", icon: TbApi, color: "#06B6D4" },
        { name: "Auth", icon: TbLock, color: "#10B981" },
        { name: "Prisma ORM", icon: SiPrisma, color: "#5A67D8" },
      ],
    },
    {
      name: "DATABASE",
      skills: [
        { name: "SQL", icon: TbDatabase, color: "#F29111" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      ],
    },
    {
      name: "TOOLS",
      skills: [
        { name: "Git", icon: FaGit, color: "#F05032" },
        { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Docker", icon: FaDocker, color: "#2496ED" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative bg-darkBg py-20 pt-12 min-h-screen scroll-mt-20 overflow-hidden"
    >
      {/* Skills Background */}
      <SkillsBackground />

      <div className="max-w-7xl mx-auto px-8 relative z-50">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-textWhite mb-2">
            SKILLS
          </h2>
          <p className="text-accent text-base">My Tech Stack</p>
        </AnimatedSection>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <AnimatedSection
              key={catIndex}
              className="flex flex-col lg:flex-row gap-8 lg:gap-32"
              delay={catIndex * 0.1}
            >
              {/* Category Heading - Left Side */}
              <div className="lg:w-[200px] flex-shrink-0">
                <h3
                  className="skill-category-heading text-4xl md:text-5xl lg:text-6xl text-textWhite uppercase"
                  style={{
                    fontFamily: "'Passion One', cursive",
                    letterSpacing: "0.02em",
                  }}
                >
                  {category.name}
                </h3>
              </div>

              {/* Skills Grid - Right Side (4 columns) */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-3 group"
                  >
                    {skill.icon && (
                      <skill.icon
                        className="text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ color: skill.color }}
                      />
                    )}
                    <span className="text-textGray text-base group-hover:text-textWhite transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
