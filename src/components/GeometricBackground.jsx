import { useEffect, useRef } from "react";

function GeometricBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodes = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];

      // Left border nodes
      const leftBorderCount = 12;
      for (let i = 0; i < leftBorderCount; i++) {
        const spreadX = Math.random() * canvas.width * 0.15;
        const spreadY = Math.random() * canvas.height;
        nodes.push(createNode(spreadX, spreadY));
      }

      // Right border nodes
      const rightBorderCount = 12;
      for (let i = 0; i < rightBorderCount; i++) {
        const spreadX =
          canvas.width * 0.85 + Math.random() * canvas.width * 0.15;
        const spreadY = Math.random() * canvas.height;
        nodes.push(createNode(spreadX, spreadY));
      }

      // Bottom-left cluster
      const bottomLeftCount = 18;
      for (let i = 0; i < bottomLeftCount; i++) {
        const spreadX = Math.random() * canvas.width * 0.4;
        const spreadY =
          canvas.height * 0.6 + Math.random() * canvas.height * 0.4;
        nodes.push(createNode(spreadX, spreadY));
      }

      // Bottom-right cluster
      const bottomRightCount = 16;
      for (let i = 0; i < bottomRightCount; i++) {
        const spreadX = canvas.width * 0.6 + Math.random() * canvas.width * 0.4;
        const spreadY =
          canvas.height * 0.6 + Math.random() * canvas.height * 0.4;
        nodes.push(createNode(spreadX, spreadY));
      }

      // Top-left corner
      const topLeftCount = 10;
      for (let i = 0; i < topLeftCount; i++) {
        const spreadX = Math.random() * canvas.width * 0.3;
        const spreadY = Math.random() * canvas.height * 0.3;
        nodes.push(createNode(spreadX, spreadY));
      }

      // Top-right corner
      const topRightCount = 10;
      for (let i = 0; i < topRightCount; i++) {
        const spreadX = canvas.width * 0.7 + Math.random() * canvas.width * 0.3;
        const spreadY = Math.random() * canvas.height * 0.3;
        nodes.push(createNode(spreadX, spreadY));
      }

      // Center/middle nodes (more nodes now)
      const centerCount = 20;
      for (let i = 0; i < centerCount; i++) {
        const spreadX = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
        const spreadY =
          canvas.height * 0.2 + Math.random() * canvas.height * 0.6;
        nodes.push(createNode(spreadX, spreadY));
      }
    };

    const createNode = (x, y) => ({
      x: x,
      y: y,
      baseX: x,
      baseY: y,
      radius: Math.random() * 1.5 + 0.5, // Smaller nodes
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.8 + 0.3,
      // Faster drift movement
      driftX: (Math.random() - 0.5) * 0.4,
      driftY: (Math.random() - 0.5) * 0.4,
    });

    const drawConnections = () => {
      const maxDistance = 150;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = () => {
      nodes.forEach((node) => {
        // Subtle glow effect (reduced)
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      // Active floating motion + drift
      nodes.forEach((node) => {
        // More movement
        node.x = node.baseX + Math.sin(time * node.speed + node.phase) * 15;
        node.y = node.baseY + Math.cos(time * node.speed + node.phase) * 12;

        // Slow drift
        node.baseX += node.driftX;
        node.baseY += node.driftY;

        // Wrap around edges
        if (node.baseX < -20) node.baseX = canvas.width + 20;
        if (node.baseX > canvas.width + 20) node.baseX = -20;
        if (node.baseY < -20) node.baseY = canvas.height + 20;
        if (node.baseY > canvas.height + 20) node.baseY = -20;
      });

      drawConnections();
      drawNodes();

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

export default GeometricBackground;
