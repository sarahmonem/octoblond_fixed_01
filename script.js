const cards = document.querySelectorAll('.card');
let positions = ['position-1', 'position-2', 'position-3', 'position-4', 'position-5'];
let currentPosition = 0;
const star = document.querySelector('.star');
let rotation = 0;
let isTransitioning = false;

function updateCarousel(preClassName) {
cards.forEach((card, index) => {
    const newPosition = (index + currentPosition) % cards.length;

    if (newPosition < 5) {
        card.className = preClassName+" "+ positions[newPosition];
        card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Smooth easing
        //card.classList.remove('hidden');
    } else {
        card.className = preClassName;
    }
});
}

function moveRight() {
if (isTransitioning) return;
isTransitioning = true;

//const leftmostCard = cards[currentPosition % cards.length];
//leftmostCard.style.transition = 'none';
//leftmostCard.className = 'card ' + positions[4]; // Rightmost position

// Re-enable transition with smooth timing
//leftmostCard.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; 

currentPosition = (currentPosition + 1) % cards.length;

// Star rotation effect
rotation += 45;
star.style.transform = `rotate(${rotation}deg)`;
cards.forEach((card, index) => {
   card.classList.remove('card2');
});
setTimeout(() => {
    isTransitioning = false;
	updateCarousel("card");
}, 200); // Adjusted to match new timing
}

function moveLeft() {
if (isTransitioning) return;
isTransitioning = true;

//const rightmostCard = cards[(currentPosition + 4) % cards.length];
//rightmostCard.style.transition = 'none';
//rightmostCard.className = 'card ' + positions[0]; // Leftmost position

// Re-enable transition with smooth timing
//rightmostCard.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; 

currentPosition = (currentPosition - 1 + cards.length) % cards.length;

// Star rotation effect
rotation -= 45;
star.style.transform = `rotate(${rotation}deg)`;

cards.forEach((card, index) => {
	
   card.classList.add('card2');
});


setTimeout(() => {
    isTransitioning = false;
	updateCarousel("card card2");

}, 200); // Adjusted to match new timing
}

// Initialize event listeners for arrows
document.querySelector('.right-arrow').addEventListener('click', moveRight);
document.querySelector('.left-arrow').addEventListener('click', moveLeft);

// Initialize the carousel
updateCarousel("card");

// Swipe functionality
let isDragging = false;
let startX, scrollLeft;

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mousedown', (e) => {
isDragging = true;
startX = e.pageX;
scrollLeft = currentPosition; // Keep track of current position
document.body.style.cursor = 'grabbing';
});

carouselContainer.addEventListener('mousemove', (e) => {
if (!isDragging) return;
const x = e.pageX - startX;
const swipeThreshold = 200; // Minimum swipe length to register a move

// Swipe right (negative x) or left (positive x)
if (x < -swipeThreshold) {
    moveRight();
    isDragging = false; // Prevent continuous swiping
} else if (x > swipeThreshold) {
    moveLeft();
    isDragging = false;
}
});

carouselContainer.addEventListener('mouseup', () => {
isDragging = false;
document.body.style.cursor = 'default';
});

carouselContainer.addEventListener('mouseleave', () => {
isDragging = false;
document.body.style.cursor = 'default';
});

// Change cursor to "grab" when hovering under cards
carouselContainer.addEventListener('mousemove', (e) => {
const rect = carouselContainer.getBoundingClientRect();
if (e.clientY > rect.top + rect.height / 2) {
    document.body.style.cursor = 'grab';
} else {
    document.body.style.cursor = 'default';
}
});
const loader = document.getElementById('loader');
const imagesToLoad = 100; // Number of images to load
const imageUrl = 'img/loader.svg'; // Replace with the images from your folder
const images = []; // To store the created images

function createLoaderImage() {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.classList.add('loader-image');
    img.style.left = `${Math.random() * 100}%`;
    img.style.top = `${Math.random() * 100}%`;
    img.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() + 0.5})`; // Random rotation on pop up
    loader.appendChild(img);
    images.push(img); // Store the image for later animation
}

// Load the images with a staggered effect
for (let i = 0; i < imagesToLoad; i++) {
    setTimeout(createLoaderImage, i * 50); // Stagger the image load time (faster)
}

// After all images are loaded, wait for 1 second then make them fall together
setTimeout(() => {
    images.forEach((image) => {
        image.style.animation = 'fall 0.7s ease forwards'; // Faster falling animation (0.7s)
        image.style.transform = `rotate(${Math.random() * 720}deg)`; // Random rotation during fall
    });
}, imagesToLoad * 50 + 1000); // Wait for all images to load + 1s delay

// Hide the loader and show the content after all images have fallen
const totalAnimationTime = imagesToLoad * 50 + 1700; // Total time adjusted (including fall)
setTimeout(() => {
    document.body.classList.add('loaded');
    loader.style.display = 'none';
}, totalAnimationTime); // Wait for all images to finish falling