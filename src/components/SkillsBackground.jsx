import { useEffect, useRef } from "react";

function SkillsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodes = [];
    let shootingStars = [];
    let time = 0;
    let lastShootingStarTime = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const nodeCount = 50;

      for (let i = 0; i < nodeCount; i++) {
        nodes.push(
          createNode(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }

      // Add extra nodes in corners
      for (let i = 0; i < 5; i++) {
        nodes.push(
          createNode(
            Math.random() * canvas.width * 0.2,
            Math.random() * canvas.height * 0.25
          )
        );
      }
      for (let i = 0; i < 5; i++) {
        nodes.push(
          createNode(
            canvas.width * 0.8 + Math.random() * canvas.width * 0.2,
            Math.random() * canvas.height * 0.25
          )
        );
      }
      for (let i = 0; i < 5; i++) {
        nodes.push(
          createNode(
            Math.random() * canvas.width * 0.2,
            canvas.height * 0.75 + Math.random() * canvas.height * 0.25
          )
        );
      }
      for (let i = 0; i < 5; i++) {
        nodes.push(
          createNode(
            canvas.width * 0.8 + Math.random() * canvas.width * 0.2,
            canvas.height * 0.75 + Math.random() * canvas.height * 0.25
          )
        );
      }
    };

    const createNode = (x, y) => ({
      x: x,
      y: y,
      baseX: x,
      baseY: y,
      radius: Math.random() * 1 + 1.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.2 + 0.1,
      driftX: (Math.random() - 0.5) * 0.15,
      driftY: (Math.random() - 0.5) * 0.15,
    });

    const createShootingStar = () => ({
      x: Math.random() * canvas.width * 0.8,
      y: Math.random() * canvas.height * 0.3,
      length: Math.random() * 40 + 30,
      speed: Math.random() * 8 + 6,
      opacity: 1,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
    });

    const drawConnections = () => {
      const maxDistance = 150;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(100, 100, 100, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = () => {
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180, 180, 180, 0.7)";
        ctx.fill();
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star, index) => {
        // Move the star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        // Draw the shooting star trail
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
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw small head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Remove if faded or off screen
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

      // Spawn many shooting stars (every 1-2 seconds)
      if (time - lastShootingStarTime > 0.15 + Math.random() * 0.15) {
        if (shootingStars.length < 10) {
          shootingStars.push(createShootingStar());
        }
        lastShootingStarTime = time;
      }

      // Update nodes
      nodes.forEach((node) => {
        node.x = node.baseX + Math.sin(time * node.speed + node.phase) * 8;
        node.y = node.baseY + Math.cos(time * node.speed + node.phase) * 6;
        node.baseX += node.driftX;
        node.baseY += node.driftY;

        if (node.baseX < -50) node.baseX = canvas.width + 50;
        if (node.baseX > canvas.width + 50) node.baseX = -50;
        if (node.baseY < -50) node.baseY = canvas.height + 50;
        if (node.baseY > canvas.height + 50) node.baseY = -50;
      });

      drawConnections();
      drawNodes();
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

export default SkillsBackground;
