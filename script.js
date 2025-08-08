document.addEventListener('DOMContentLoaded', function() {
    // Tocar som da guitarra ao carregar a página
    const guitarSound = document.getElementById('guitarSound');
    
    // Esperar interação do usuário para tocar o som (requisito dos navegadores)
    function playGuitarSound() {
        // Tenta tocar o som
        const playPromise = guitarSound.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Som tocado com sucesso
            })
            .catch(error => {
                console.log("Reprodução automática prevenida pelo navegador");
            });
        }
    }
    
    // Tocar ao clicar em qualquer lugar da página
    document.body.addEventListener('click', function() {
        playGuitarSound();
        // Remover o event listener após o primeiro clique
        document.body.removeEventListener('click', arguments.callee);
    });
    
    // Suavizar rolagem para as seções
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Efeito de digitação na carta
    const letterContent = document.querySelector('.letter-content');
    if (letterContent) {
        const originalText = letterContent.innerHTML;
        letterContent.innerHTML = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                letterContent.innerHTML += originalText.charAt(i);
                i++;
                letterContent.scrollTop = letterContent.scrollHeight;
            } else {
                clearInterval(typingEffect);
            }
        }, 20);
    }
    
    // Animação das cordas da guitarra no header
    const guitarStrings = document.querySelector('.guitar-strings');
    if (guitarStrings) {
        setInterval(() => {
            guitarStrings.style.background = `repeating-linear-gradient(
                to bottom,
                transparent,
                transparent ${Math.random() * 10 + 15}px,
                rgba(100, 255, 218, ${Math.random() * 0.3 + 0.1}) ${Math.random() * 10 + 15}px,
                rgba(100, 255, 218, ${Math.random() * 0.3 + 0.1}) ${Math.random() * 10 + 16}px
            )`;
        }, 300);
    }
});
