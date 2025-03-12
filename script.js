document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour animer les lettres du texte
    function animateLetters() {
        const textElements = document.querySelectorAll('.animated-text');
        
        textElements.forEach(text => {
            const content = text.textContent;
            text.textContent = '';
            
            // Diviser le texte en lettres et les animer individuellement
            for (let i = 0; i < content.length; i++) {
                const letter = document.createElement('span');
                letter.className = 'letter';
                letter.style.setProperty('--i', i);
                letter.textContent = content[i];
                text.appendChild(letter);
            }
        });
    }
    
    // Appeler la fonction pour préparer l'animation des lettres
    animateLetters();
    // Variables
    const landing = document.getElementById('landing');
    const startButton = document.querySelector('.start-button');
    const emotionsContainer = document.getElementById('emotions-container');
    const emotions = document.querySelectorAll('.emotion');
    const navButtons = document.querySelectorAll('.nav-btn');
    const joyBtn = document.getElementById('joy-btn');
    const calmBtn = document.getElementById('calm-btn');
    const surpriseBtn = document.getElementById('surprise-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    let currentEmotionIndex = 0;
    let isAnimating = false;
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollCooldown = 800; // Temps en ms pour éviter les défilements trop rapides

    // Masquer initialement toutes les émotions
    emotions.forEach((emotion, index) => {
        emotion.style.display = index === 0 ? 'flex' : 'none';
    });

    // Animation du landing page
    createParticles();

    // Commencer l'expérience
    startButton.addEventListener('click', function() {
        landing.classList.add('landing-exit');
        setTimeout(() => {
            landing.style.display = 'none';
            activateEmotion(0);
            scrollIndicator.classList.add('visible'); // Afficher l'indicateur de défilement
        }, 1500);
    });
    
    // Navigation par les indicateurs de défilement
    indicatorDots.forEach((dot) => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (!isAnimating && index !== currentEmotionIndex) {
                navigateToEmotion(index);
            }
        });
    });

    // Navigation par boutons
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (!isAnimating) {
                navigateToEmotion(index);
            }
        });
    });
    
    // Navigation par défilement (scroll)
    window.addEventListener('wheel', function(event) {
        const currentTime = new Date().getTime();
        // Vérifier si nous sommes en dehors du cooldown
        if (currentTime - lastScrollTime > scrollCooldown && !isAnimating && landing.style.display === 'none') {
            lastScrollTime = currentTime;
            
            if (event.deltaY > 0) {
                // Défiler vers le bas (émotion suivante)
                const nextIndex = (currentEmotionIndex + 1) % emotions.length;
                navigateToEmotion(nextIndex);
            } else if (event.deltaY < 0) {
                // Défiler vers le haut (émotion précédente)
                const prevIndex = (currentEmotionIndex - 1 + emotions.length) % emotions.length;
                navigateToEmotion(prevIndex);
            }
        }
    });
    
    // Navigation sur appareils tactiles
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    document.addEventListener('touchstart', function(event) {
        touchStartY = event.changedTouches[0].screenY;
    }, false);
    
    document.addEventListener('touchend', function(event) {
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const currentTime = new Date().getTime();
        if (currentTime - lastScrollTime > scrollCooldown && !isAnimating && landing.style.display === 'none') {
            lastScrollTime = currentTime;
            
            const swipeDistance = touchEndY - touchStartY;
            
            if (swipeDistance > minSwipeDistance) {
                // Swipe vers le bas (émotion précédente)
                const prevIndex = (currentEmotionIndex - 1 + emotions.length) % emotions.length;
                navigateToEmotion(prevIndex);
            } else if (swipeDistance < -minSwipeDistance) {
                // Swipe vers le haut (émotion suivante)
                const nextIndex = (currentEmotionIndex + 1) % emotions.length;
                navigateToEmotion(nextIndex);
            }
        }
    };

    // Fonction pour activer une émotion
    function activateEmotion(index) {
        isAnimating = true;
        
        // Cacher toutes les émotions
        emotions.forEach(emotion => {
            emotion.style.display = 'none';
            emotion.classList.remove('active');
        });
        
        // Afficher l'émotion sélectionnée
        emotions[index].style.display = 'flex';
        emotions[index].classList.add('active');
        
        // Mettre à jour l'index de l'émotion actuelle
        currentEmotionIndex = index;
        
        // Désactiver l'animation après un délai
        setTimeout(() => {
            isAnimating = false;
        }, 1000); // Durée de l'animation en ms
    }

    // Fonction pour naviguer vers une émotion
    function navigateToEmotion(index) {
        if (index === currentEmotionIndex) return;
        activateEmotion(index);
    }

    // Création des particules pour le landing
    function createParticles() {
        const landingElem = document.getElementById('landing');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Position aléatoire
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            // Taille aléatoire
            const size = Math.random() * 5 + 2;
            
            // Animation
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
            
            landingElem.appendChild(particle);
        }
    }

    // Création des particules pour la joie
    function createJoyParticles() {
        const joieElem = document.getElementById('joie');
        
        // Supprimons les anciennes particules s'il y en a
        const oldParticles = joieElem.querySelectorAll('.joie-particle');
        oldParticles.forEach(p => p.remove());
        
        // Créer des particules de joie qui montent
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('joie-particle');
            
            // Position aléatoire
            const posX = Math.random() * window.innerWidth;
            const posY = window.innerHeight + Math.random() * 100;
            
            // Taille aléatoire
            const size = Math.random() * 10 + 5;
            
            // Couleur jaune-orange aléatoire pour plus de variété
            const hue = Math.floor(Math.random() * 30) + 40; // 40-70 (jaune-orange)
            const saturation = Math.floor(Math.random() * 20) + 80; // 80-100%
            const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
            
            // Animation
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
            particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
            
            joieElem.appendChild(particle);
        }
    }
    
    // Création des particules pour le calme
    function createCalmeParticles() {
        const calmeElem = document.getElementById('calme');
        
        // Supprimons les anciennes particules s'il y en a
        const oldParticles = calmeElem.querySelectorAll('.calme-particle');
        oldParticles.forEach(p => p.remove());
        
        // Créer des particules flottantes douces
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('calme-particle');
            
            // Position aléatoire
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            // Taille aléatoire (plus petite que celles de la joie)
            const size = Math.random() * 5 + 2;
            
            // Animation
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 10;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();
            particle.style.animation = `floatCalme ${duration}s ${delay}s infinite linear`;
            
            calmeElem.appendChild(particle);
        }
    }

    // Création des cercles pour la surprise
    function createBurstCircles() {
        const burstElem = document.querySelector('.burst');
        const surpriseElem = document.getElementById('surprise');
        
        // Supprimons les anciens éléments s'il y en a
        const oldCircles = burstElem.querySelectorAll('.circle-burst');
        oldCircles.forEach(c => c.remove());
        
        const oldStars = surpriseElem.querySelectorAll('.star');
        oldStars.forEach(s => s.remove());
        
        // Créer des cercles d'explosion
        for (let i = 0; i < 8; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle-burst');
            
            // Position aléatoire
            const posX = 30 + Math.random() * (window.innerWidth - 60);
            const posY = 30 + Math.random() * (window.innerHeight - 60);
            
            // Taille aléatoire
            const size = Math.random() * 100 + 50;
            
            // Couleur aléatoire dans les tons violets-roses
            const hue = Math.floor(Math.random() * 60) + 280; // 280-340 (violet-rose)
            const saturation = Math.floor(Math.random() * 20) + 70; // 70-90%
            const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
            
            // Animation
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * 2;
            
            circle.style.left = `${posX}px`;
            circle.style.top = `${posY}px`;
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`;
            circle.style.animation = `burst ${duration}s ${delay}s infinite`;
            
            burstElem.appendChild(circle);
        }
        
        // Ajouter des étoiles
        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Position aléatoire
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            // Taille aléatoire
            const size = Math.random() * 20 + 10;
            
            // Animation
            const duration = Math.random() * 3 + 1;
            const delay = Math.random() * 3;
            
            star.style.left = `${posX}px`;
            star.style.top = `${posY}px`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animation = `twinkle ${duration}s ${delay}s infinite alternate`;
            
            surpriseElem.appendChild(star);
        }
    }

    // Activation initiale de la joie
    setTimeout(() => {
        createJoyParticles();
    }, 100);
});