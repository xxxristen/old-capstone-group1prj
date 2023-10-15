
document.addEventListener('DOMContentLoaded', function () {
  let multipleCardCarousel = document.querySelector("#carouselExampleControls");

// Check if minimum viewport width is 768px and if it matches, we'll execute all these in the bracket
if (window.matchMedia("(min-width: 768px)").matches) {
  let carousel = new bootstrap.Carousel(multipleCardCarousel, {
    interval: false, // Disable automatic sliding
    wrap: false, // Prevent wrapping at the end
  });

  // Get width of the entire carousel - first image
  let carouselWidth = document.querySelector(".carousel-inner").scrollWidth;
  // Get width of a card
  let cardWidth = document.querySelector(".carousel-item").offsetWidth;
  // Setting scrollposition to 0
  let scrollPosition = 0;
  // Listen for click event on next button and change position of scroll position
  document.querySelector("#carouselExampleControls .carousel-control-next").addEventListener("click", function () {
    // Adding a condition to check if we've reached the last card
    if (scrollPosition < carouselWidth - cardWidth * 4) {
      // On click of next button, set scroll position to current scroll position + card width
      scrollPosition += cardWidth;
      // Making the carousel scroll, use animate function to scroll to current scroll position and set duration 600ms
      document.querySelector("#carouselExampleControls .carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
    }
  });
  // Listen on click event on previous button
  document.querySelector("#carouselExampleControls .carousel-control-prev").addEventListener("click", function () {
    // Adding a condition to check if we are at the first card
    if (scrollPosition > 0) {
      // On click of next button, set scroll position to current scroll position + card width
      scrollPosition -= cardWidth;
      // Making the carousel scroll, use animate function to scroll to current scroll position and set duration 600ms
      document.querySelector("#carouselExampleControls .carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
        }
      });
    }
    // If it doesn't match condition of (min-width: 768px)
    else {
  // Adding slide class back to smaller screen
  $(multipleCardCarousel).addClass('slide');
}
});