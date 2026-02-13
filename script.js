window.addEventListener("load", function () {

    // Intro animation
    gsap.to(".title", {opacity:1, y:-20, duration:2});
    gsap.to(".subtitle", {opacity:1, delay:1, duration:2});

    // Timeline fade on scroll (manual)
    const moments = document.querySelectorAll(".moment");

    window.addEventListener("scroll", function () {
        moments.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                gsap.to(el, {opacity:1, y:0, duration:1});
            }
        });

        // Move boy based on scroll
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        gsap.to(".boy", {
            x: scrollPercent * (window.innerWidth - 100),
            duration: 0.3
        });

        // Fire particles at bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
            createParticles();
        }
    });

    // Countdown to 15 Aug 2026
    const target = new Date("August 15, 2026 00:00:00").getTime();
    const countdown = document.getElementById("countdown");

    setInterval(function() {
        const now = new Date().getTime();
        const diff = target - now;

        const days = Math.floor(diff / (1000*60*60*24));
        const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
        const secs = Math.floor((diff % (1000*60)) / 1000);

        countdown.innerHTML = 
        `Anniversary Countdown ❤️ <br>
         ${days} Days ${hours} Hrs ${mins} Min ${secs} Sec`;
    }, 1000);

    // Particle system
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createParticles() {
        for (let i=0; i<150; i++) {
            let x = window.innerWidth/2;
            let y = window.innerHeight/2;
            let vx = (Math.random()-0.5)*8;
            let vy = (Math.random()-0.5)*8;

            animateParticle(x,y,vx,vy);
        }
    }

    function animateParticle(x,y,vx,vy) {
        let life = 100;

        function draw() {
            if (life <= 0) return;

            ctx.fillStyle = "rgba(255,215,0,0.8)";
            ctx.fillRect(x,y,3,3);

            x += vx;
            y += vy;
            life--;

            requestAnimationFrame(draw);
        }

        draw();
    }

});
