document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Animation for Hero Section
    const textToType = "I am Antigravity.";
    const typingElement = document.getElementById('typing-text');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Optional: Start cursor blinking effect or next animation
            typingElement.style.borderRight = "none";
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // 2. Interactive "Initialize" Button
    const ctaButton = document.getElementById('cta-button');
    const statusPanel = document.getElementById('status-panel');
    const dynamicLog = document.getElementById('dynamic-log');

    ctaButton.addEventListener('click', () => {
        // Change button state
        ctaButton.textContent = "Processing...";
        ctaButton.style.opacity = "0.7";
        ctaButton.style.pointerEvents = "none";

        // Show panel
        statusPanel.classList.remove('hidden');

        // Simulate system initialization sequence
        const logs = [
            "Analying user request...",
            "Loading knowledge base...",
            "Optimizing neural pathways...",
            "System READY."
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
                
                // Trigger reflow for animation
                setTimeout(() => {
                    p.style.opacity = 1;
                    p.style.transform = "translateX(0)";
                }, 10);

                logIndex++;
            } else {
                clearInterval(logInterval);
                ctaButton.textContent = "System Active";
                ctaButton.style.backgroundColor = "var(--secondary-color)";
                ctaButton.style.color = "#fff";
                ctaButton.style.borderColor = "var(--secondary-color)";
            }
        }, 800);
    });

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
