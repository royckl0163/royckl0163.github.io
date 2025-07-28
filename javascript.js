let topButton = document.getElementById("topBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let slideInterval = setInterval(() => changeSlide(1), 5000);

function updateSlideIndex() {
  const indexDisplay = document.querySelector(".slide-index");
  indexDisplay.textContent = `${slideIndex + 1} / ${slides.length}`;
}

function updateDots() {
  const dotsContainer = document.querySelector(".dots-container");
  dotsContainer.innerHTML = "";
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === slideIndex ? " active" : "");
    dotsContainer.appendChild(dot);
  }
}

function showSlide(index) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[index].style.display = "block";
  updateSlideIndex();
  updateDots();
}

function changeSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  showSlide(slideIndex);
  resetTimer();
}

function resetTimer() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => changeSlide(1), 5000);
}

// Initial display
showSlide(slideIndex);

// Swipe support
let startX = 0;
let endX = 0;
const container = document.querySelector(".slideshow-container");
container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
container.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  const distance = endX - startX;
  if (Math.abs(distance) > threshold) {
    if (distance > 0) {
      changeSlide(-1); // Swipe right
    } else {
      changeSlide(1); // Swipe left
    }
  }
}

function updateDots() {
  const dotsContainer = document.querySelector(".dots-container");
  dotsContainer.innerHTML = "";
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === slideIndex ? " active" : "");
    dot.addEventListener("click", () => {
      slideIndex = i;
      showSlide(slideIndex);
      resetTimer();
    });
    dotsContainer.appendChild(dot);
  }
}
