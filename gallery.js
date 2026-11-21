const galleryPhotos = [
  
  {
    
    file: "Champion-Hero.jpg",
    
    title: "Champion — Portrait",
    
    category: "portrait"
    
  },
  
  {
    
    file: "Leadership.png",
    
    title: "Leadership & public engagement",
    
    category: "leadership"
    
  },
  
  {
    
    file: "Events.png",
    
    title: "Events & campus moments",
    
    category: "events"
    
  },
  
  {
    
    file: "Marketing.png",
    
    title: "Brand promotion",
    
    category: "marketing"
    
  },
  
  {
    
    file: "Networking.png",
    
    title: "Professional networking",
    
    category: "networking"
    
  },
  
  ...Array.from({ length: 17 }, (_, i) => ({
    
    file: `Gallery-${String(i + 6).padStart(2, "0")}.png`,
    
    title: `Gallery photograph ${i + 6}`,
    
    category: "events"
    
  }))
  
];

const grid = document.getElementById("galleryGrid");

const usablePhotos = [];

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

let activeIndex = 0;

// Create gallery cards

galleryPhotos.forEach((photo, index) => {
  
  const card = document.createElement("button");
  
  card.type = "button";
  
  card.className = "gallery-card";
  
  card.dataset.category = photo.category;
  
  card.setAttribute("aria-label", photo.title);
  
  const img = document.createElement("img");
  
  img.src = `images/${photo.file}`;
  
  img.alt = photo.title;
  
  img.loading = "lazy";
  
  const label = document.createElement("span");
  
  label.className = "gallery-label";
  
  label.textContent = photo.title;
  
  img.addEventListener("load", () => {
    
    usablePhotos[index] = {
      
      src: img.src,
      
      title: photo.title
      
    };
    
  });
  
  img.addEventListener("error", () => {
    
    card.classList.add("placeholder");
    
    card.disabled = true;
    
    card.innerHTML = `

      <div class="placeholder-inner">

        <b>${photo.file}</b>

        <span>Add this image to the images folder</span>

      </div>

    `;
    
  });
  
  card.append(img, label);
  
  card.addEventListener("click", () => {
    
    openLightbox(index);
    
  });
  
  grid.appendChild(card);
  
});

// Gallery filters

document.querySelectorAll(".filter-btn").forEach(button => {
  
  button.addEventListener("click", () => {
    
    document.querySelector(".filter-btn.active")
      
      ?.classList.remove("active");
    
    button.classList.add("active");
    
    const filter = button.dataset.filter;
    
    document.querySelectorAll(".gallery-card").forEach(card => {
      
      card.hidden =
        
        filter !== "all" &&
        
        card.dataset.category !== filter;
      
    });
    
  });
  
});

// Open lightbox

function openLightbox(index) {
  
  if (!usablePhotos[index]) return;
  
  activeIndex = index;
  
  showImage();
  
  lightbox.classList.add("open");
  
  lightbox.setAttribute("aria-hidden", "false");
  
  document.body.style.overflow = "hidden";
  
}

// Display selected image

function showImage() {
  
  const item = usablePhotos[activeIndex];
  
  if (!item) return;
  
  lightboxImage.src = item.src;
  
  lightboxImage.alt = item.title;
  
  lightboxCaption.textContent = item.title;
  
}

// Previous and next images

function moveImage(direction) {
  
  const available = usablePhotos
    
    .map((item, i) => item ? i : -1)
    
    .filter(i => i >= 0);
  
  if (!available.length) return;
  
  let pos = available.indexOf(activeIndex);
  
  pos = (pos + direction + available.length) %
    
    available.length;
  
  activeIndex = available[pos];
  
  showImage();
  
}

// Close lightbox

function closeLightbox() {
  
  lightbox.classList.remove("open");
  
  lightbox.setAttribute("aria-hidden", "true");
  
  document.body.style.overflow = "";
  
}

document.getElementById("lightboxClose")
  
  .addEventListener("click", closeLightbox);

document.getElementById("lightboxPrev")
  
  .addEventListener("click", () => moveImage(-1));

document.getElementById("lightboxNext")
  
  .addEventListener("click", () => moveImage(1));

lightbox.addEventListener("click", e => {
  
  if (e.target === lightbox) {
    
    closeLightbox();
    
  }
  
});

// Keyboard controls

document.addEventListener("keydown", e => {
  
  if (e.key === "Escape") {
    
    closeLightbox();
    
  }
  
  if (e.key === "ArrowLeft") {
    
    moveImage(-1);
    
  }
  
  if (e.key === "ArrowRight") {
    
    moveImage(1);
    
  }
  
});

// Automatic copyright year

document.getElementById("year").textContent =
  
  new Date().getFullYear();