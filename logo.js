document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('product-btn').addEventListener('click', function () {
    console.log('clicked product');
    document
      .getElementById('scroll-product')
      .scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'start' });
  });
  document.getElementById('story-btn').addEventListener('click', function () {
    console.log('clicked story');
    document
      .getElementById('scroll-story')
      .scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'start' });
  });
  document
    .getElementById('waitlist-btn')
    .addEventListener('click', function () {
      console.log('clicked waitlist');
      document.getElementById('scroll-waitlist').scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'start',
      });
    });

  const svgPaths = [
    'assets/logos/muse0.png',
    'assets/logos/muse1.png',
    'assets/logos/muse2.png',
    'assets/logos/muse3.png',
    'assets/logos/muse4.png',
    'assets/logos/muse5.png',
    'assets/logos/muse6.png',
    'assets/logos/muse7.png',
  ];

  let currentIndex = 0;
  const preloadedImages = [];

  // Preload images
  svgPaths.forEach((path) => {
    const img = new Image();
    img.src = path;
    preloadedImages.push(img);
  });

  function rotateSVG() {
    const svgContainer = document.getElementById('logo');
    svgContainer.innerHTML = '';
    const newImage = preloadedImages[currentIndex].cloneNode(true);
    // newImage.classList.add('bouncy');
    svgContainer.appendChild(newImage);
    currentIndex = (currentIndex + 1) % preloadedImages.length;
  }

  // Initial load
  rotateSVG();

  // Expose the function to the global scope
  window.rotateSVG = rotateSVG;

  document
    .getElementById('waitlist-send')
    .addEventListener('click', function () {
      console.log('clicked');
      const email = document.getElementById('emailInput').value;
      console.log('Email:', email);
      if (email) {
        fetch('https://muse-backend-node.fly.dev/api/submit_email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            alert('Email submitted successfully!');
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Error submitting email. Please try again.');
          });
        document.getElementById('emailInput').value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
});
