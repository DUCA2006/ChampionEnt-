/* ==========================================

   CHAMPION PORTFOLIO — GALLERY JAVASCRIPT

========================================== */

/* GALLERY PHOTOGRAPHS */

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

/* ELEMENTS */

const grid = document.getElementById("galleryGrid");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");

const lightboxNext = document.getElementById("lightboxNext");

const filterButtons = document.querySelectorAll(".filter-btn");

/* STATE */

const usablePhotos = [];

let activeIndex = -1;

let activeFilter = "all";

let previousFocus = null;

let touchStartX = 0;

let touchStartY = 0;

/* ==========================================

   CREATE GALLERY

========================================== */

if (grid) {

  galleryPhotos.forEach((photo, index) => {

    const card = document.createElement("button");

    card.type = "button";

    card.className = "gallery-card";

    card.dataset.category = photo.category;

    card.setAttribute("aria-label", `View ${photo.title}`);

    card.setAttribute("aria-haspopup", "dialog");

    const img = document.createElement("img");

    img.src = `images/${photo.file}`;

    img.alt = photo.title;

    img.loading = "lazy";

    img.decoding = "async";

    const label = document.createElement("span");

    label.className = "gallery-label";

    label.textContent = photo.title;

    usablePhotos[index] = null;

    /* IMAGE LOADED */

    img.addEventListener("load", () => {

      usablePhotos[index] = {

        src: img.src,

        title: photo.title,

        category: photo.category,

        originalIndex: index

      };

    });

    /* IMAGE ERROR */

    img.addEventListener("error", () => {

      usablePhotos[index] = null;

      card.classList.add("placeholder");

      card.disabled = true;

      card.removeAttribute("aria-haspopup");

      const placeholder = document.createElement("div");

      placeholder.className = "placeholder-inner";

      const filename = document.createElement("b");

      filename.textContent = photo.file;

      const message = document.createElement("span");

      message.textContent = "Photograph unavailable";

      placeholder.append(filename, message);

      card.replaceChildren(placeholder);

    });

    /* OPEN LIGHTBOX */

    card.addEventListener("click", () => {

      openLightbox(index);

    });

    card.append(img, label);

    grid.appendChild(card);

  });

}

/* ==========================================

   FILTER GALLERY

========================================== */

filterButtons.forEach(button => {

  button.setAttribute(

    "aria-pressed",

    button.classList.contains("active") ? "true" : "false"

  );

  button.addEventListener("click", () => {

    activeFilter = button.dataset.filter;

    filterButtons.forEach(item => {

      const active = item === button;

      item.classList.toggle("active", active);

      item.setAttribute(

        "aria-pressed",

        String(active)

      );

    });

    document.querySelectorAll(".gallery-card").forEach(card => {

      const matches =

        activeFilter === "all" ||

        card.dataset.category === activeFilter;

      card.hidden = !matches;

    });

  });

});

/* ==========================================

   GET AVAILABLE PHOTOS

========================================== */

function getAvailablePhotos() {

  return usablePhotos

    .map((photo, index) => {

      if (!photo) return null;

      if (

        activeFilter !== "all" &&

        photo.category !== activeFilter

      ) {

        return null;

      }

      return index;

    })

    .filter(index => index !== null);

}

/* ==========================================

   OPEN LIGHTBOX

========================================== */

function openLightbox(index) {

  if (!lightbox || !usablePhotos[index]) return;

  previousFocus = document.activeElement;

  activeIndex = index;

  showImage();

  lightbox.classList.add("open");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  if (lightboxClose) {

    lightboxClose.focus();

  }

}

/* ==========================================

   DISPLAY IMAGE

========================================== */

function showImage() {

  const photo = usablePhotos[activeIndex];

  if (!photo) return;

  lightboxImage.src = photo.src;

  lightboxImage.alt = photo.title;

  lightboxCaption.textContent = photo.title;

  /* IMAGE COUNTER */

  const available = getAvailablePhotos();

  const position = available.indexOf(activeIndex);

  if (position !== -1) {

    lightboxCaption.textContent =

      `${photo.title} · ${position + 1} of ${available.length}`;

  }

  /* BUTTON VISIBILITY */

  if (lightboxPrev) {

    lightboxPrev.style.visibility =

      available.length > 1 ? "visible" : "hidden";

  }

  if (lightboxNext) {

    lightboxNext.style.visibility =

      available.length > 1 ? "visible" : "hidden";

  }

}

/* ==========================================

   PREVIOUS / NEXT IMAGE

========================================== */

function moveImage(direction) {

  const available = getAvailablePhotos();

  if (!available.length) return;

  let position = available.indexOf(activeIndex);

  if (position === -1) {

    position = 0;

  } else {

    position =

      (position + direction + available.length) %

      available.length;

  }

  activeIndex = available[position];

  showImage();

}

/* ==========================================

   CLOSE LIGHTBOX

========================================== */

function closeLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove("open");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  lightboxImage.removeAttribute("src");

  activeIndex = -1;

  if (

    previousFocus &&

    typeof previousFocus.focus === "function"

  ) {

    previousFocus.focus();

  }

}

/* BUTTON EVENTS */

if (lightboxClose) {

  lightboxClose.addEventListener("click", closeLightbox);

}

if (lightboxPrev) {

  lightboxPrev.addEventListener("click", () => {

    moveImage(-1);

  });

}

if (lightboxNext) {

  lightboxNext.addEventListener("click", () => {

    moveImage(1);

  });

}

/* ==========================================

   CLICK OUTSIDE TO CLOSE

========================================== */

if (lightbox) {

  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

      closeLightbox();

    }

  });

}

/* ==========================================

   KEYBOARD CONTROLS

========================================== */

document.addEventListener("keydown", event => {

  if (!lightbox || !lightbox.classList.contains("open")) {

    return;

  }

  if (event.key === "Escape") {

    closeLightbox();

  }

  if (event.key === "ArrowLeft") {

    event.preventDefault();

    moveImage(-1);

  }

  if (event.key === "ArrowRight") {

    event.preventDefault();

    moveImage(1);

  }

});

/* ==========================================

   MOBILE SWIPE SUPPORT

========================================== */

if (lightbox) {

  lightbox.addEventListener("touchstart", event => {

    touchStartX = event.changedTouches[0].screenX;

    touchStartY = event.changedTouches[0].screenY;

  }, { passive: true });

  lightbox.addEventListener("touchend", event => {

    const touchEndX = event.changedTouches[0].screenX;

    const touchEndY = event.changedTouches[0].screenY;

    const differenceX = touchEndX - touchStartX;

    const differenceY = touchEndY - touchStartY;

    // Ignore vertical swipes

    if (Math.abs(differenceY) > Math.abs(differenceX)) {

      return;

    }

    if (Math.abs(differenceX) < 60) return;

    if (differenceX < 0) {

      moveImage(1);

    } else {

      moveImage(-1);

    }

  }, { passive: true });

}

/* ==========================================

   COPYRIGHT YEAR

========================================== */

const year = document.getElementById("year");

if (year) {

  year.textContent = new Date().getFullYear();

}