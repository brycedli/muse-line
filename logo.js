document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('product-btn').addEventListener('click', function () {
        document.getElementById('scroll-product').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('story-btn').addEventListener('click', function () {
        document.getElementById('scroll-story').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('waitlist-btn').addEventListener('click', function () {
        document.getElementById('scroll-waitlist').scrollIntoView({ behavior: 'smooth' });
    });

    const svgPaths = [
        'assets/logos/muse0.svg',
        'assets/logos/muse1.svg',
        'assets/logos/muse2.svg',
        'assets/logos/muse3.svg',
        'assets/logos/muse4.svg',
        'assets/logos/muse5.svg',
        'assets/logos/muse6.svg',
        'assets/logos/muse7.svg',
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

    document.getElementById('waitlist-send').addEventListener('click', function () {
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
        } else {
            alert('Please enter a valid email address.');
        }
    });
});
