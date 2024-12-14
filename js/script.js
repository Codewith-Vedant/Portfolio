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

function sendEmail(event) {
  event.preventDefault(); // Prevents the form from reloading the page
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Construct the mailto URL
  const mailtoLink = `mailto:vedant.pillai@somaiya.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;
  
  // Open the mail client
  window.location.href = mailtoLink;
  
  // Optionally, display a message to the user
  alert('Your email client will open to send the message.');
}