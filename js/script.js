// Simulate Progress Bar Loading
const progressBar = document.getElementById('progress-fill');
const Bar = document.getElementById('progress-bar');
const progressOverlay = document.getElementById('progress-overlay');
const mainContent = document.getElementById('main-content');
const loadingImage = document.querySelector('.loading-image');

let progress = 0;

const simulateLoading = setInterval(() => {
if (progress < 100) {
  progress += 20; // Increment progress by 20%
  progressBar.style.width = progress + '%'; // Update progress bar width
} else {
  clearInterval(simulateLoading); // Stop loading

  // Trigger fade and scale animation
  loadingImage.style.animation = 'scale-fade 1s forwards'; // Add animation
  Bar.style.visibility = 'hidden'; // Hide progress bar

  setTimeout(() => {
    progressOverlay.style.display = 'none'; // Hide overlay completely
    mainContent.style.display = 'block'; // Show main content
    document.body.style.overflow = 'auto'; // Allow scrolling
  }, 900); // Wait for animation to complete
}
}, 300); // Interval: every 300ms

// Helper function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Select all internship elements
const internships = document.querySelectorAll('.internship');

// Add an event listener for scrolling
window.addEventListener('scroll', () => {
  internships.forEach(internship => {
    if (isInViewport(internship)) {
      // Add the visible class if in the viewport
      internship.classList.add('visible');
    } else {
      // Remove the visible class if out of the viewport
      internship.classList.remove('visible');
    }
  });
});

// Trigger the scroll event on page load to handle elements in the initial viewport
window.dispatchEvent(new Event('scroll'));

// Select the elements
// Select the elements
// Select the elements
const box = document.querySelector('.box1');
const image = document.querySelector('.img1');
const verticalLine = document.querySelector('.l1');
const horizontalLine = document.querySelector('.l2');

// Function to handle scroll-based animations
const handleScroll = () => {
  const scrollY = window.scrollY; // Current scroll position
  const windowHeight = window.innerHeight; // Height of the viewport

  // Calculate the fade-out effect based on scroll position
  const opacity = Math.max(0, 1 - scrollY / (windowHeight / 2));

  // Calculate the horizontal and vertical movements
  const translateX = Math.min(scrollY / 5, 100); // Limits the movement to 100px
  const scale = Math.max(0, opacity); // Shrinks lines proportionally to opacity

  // Apply styles dynamically for smooth animation
  box.style.opacity = opacity;
  box.style.transform = `translateX(-${translateX}px)`;

  verticalLine.style.opacity = opacity;
  verticalLine.style.transform = `scaleY(${scale})`; // Shrinks the vertical line

  horizontalLine.style.opacity = opacity;
  horizontalLine.style.transform = `scaleX(${scale})`; // Shrinks the horizontal line

  image.style.opacity = opacity;
  image.style.transform = `translateX(${translateX}px)`;
};

// Add scroll event listener with `requestAnimationFrame` for smoother performance
window.addEventListener('scroll', () => {
  requestAnimationFrame(handleScroll);
});

// Select all elements with the class 'line2'
const lines = document.querySelectorAll('.line2');
const hoverEffect = document.querySelector('.link2-container');

// Add hover event listener to the container
hoverEffect.addEventListener('mouseenter', () => {
  // Hide lines
  lines.forEach(line => line.classList.add('hidden'));
  
  // Show lines after a delay (e.g., 3 seconds)
  setTimeout(() => {
    lines.forEach(line => line.classList.remove('hidden'));
  }, 2000); // 3 seconds delay
});
