document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const guitarSound = document.getElementById('guitarSound');
    const body = document.body;
    const guitarStrings = document.querySelector('.guitar-strings');
    const letterContent = document.querySelector('.letter-content');
    const guitarAnimation = document.querySelector('.guitar-animation');
    const vinylRecord = document.querySelector('.vinyl-record');

    // 1. Efeito de som da guitarra
    function setupGuitarSound() {
        // Tocar som após interação do usuário
        function playGuitarSound() {
            guitarSound.volume = 0.3;
            const playPromise = guitarSound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented, will play after interaction");
                });
            }
        }

        // Tocar no primeiro clique ou scroll
        function handleFirstInteraction() {
            playGuitarSound();
            body.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
        }

        body.addEventListener('click', handleFirstInteraction);
        window.addEventListener('scroll', handleFirstInteraction);
    }

    // 2. Navegação suave
    function setupSmoothScrolling() {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Adiciona classe ativa ao item do menu
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });

        // Atualiza menu ativo durante o scroll
        window.addEventListener('scroll', function() {
            const fromTop = window.scrollY + 100;
            
            document.querySelectorAll('nav a').forEach(link => {
                const section = document.querySelector(link.getAttribute('href'));
                
                if (section && 
                    section.offsetTop <= fromTop && 
                    section.offsetTop + section.offsetHeight > fromTop) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }

    // 3. Efeito de digitação na carta
    function setupTypewriterEffect() {
        if (letterContent) {
            const originalText = letterContent.textContent;
            letterContent.textContent = '';
            let i = 0;
            
            function typeCharacter() {
                if (i < originalText.length) {
                    letterContent.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeCharacter, Math.random() * 50 + 20);
                }
            }
            
            // Inicia após um pequeno delay
            setTimeout(typeCharacter, 1500);
        }
    }

    // 4. Animação das cordas da guitarra
    function animateGuitarStrings() {
        if (guitarStrings) {
            let frame = 0;
            
            function updateStrings() {
                const offset = Math.sin(frame * 0.1) * 3;
                const opacity = 0.2 + Math.abs(Math.sin(frame * 0.05)) * 0.3;
                
                guitarStrings.style.background = `
                    repeating-linear-gradient(
                        to bottom,
                        transparent,
                        transparent ${20 + offset}px,
                        rgba(100, 255, 218, ${opacity}) ${20 + offset}px,
                        rgba(100, 255, 218, ${opacity}) ${21 + offset}px
                    )`;
                
                frame++;
                requestAnimationFrame(updateStrings);
            }
            
            updateStrings();
        }
    }

    // 5. Animação da guitarra
    function animateGuitar() {
        if (guitarAnimation) {
            let angle = 0;
            
            function rotateGuitar() {
                angle += 0.2;
                const rotation = Math.sin(angle * 0.05) * 5;
                guitarAnimation.style.transform = `rotate(${rotation}deg)`;
                requestAnimationFrame(rotateGuitar);
            }
            
            rotateGuitar();
        }
    }

    // 6. Efeito no disco de vinil
    function animateVinylRecord() {
        if (vinylRecord) {
            let isPlaying = false;
            
            vinylRecord.addEventListener('click', function() {
                isPlaying = !isPlaying;
                const vinyl = this.querySelector('.vinyl');
                
                if (isPlaying) {
                    vinyl.style.animationPlayState = 'running';
                    guitarSound.currentTime = 0;
                    guitarSound.play();
                } else {
                    vinyl.style.animationPlayState = 'paused';
                    guitarSound.pause();
                }
            });
        }
    }

    // 7. Efeito de parallax simples
    function setupParallax() {
        const heroSection = document.querySelector('#hero');
        
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            });
        }
    }

    // 8. Carregamento progressivo das imagens
    function lazyLoadImages() {
        const images = document.querySelectorAll('.photo-frame img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 9. Paginação do álbum de fotos
    function setupAlbumPagination() {
        const albumGrid = document.querySelector('.album-grid');
        const pagination = document.querySelector('.album-pagination');
        
        if (!albumGrid || !pagination) return;
        
        const photos = Array.from(document.querySelectorAll('.photo-frame'));
        const photosPerPage = 6;
        const pageCount = Math.ceil(photos.length / photosPerPage);
        let currentPage = 0;
        
        // Cria botões de paginação
        for (let i = 0; i < pageCount; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn';
            pageBtn.textContent = i + 1;
            pageBtn.dataset.page = i;
            
            pageBtn.addEventListener('click', function() {
                currentPage = parseInt(this.dataset.page);
                showPage(currentPage);
                updateActiveButton();
            });
            
            pagination.appendChild(pageBtn);
        }
        
        // Mostra a página atual
        function showPage(page) {
            const start = page * photosPerPage;
            const end = start + photosPerPage;
            
            photos.forEach((photo, index) => {
                photo.style.display = (index >= start && index < end) ? 'block' : 'none';
            });
        }
        
        // Atualiza botão ativo
        function updateActiveButton() {
            document.querySelectorAll('.page-btn').forEach((btn, index) => {
                btn.classList.toggle('active', index === currentPage);
            });
        }
        
        // Mostra primeira página inicialmente
        showPage(0);
        updateActiveButton();
    }

    // 10. Efeito de confete ao final da carta
    function setupConfettiEffect() {
        const signature = document.querySelector('.signature');
        
        if (signature) {
            signature.addEventListener('click', function() {
                const colors = ['#64ffda', '#1e90ff', '#ff6b6b', '#feca57'];
                
                for (let i = 0; i < 100; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = `${Math.random() * 100}vw`;
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                    confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
                    
                    document.body.appendChild(confetti);
                    
                    // Remove após a animação
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
            });
        }
    }

    // Inicializa todas as funcionalidades
    setupGuitarSound();
    setupSmoothScrolling();
    setupTypewriterEffect();
    animateGuitarStrings();
    animateGuitar();
    animateVinylRecord();
    setupParallax();
    lazyLoadImages();
    setupAlbumPagination();
    setupConfettiEffect();

    // Adiciona classe loaded ao body após carregamento
    setTimeout(() => {
        body.classList.add('loaded');
    }, 500);
});
