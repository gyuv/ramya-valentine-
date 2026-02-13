gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Fade in intro
gsap.from(".title", {opacity:0, y:-50, duration:2});
gsap.from(".subtitle", {opacity:0, delay:1, duration:2});

// Timeline animation
gsap.utils.toArray(".moment").forEach(section => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    },
    opacity:1,
    y:0,
    duration:1.5
  });
});

// Running animation
gsap.to(".boy", {
  scrollTrigger: {
    trigger: ".timeline",
    start: "top center",
    end: "bottom center",
    scrub: true
  },
  x: window.innerWidth - 250
});

// Hug particle effect
const canvas = document.getElementById("hugCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles() {
  for(let i=0;i<200;i++){
    particles.push({
      x: canvas.width/2,
      y: canvas.height/2,
      vx: (Math.random()-0.5)*5,
      vy: (Math.random()-0.5)*5,
      life: 100
    });
  }
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;
    p.life--;
    ctx.fillStyle="rgba(255,215,0,0.7)";
    ctx.fillRect(p.x,p.y,3,3);
  });
  particles=particles.filter(p=>p.life>0);
  requestAnimationFrame(animateParticles);
}

ScrollTrigger.create({
  trigger: ".timeline",
  start: "bottom center",
  onEnter: ()=>{
    createParticles();
    animateParticles();
  }
});
