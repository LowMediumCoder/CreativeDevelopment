document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const landing = document.getElementById('landing');
    const startButton = document.querySelector('.start-button');
    const emotionsContainer = document.getElementById('emotions-container');
    const emotions = document.querySelectorAll('.emotion');
    const navButtons = document.querySelectorAll('.nav-btn');
    const joyBtn = document.getElementById('joy-btn');
    const calmBtn = document.getElementById('calm-btn');
    const surpriseBtn = document.getElementById('surprise-btn');
    
    let currentEmotionIndex = 0;
    let isAnimating = false;

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
        }, 1500);
    });

    // Navigation
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (!isAnimating) {
                navigateToEmotion(index);
            }
        });
    });

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
        
        // Créer les animations spécifiques à l'émotion
        if (index === 0) { // Joie
            createJoyParticles();
        } else if (index === 2) { // Surprise
            createBurstCircles();
        }
        
        // Activer l'émotion après un court délai
        setTimeout(() => {
            emotions[index].classList.add('active');
            isAnimating = false;
        }, 100);
        
        currentEmotionIndex = index;
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
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('joie-particle');
            
            // Position aléatoire
            const posX = Math.random() * window.innerWidth;
            const posY = window.innerHeight + Math.random() * 100;
            
            // Taille aléatoire
            const size = Math.random() * 10 + 5;
            
            // Animation
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
            
            joieElem.appendChild(particle);
        }
    }

    // Création des cercles pour la surprise
    function createBurstCircles() {
        const burstElem = document.querySelector('.burst');
        
        // Supprimons les anciens cercles s'il y en a
        const oldCircles = burstElem.querySelectorAll('.circle-burst');
        oldCircles.forEach(c => c.remove());
        
        for (let i = 0; i < 8; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle-burst');
            
            // Position aléatoire
            const posX = 30 + Math.random() * (window.innerWidth - 60);
            const posY = 30 + Math.random() * (window.innerHeight - 60);
            
            // Taille aléatoire
            const size = Math.random() * 100 + 50;
            
            // Animation
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * 2;
            
            circle.style.left = `${posX}px`;
            circle.style.top = `${posY}px`;
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.animation = `burst ${duration}s ${delay}s infinite`;
            
            burstElem.appendChild(circle);
        }
    }

    // Activation initiale de la joie
    setTimeout(() => {
        createJoyParticles();
    }, 100);
});