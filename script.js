window.addEventListener("load", function () {

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  console.log("GSAP Loaded:", typeof gsap);

  // Intro animation
  gsap.from(".title", {
    opacity: 0,
    y: -80,
    duration: 2,
    ease: "power3.out"
  });

  gsap.from(".subtitle", {
    opacity: 0,
    delay: 1,
    duration: 2
  });

  // Timeline fade animation
  gsap.utils.toArray(".moment").forEach(section => {
    gsap.fromTo(section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Boy running animation
  gsap.to(".boy", {
    x: window.innerWidth - 200,
    scrollTrigger: {
      trigger: ".timeline",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });

  // Particle Hug
  const canvas = document.getElementById("hugCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createParticles() {
    for (let i = 0; i < 250; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 120
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.fillStyle = "rgba(255,215,0,0.8)";
      ctx.fillRect(p.x, p.y, 3, 3);
    });
    particles = particles.filter(p => p.life > 0);
    requestAnimationFrame(animateParticles);
  }

  ScrollTrigger.create({
    trigger: ".timeline",
    start: "bottom center",
    onEnter: () => {
      createParticles();
      animateParticles();
    }
  });

});
