function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });
  
  // Active Navigation Link
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
  
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
  
  // Typing Animation
  class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
  
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      let typeSpeed = 100;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Init Typing Animation On Load
  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    const txtElement = document.querySelector('.dynamic-text');
    const words = JSON.parse(txtElement.getAttribute('data-type'));
    const wait = txtElement.getAttribute('data-period');
    new TypeWriter(txtElement, words, wait);
  }
  
  // Dark / light mode
  
  const btn = document.getElementById("modeToggle");
  const themeIcons = document.querySelectorAll(".icon");
  const currentTheme = localStorage.getItem("theme");
  
  // Set initial theme based on localStorage or system preference
  function initializeTheme() {
    if (currentTheme === "dark") {
      setDarkMode();
    } else if (currentTheme === "light") {
      setLightMode();
    } else {
      // Default to light mode
      setLightMode();
    }
  }
  
  // Initialize theme when DOM is loaded
  document.addEventListener('DOMContentLoaded', initializeTheme);
  
  btn.addEventListener("click", function () {
    setTheme();
  });
  
  function setTheme() {
    let currentTheme = document.body.getAttribute("theme");
    if (currentTheme === "dark") {
      setLightMode();
    } else {
      setDarkMode();
    }
  }
  
  function setDarkMode() {
    document.body.setAttribute("theme", "dark");
    localStorage.setItem("theme", "dark");
  
    themeIcons.forEach((icon) => {
      if (icon.hasAttribute("src-dark")) {
        icon.src = icon.getAttribute("src-dark");
      }
    });
  }
  
  function setLightMode() {
    document.body.removeAttribute("theme");
    localStorage.setItem("theme", "light");
  
    themeIcons.forEach((icon) => {
      if (icon.hasAttribute("src-light")) {
        icon.src = icon.getAttribute("src-light");
      }
    });
  }
  
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Project Cards Animation
  document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        // Add a subtle tilt effect
        this.style.transform = `translateY(-10px) rotate3d(${Math.random()}, ${Math.random()}, 0, 2deg)`;
      });
      
      card.addEventListener('mouseleave', function() {
        // Reset transform
        this.style.transform = '';
      });
      
      // Animate tech tags on hover
      const techTags = card.querySelectorAll('.tech-tag');
      techTags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 50}ms`;
      });
    });
  });