import { useEffect, useRef } from "react";

function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let stars = [];
    let shootingStars = [];
    let lastShootingStarTime = 0;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 1500);

      for (let i = 0; i < starCount; i++) {
        const sizeRandom = Math.random();
        let radius;
        if (sizeRandom > 0.95) {
          radius = Math.random() * 2 + 1.5;
        } else if (sizeRandom > 0.8) {
          radius = Math.random() * 1.2 + 0.8;
        } else {
          radius = Math.random() * 0.6 + 0.3;
        }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          opacity: Math.random() * 0.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 1 - 0.4,
        });
      }

      // Add cluster stars
      const clusterCount = Math.floor(starCount / 20);
      for (let c = 0; c < clusterCount; c++) {
        const clusterX = Math.random() * canvas.width;
        const clusterY = Math.random() * canvas.height;
        const clusterSize = Math.random() * 50 + 30;
        const starsInCluster = Math.floor(Math.random() * 8) + 4;

        for (let i = 0; i < starsInCluster; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * clusterSize;
          stars.push({
            x: clusterX + Math.cos(angle) * distance,
            y: clusterY + Math.sin(angle) * distance,
            radius: Math.random() * 0.8 + 0.3,
            opacity: Math.random() * 0.5 + 0.3,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 1 - 0.4,
          });
        }
      }
    };

    const createShootingStar = () => ({
      x: Math.random() * canvas.width * 0.8,
      y: Math.random() * canvas.height * 0.3,
      length: Math.random() * 50 + 40,
      speed: Math.random() * 10 + 8,
      opacity: 1,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
    });

    const drawShootingStars = () => {
      shootingStars.forEach((star, index) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.012;

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        if (
          star.opacity <= 0 ||
          star.x > canvas.width ||
          star.y > canvas.height
        ) {
          shootingStars.splice(index, 1);
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      // Spawn shooting stars
      if (time - lastShootingStarTime > 0.15 + Math.random() * 0.15) {
        if (shootingStars.length < 10) {
          shootingStars.push(createShootingStar());
        }
        lastShootingStarTime = time;
      }

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      drawShootingStars();

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}

export default StarryBackground;
