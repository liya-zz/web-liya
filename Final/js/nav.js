// NAVBAR TOGGLE Handling.
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  
  menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      document.querySelector('.nav-right').classList.toggle('active');
  });
  
  // Close menu when clicking on links
  document.querySelectorAll('.nav-link, .resume-btn').forEach(link => {
      link.addEventListener('click', function() {
          menuToggle.classList.remove('active');
          document.querySelector('.nav-right').classList.remove('active');
      });
  });
});


// SCROLL EFFECT FOR PROJECT PAGE.
const scrollReveal = () => {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      
      if (sectionTop < windowHeight - revealPoint) {
        section.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', scrollReveal);
  window.addEventListener('load', scrollReveal);