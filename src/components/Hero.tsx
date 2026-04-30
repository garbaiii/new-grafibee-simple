import { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToWork = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPortfolio = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let particles: Particle[] = [];
    let particleCount = 80;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#803BB2';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      const parentRect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = parentRect?.width ?? window.innerWidth;
      canvas.height = parentRect?.height ?? window.innerHeight;

      particleCount = window.innerWidth < 768 ? 40 : 80;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const drawLines = () => {
      if (!ctx) return;
      ctx.strokeStyle = '#803BB2';
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(128, 59, 178, ${0.22 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      drawLines();
      
      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-50"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-0">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
            Nem csak <span className="text-white/60">kódolunk</span>.<br />
            <span className="text-primary">Élményt építünk.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-lg">
            Modern, reszponzív és letisztult weboldalak, amelyek nem csak jól néznek ki, 
            hanem üzleti eredményeket is hoznak.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={scrollToWork}
              className="px-8 py-4 sm:py-3 min-h-11 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(128,59,178,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Induljunk el
            </button>
            <button
              type="button"
              onClick={scrollToPortfolio}
              className="px-8 py-4 sm:py-3 min-h-11 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Munkáink
            </button>
          </div>
        </div>

        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-orchid-mist/20 to-transparent rounded-2xl blur-3xl animate-pulse" />
          <div className="relative bg-deep-black/60 backdrop-blur-md border border-primary/35 rounded-2xl p-6 shadow-2xl">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <pre className="text-[11px] lg:text-xs leading-normal font-mono text-white/90 max-w-full overflow-x-auto">
              <code className="whitespace-pre">
                <span className="text-primary">interface</span> Project {'{\n'}
                {'  '}vision: <span className="text-primary">string</span>;<br/>
                {'  '}code: <span className="text-primary">'clean'</span> | <span className="text-primary">'robust'</span>;<br/>
                {'}'}<br/><br/>
                <span className="text-white/60">// grafibee - a minoseg nem alkuszik</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;