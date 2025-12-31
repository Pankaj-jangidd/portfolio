import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

function AnimatedSection({ children, className, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function About() {
  return (
    <section
      id="about"
      className="bg-darkBg py-20 pt-28 min-h-screen scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-4xl sm:text-5xl font-bold text-textWhite mb-2">
            ABOUT ME
          </h2>
          <p className="text-accent text-base">Get to Know me</p>
        </AnimatedSection>

        {/* Two Column Layout */}
        <div className="about-content flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <AnimatedSection
            className="flex-1 lg:w-[60%]"
            direction="left"
            delay={0.2}
          >
            <div className="space-y-6 text-textGray text-base leading-relaxed">
              <p>
                Hi, I'm Pankaj Kumar, a software developer with a strong
                interest in backend development and full-stack engineering. I
                enjoy building reliable systems, writing clean code, and solving
                technical challenges.
              </p>
              <p>
                I've worked on real-world projects using JavaScript, Node.js,
                React, MongoDB, and modern web frameworks, focusing on writing
                structured, maintainable code and solving problems through
                simple, scalable solutions. I'm a quick learner who adapts
                easily to new technologies and environments.
              </p>
              <p>
                I'm looking for opportunities where I can learn from experienced
                developers, contribute to meaningful projects, and grow as a
                strong backend-focused software engineer.
              </p>
            </div>
          </AnimatedSection>

          {/* Right Column - Photo */}
          <AnimatedSection
            className="lg:w-[40%] flex justify-center"
            direction="right"
            delay={0.4}
          >
            <div className="relative">
              <img
                src="/pankaj-photo.jpg"
                alt="Pankaj Kumar"
                className="w-64 h-64 object-cover object-top rounded-full border-2 border-darkBorder shadow-xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/30 rounded-full animate-pulse"></div>
              <div
                className="absolute bottom-10 -left-6 w-6 h-6 bg-accentGreen/30 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default About;
