document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Fade-in Animation for Elements
    const faders = document.querySelectorAll('.card, .details, section');
    faders.forEach(el => el.classList.add('fade-in'));
    
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // 2. Form Validation (Contact Page)
    const contactForm = document.querySelector('form[action*="mailto"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            
            // Basic Validation logic
            if (name.value.trim().length < 2) { isValid = false; alert("Please enter a valid name."); }
            if (phone.value.trim().length < 10) { isValid = false; alert("Please enter a valid phone number (at least 10 digits)."); }
            if (!email.value.includes('@')) { isValid = false; alert("Please enter a valid email address."); }
            
            if (!isValid) {
                e.preventDefault(); // Stop submission if invalid
            } else {
                // AJAX Simulation / Dynamic Response for requirement
                e.preventDefault();
                alert("Thank you, " + name.value + "! Your booking request has been validated and sent to Sammy.");
                contactForm.reset();
            }
        });
    }

    // 3. Dynamic Search Functionality (Shop Page)
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const filter = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(filter) || desc.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 4. Lightbox Gallery (Index/Service Pages)
    const galleryImages = document.querySelectorAll('.gallery-img');
    if (galleryImages.length > 0) {
        // Create Lightbox HTML dynamically
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = '<span class="close">&times;</span><img src="" alt="Enlarged View">';
        document.body.appendChild(lightbox);
     const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.close');

        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src;
            });
        });

        closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) lightbox.style.display = 'none';
        });
    }
});