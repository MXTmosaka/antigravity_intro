document.addEventListener('DOMContentLoaded', () => {
    initHomePage();
    initPlayground();
    initGlobalNav();
});

function initHomePage() {
    // 1. Typing Animation for Hero Section
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "I am Antigravity.";
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                typingElement.style.borderRight = "none";
            }
        }
        setTimeout(typeWriter, 500);
    }

    // 2. Interactive "Initialize" Button
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        const statusPanel = document.getElementById('status-panel');
        const dynamicLog = document.getElementById('dynamic-log');

        ctaButton.addEventListener('click', () => {
            ctaButton.textContent = "Processing...";
            ctaButton.style.opacity = "0.7";
            ctaButton.style.pointerEvents = "none";
            statusPanel.classList.remove('hidden');

            const logs = [
                "ユーザーリクエストを解析中...",
                "ナレッジベースをロード中...",
                "ニューラルパスを最適化中...",
                "システム準備完了。"
            ];

            let logIndex = 0;
            const logInterval = setInterval(() => {
                if (logIndex < logs.length) {
                    const p = document.createElement('p');
                    p.textContent = `> ${logs[logIndex]}`;
                    p.style.opacity = 0;
                    p.style.transform = "translateX(-10px)";
                    p.style.transition = "all 0.3s";
                    dynamicLog.appendChild(p);

                    setTimeout(() => {
                        p.style.opacity = 1;
                        p.style.transform = "translateX(0)";
                    }, 10);

                    logIndex++;
                } else {
                    clearInterval(logInterval);
                    ctaButton.textContent = "システム稼働中";
                    ctaButton.style.backgroundColor = "var(--secondary-color)";
                    ctaButton.style.color = "#fff";
                    ctaButton.style.borderColor = "var(--secondary-color)";
                }
            }, 800);
        });
    }
}

function initGlobalNav() {
    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initPlayground() {
    const canvas = document.getElementById('gravityCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    // Simulation State
    let isAntiGravity = false;
    const particles = [];
    const particleCount = 200;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 4 + 2;
            this.color = `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.1})`;
        }

        update() {
            if (isAntiGravity) {
                this.y -= this.speedY * 1.5;
                this.color = `rgba(189, 52, 254, ${Math.random() * 0.7 + 0.3})`; // Purple
            } else {
                this.y += this.speedY;
                this.color = `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.1})`; // Cyan
            }

            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // Controls
    const btn = document.getElementById('gravity-btn');
    ['mousedown', 'touchstart'].forEach(evt =>
        btn.addEventListener(evt, (e) => {
            e.preventDefault();
            isAntiGravity = true;
            btn.textContent = "反重力稼働中";
            btn.style.background = "var(--secondary-color)";
            btn.style.color = "white";
        })
    );

    ['mouseup', 'mouseleave', 'touchend'].forEach(evt =>
        btn.addEventListener(evt, () => {
            isAntiGravity = false;
            btn.textContent = "反重力起動";
            btn.style.background = "transparent";
            btn.style.color = "var(--primary-color)";
        })
    );
}
