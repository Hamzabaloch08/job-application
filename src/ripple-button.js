document.querySelectorAll('.ripple-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create the ripple element
    const ripple = document.createElement('span');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Append the ripple to the button
    this.appendChild(ripple);

    // Remove the ripple after animation ends
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
});