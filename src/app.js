// Toggle the left slide navigation
const toggleNav = () => {
    const nav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('overlay');
  
    // Toggle the open class for the nav and the hidden class for the overlay
    nav.classList.toggle('open');
    overlay.classList.toggle('hidden');
  };
  
  // Close the navigation when clicking on the overlay
  const closeNav = () => {
    const nav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('overlay');
  
    // Remove the open class from the nav and add the hidden class to the overlay
    nav.classList.remove('open');
    overlay.classList.add('hidden');
  };
  
  // Automatically close the navigation if the screen width exceeds 900px
  const handleResize = () => {
    const nav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('overlay');
  
    if (window.innerWidth > 900) {
      nav.classList.remove('open'); // Close the nav
      overlay.classList.add('hidden'); // Hide the overlay
    }
  };
  
  // Add event listeners
  document.getElementById('hamburger').addEventListener('click', toggleNav);
  document.getElementById('overlay').addEventListener('click', closeNav);
  window.addEventListener('resize', handleResize);
  