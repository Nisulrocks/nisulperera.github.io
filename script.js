document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        fadeObserver.observe(section);
    });
    
    function updateNavigation() {
        const scrollPosition = window.scrollY + 150; 
        
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const isAtBottom = (window.scrollY + 50 >= scrollMax);
        
        if (isAtBottom && sections.length > 0) {
            const lastSectionId = sections[sections.length - 1].id;
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href').substring(1);
                if (href === lastSectionId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            return;
        }
        
        let currentSection = sections[0].id;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateNavigation);
    
    updateNavigation();

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing effect for header
    const headerText = document.querySelector('.header h1');
    if (headerText) {
        const text = headerText.textContent;
        headerText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                headerText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Initialize skill progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});
