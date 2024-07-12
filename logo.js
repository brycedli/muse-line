document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function () {
        rotateSVG();
    })
    document.getElementById('logo-mobile').addEventListener('click', function () {
        console.log('clicked');
        if (document.getElementById('dropdown').className == "hidden") {
            document.getElementById('dropdown').className = "";
        }else{
            document.getElementById('dropdown').className = "hidden";
        }
    })

    function addScrollEventListener(buttonId, targetId) {
        document.getElementById(buttonId).addEventListener('click', function () {
            // document.getElementById('dropdown').className += "hidden";
            console.log(`clicked ${buttonId}`);

            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const buttons = [
        { buttonId: 'product-btn', targetId: 'scroll-product', className: 'mobile blue', label: 'Product' },
        { buttonId: 'story-btn', targetId: 'scroll-story', className: 'mobile green', label: 'Story' },
        { buttonId: 'waitlist-btn', targetId: 'scroll-waitlist', className: 'mobile pink', label: 'Waitlist' },
    ];

    buttons.forEach(({ buttonId, targetId }) => {
        addScrollEventListener(buttonId, targetId);
        addScrollEventListener(buttonId+'-mobile', targetId);
    });

    // buttons.forEach(({ buttonId, targetId }) => {
    //     document.getElementById(buttonId+'-mobile').addEventListener('click', function () {
    //         document.getElementById('dropdown').className = "hidden";
    //     })});

        const changeElement = document.getElementById('logo-mobile');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetButton = buttons.find(button => button.targetId === entry.target.id);
                if (targetButton) {
                    changeElement.className = targetButton.className;
                    var p = changeElement.getElementsByTagName('p')[0]
                   p.innerHTML = targetButton.label;
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0 // Adjust the threshold as needed
    });

    buttons.forEach(({ targetId }) => {
        observer.observe(document.getElementById(targetId));
    });

    // Top of page observer
    const topObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                changeElement.className = 'mobile default';
            }
        });
    }, {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0 // Adjust the threshold as needed
    });

    topObserver.observe(document.getElementById('scroll-top'));


    // const checkPosition = () => {
    //     let found = false;
    //     buttons.forEach(({ targetId, className }) => {
    //         const target = document.getElementById(targetId);
    //         const rect = target.getBoundingClientRect();
    //         if (rect.top >= 0 && rect.top <= 1) { // Check if the target is at the top
    //             changeElement.className = className;
    //             console.log(changeElement.className)
    //             found = true;
    //         }
    //     });

    //     if (!found) {
    //         const topRect = document.getElementById('hero').getBoundingClientRect();
    //         if (topRect.top >= 0 && topRect.bottom <= window.innerHeight) {
    //             changeElement.className = 'mobile default';
    //             console.log(changeElement.className)
    //         }
    //     }
    // };

    // window.addEventListener('scroll', checkPosition);

    // checkPosition(); // Initial check

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
        var divs = document.querySelectorAll('div#logo');
        var svgContainer = Array.from(divs).find(div => window.getComputedStyle(div).display !== 'none');

        // const svgContainer = document.getElementById('logo');
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
