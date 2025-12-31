import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);
  const underlineRef = useRef(null);
  const isClickScrolling = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // Update underline position directly via DOM
  const updateUnderlinePosition = (sectionId) => {
    if (navRef.current && underlineRef.current) {
      const activeButton = navRef.current.querySelector(
        `[data-section="${sectionId}"]`
      );
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        underlineRef.current.style.left = `${buttonRect.left - navRect.left}px`;
        underlineRef.current.style.width = `${buttonRect.width}px`;
        underlineRef.current.style.opacity = navLinks.some(
          (l) => l.id === sectionId
        )
          ? "1"
          : "0";
      } else {
        underlineRef.current.style.opacity = "0";
      }
    }
  };

  // Update on active section change (only for scroll-triggered changes)
  useEffect(() => {
    if (!isClickScrolling.current) {
      requestAnimationFrame(() => updateUnderlinePosition(activeSection));
    }
  }, [activeSection]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => updateUnderlinePosition(activeSection);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  // Track active section on scroll (throttled for performance)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        if (isClickScrolling.current) {
          ticking = false;
          return;
        }

        const sections = ["hero", ...navLinks.map((link) => link.id)];
        const scrollPosition = window.scrollY + 150;

        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100;
        if (isAtBottom) {
          setActiveSection("contact");
          ticking = false;
          return;
        }

        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const { offsetTop, offsetHeight } = section;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);

    // If not on home page, navigate to home and save section to scroll to
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", id);
      navigate("/");
      return;
    }

    isClickScrolling.current = true;
    setActiveSection(id);

    // Instantly update underline via DOM (no React cycle)
    updateUnderlinePosition(id);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <nav className="fixed w-full top-0 z-[100] bg-darkBg/95 backdrop-blur-md">
      <div className="navbar-container max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="navbar-logo text-textWhite font-semibold text-2xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="text-accent group-hover:text-textWhite transition-colors">
            &lt;/
          </span>
          <span className="text-textWhite group-hover:text-accent transition-colors">
            Portfolio
          </span>
          <span className="text-accent group-hover:text-textWhite transition-colors">
            &gt;
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 relative" ref={navRef}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              data-section={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-base transition-all duration-300 pb-1 hover:scale-105 ${
                activeSection === link.id
                  ? "text-accent font-medium"
                  : "text-textGray hover:text-textWhite"
              }`}
            >
              {link.name}
            </button>
          ))}
          {/* Sliding Underline */}
          <div
            ref={underlineRef}
            className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300"
            style={{
              left: 0,
              width: 0,
              opacity: 0,
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-textWhite text-xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mobile-menu-container">
          <div className="px-8 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`text-left transition-all duration-300 py-2 border-l-2 pl-4 ${
                  activeSection === link.id
                    ? "text-accent font-medium border-accent bg-accent/5"
                    : "text-textGray hover:text-textWhite border-transparent hover:pl-6"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
