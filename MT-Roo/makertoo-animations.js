// Add smooth scroll to links
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Intersection Observer for animations
  const animateOnScroll = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  };

  // Animate value cards on scroll
  const cards = document.querySelectorAll('.makertoo-value-card');
  animateOnScroll(cards, 'animate-fade-in');
});

// Additional animation styles to add to CSS
/*
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
*/