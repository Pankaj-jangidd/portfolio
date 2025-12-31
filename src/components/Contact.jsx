import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import GeometricBackground from "./GeometricBackground";

function AnimatedSection({ children, className, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -40 };
      case "right":
        return { opacity: 0, x: 40 };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  const getVisible = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getVisible());
    } else {
      controls.start(getInitial());
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={controls}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function Contact() {
  const contacts = [
    {
      icon: FaPhone,
      text: "+91 8824374977",
      link: "tel:+918824374977",
      label: "Phone",
      direction: "left",
    },
    {
      icon: FaEnvelope,
      text: "jangidpankaj2004@gmail.com",
      link: "mailto:jangidpankaj2004@gmail.com",
      label: "Email",
      direction: "right",
    },
    {
      icon: FaGithub,
      text: "github.com/Pankaj-jangidd",
      link: "https://github.com/Pankaj-jangidd",
      external: true,
      label: "GitHub",
      direction: "left",
    },
    {
      icon: FaLinkedin,
      text: "linkedin.com/in/pankaj-jangid",
      link: "https://www.linkedin.com/in/pankaj-jangid-006792282/",
      external: true,
      label: "LinkedIn",
      direction: "right",
    },
  ];

  return (
    <section
      id="contact"
      className="relative bg-darkBg py-16 scroll-mt-20 overflow-hidden"
    >
      {/* Geometric Background */}
      <GeometricBackground />

      <div className="max-w-7xl mx-auto px-8 w-full relative z-50">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-4xl sm:text-5xl font-bold text-textWhite mb-2">
            CONTACT
          </h2>
          <p className="text-accent text-base">
            I'm always open to discussing new opportunities, interesting
            projects, or just having a chat about technology and development.
          </p>
        </AnimatedSection>

        {/* 50-50 Split Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left Side - Big Text */}
          <AnimatedSection className="lg:w-1/2" direction="left">
            <h2
              className="contact-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-textWhite uppercase leading-none"
              style={{
                fontFamily: "'Passion One', cursive",
                letterSpacing: "0.02em",
              }}
            >
              LET'S WORK
              <br />
              <span className="text-accent">TOGETHER</span>
            </h2>
          </AnimatedSection>

          {/* Right Side - Contact Cards (1 column, 4 rows) */}
          {/* Desktop: Single wrapper animation */}
          <AnimatedSection
            className="lg:w-1/2 w-full hidden lg:block"
            direction="right"
            delay={0.2}
          >
            <div className="flex flex-col gap-4">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 rounded-xl bg-darkCard border border-darkBorder hover:border-accent/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <contact.icon
                      className={`text-accent text-xl ${
                        contact.label === "Phone" ? "scale-x-[-1]" : ""
                      }`}
                    />
                  </div>
                  <span className="text-textGray text-base group-hover:text-textWhite transition-colors">
                    {contact.text}
                  </span>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Mobile: Individual card animations with alternating directions */}
          <div className="lg:hidden w-full flex flex-col gap-4">
            {contacts.map((contact, index) => (
              <AnimatedSection
                key={index}
                direction={contact.direction}
                delay={0.1 + index * 0.1}
              >
                <a
                  href={contact.link}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 rounded-xl bg-darkCard border border-darkBorder hover:border-accent/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <contact.icon
                      className={`text-accent text-xl ${
                        contact.label === "Phone" ? "scale-x-[-1]" : ""
                      }`}
                    />
                  </div>
                  <span className="text-textGray text-base group-hover:text-textWhite transition-colors">
                    {contact.text}
                  </span>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
