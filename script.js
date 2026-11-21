const menuToggle = document.getElementById("menuToggle");

const nav = document.getElementById("nav");

if (menuToggle && nav) {
  
  menuToggle.addEventListener("click", () => {
    
    const open = nav.classList.toggle("open");
    
    menuToggle.setAttribute(
      
      "aria-expanded",
      
      String(open)
      
    );
    
  });
  
  nav.querySelectorAll("a").forEach(link => {
    
    link.addEventListener("click", () => {
      
      nav.classList.remove("open");
      
      menuToggle.setAttribute(
        
        "aria-expanded",
        
        "false"
        
      );
      
    });
    
  });
  
}

// Scroll reveal animation

const revealObserver = new IntersectionObserver(entries => {
  
  entries.forEach(entry => {
    
    if (entry.isIntersecting) {
      
      entry.target.classList.add("visible");
      
      revealObserver.unobserve(entry.target);
      
    }
    
  });
  
}, {
  
  threshold: 0.12
  
});

document.querySelectorAll(".reveal").forEach(el => {
  
  revealObserver.observe(el);
  
});

// Page scroll progress

const progress = document.getElementById("pageProgress");

if (progress) {
  
  window.addEventListener("scroll", () => {
    
    const max =
      
      document.documentElement.scrollHeight -
      
      window.innerHeight;
    
    progress.style.width =
      
      `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    
  }, {
    
    passive: true
    
  });
  
}

// Automatic copyright year

document.getElementById("year").textContent =
  
  new Date().getFullYear();