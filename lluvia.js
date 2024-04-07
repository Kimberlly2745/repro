function createBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');
    container.appendChild(bubbleContainer);

    for (let i = 0; i < 50; i++) { // Aumenta el número de burbujas
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = Math.random() * 5 + 2 + 's';
        bubble.style.opacity = Math.random() * 0.6 + 0.3;
        bubbleContainer.appendChild(bubble);

        bubble.addEventListener('animationend', () => {
            bubble.remove();
            if (bubbleContainer.childNodes.length === 0) {
                bubbleContainer.remove();
            }
        });
    }
}

setInterval(createBubbles, 8000);
