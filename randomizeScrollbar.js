// Function to randomize the order of images in the scrollbar
function randomizeScrollbar() {
  const scrollbar = document.querySelector('.pictures');
  const images = Array.from(scrollbar.querySelectorAll('.pic1'));
  
  // Randomize the order of images
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  
  // Re-append the images in the new order
  images.forEach(image => {
    scrollbar.appendChild(image);
  });
}

// Call the randomizeScrollbar function when the page loads
window.addEventListener('load', randomizeScrollbar);
