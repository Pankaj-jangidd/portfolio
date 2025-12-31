import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import StarryBackground from "./StarryBackground";

function Hero() {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { amount: 0.3 });
  const [animationKey, setAnimationKey] = useState(0);
  const wasOutOfView = useRef(true);

  // Controls for all animated elements
  const nameControls = useAnimation();
  const subtitleControls = useAnimation();
  const textControls = useAnimation();
  const buttonControls = useAnimation();
  const illustrationControls = useAnimation();

  // Replay all animations when hero comes into view
  useEffect(() => {
    if (isInView && wasOutOfView.current) {
      setAnimationKey((prev) => prev + 1);
      wasOutOfView.current = false;

      // Animate all elements with staggered delays
      nameControls.start({ opacity: 1, y: 0 });
      subtitleControls.start({ opacity: 1, y: 0, scale: 1 });
      textControls.start({ opacity: 1 });
      buttonControls.start({ opacity: 1, scale: 1 });
      illustrationControls.start({ opacity: 1, x: 0 });
    } else if (!isInView) {
      wasOutOfView.current = true;

      // Reset all elements to initial state
      nameControls.start({ opacity: 0, y: 20 });
      subtitleControls.start({ opacity: 0, y: 20, scale: 0.9 });
      textControls.start({ opacity: 0 });
      buttonControls.start({ opacity: 0, scale: 0.9 });
      illustrationControls.start({ opacity: 0, x: 30 });
    }
  }, [
    isInView,
    nameControls,
    subtitleControls,
    textControls,
    buttonControls,
    illustrationControls,
  ]);

  return (
    <section
      id="hero"
      className="relative bg-[#000000] h-screen flex items-center overflow-hidden pt-[50px]"
      ref={heroRef}
    >
      {/* Starry Background */}
      <StarryBackground />

      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-12 w-full relative z-50">
        {/* ===== TOP SECTION - CENTERED NAME AND SUBTITLE ===== */}
        <div className="w-full flex flex-col items-center mb-8 lg:mb-10">
          {/* Main Name - Centered */}
          <motion.h1
            className="hero-name-mobile text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-normal text-white tracking-tight leading-[0.85] mb-3 whitespace-nowrap text-center w-full"
            style={{
              letterSpacing: "0.005em",
              fontFamily: "'Passion One', sans-serif",
              transform: "scaleX(0.85)",
              transformOrigin: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={nameControls}
            transition={{ duration: 1, delay: 0.4 }}
          >
            PANKAJ KUMAR
          </motion.h1>

          {/* Subtitle - Centered below name */}
          <motion.p
            className="hero-subtitle text-xl md:text-2xl font-medium text-[#06B6D4]"
            style={{ fontFamily: "Oxanium, sans-serif" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={subtitleControls}
            transition={{
              duration: 1.5,
              delay: 0.8,
              ease: "easeOut",
              scale: {
                duration: 0.5,
                delay: 1.8,
                type: "spring",
                stiffness: 200,
                damping: 10,
              },
            }}
          >
            Software Developer | Backend Focused
          </motion.p>
        </div>

        {/* ===== BOTTOM SECTION - TWO COLUMNS ===== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column: ~45% - Text Content */}
          <div className="flex-1 lg:max-w-[520px] space-y-5">
            {/* Greeting with Typewriter */}
            <div className="mb-2">
              <TypeAnimation
                key={animationKey}
                sequence={[
                  1500, // Wait 1.5s before starting
                  "Hello there",
                ]}
                wrapper="h2"
                speed={30}
                cursor={true}
                repeat={0}
                className="text-2xl sm:text-3xl font-semibold text-white inline-block"
                style={{
                  display: "inline-block",
                  fontFamily: "Oxanium, sans-serif",
                }}
              />
            </div>

            {/* Welcome Text */}
            <motion.p
              className="text-base text-[#D1D5DB]"
              style={{ fontFamily: "Oxanium, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={textControls}
              transition={{ duration: 0.6, delay: 2 }}
            >
              Welcome to my portfolio!
            </motion.p>

            {/* Main Description */}
            <motion.p
              className="text-base text-[#D1D5DB] leading-relaxed"
              style={{
                lineHeight: "1.7",
                fontFamily: "Oxanium, sans-serif",
              }}
              initial={{ opacity: 0 }}
              animate={textControls}
              transition={{ duration: 0.6, delay: 2.3 }}
            >
              I'm Pankaj Kumar, a web developer with a strong focus on back-end
              & full-stack development. I build clean, scalable and functional
              web applications that deliver smooth & reliable user experiences.
            </motion.p>

            {/* Resume Button */}
            <motion.a
              href="https://drive.google.com/file/d/10dPpJ0FoKjzDZzGsHdMVD11bGzMHgQBe/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#06B6D4] text-white font-semibold text-sm uppercase px-8 py-3 rounded-full hover:bg-[#0891b2] transition-all duration-300 mt-2"
              style={{
                fontFamily: "Oxanium, sans-serif",
                boxShadow:
                  "0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.15)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={buttonControls}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              VIEW RESUME
            </motion.a>
          </div>

          {/* Right Column: ~55% - Illustration */}
          <motion.div
            className="flex-1 lg:max-w-[550px] relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={illustrationControls}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
              {/* Developer Illustration */}
              <div className="animate-float">
                <img
                  src="/illustrator.svg"
                  alt="devpankaj - Software Developer Illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;
