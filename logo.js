
document.addEventListener("DOMContentLoaded", function() {
    const svgPaths = [
        'assets/logos/muse0.svg',
        'assets/logos/muse1.svg',
        'assets/logos/muse2.svg',
        'assets/logos/muse3.svg',
        'assets/logos/muse4.svg',
        'assets/logos/muse5.svg',
        'assets/logos/muse6.svg',
        'assets/logos/muse7.svg'
    ];
    

    let currentIndex = 0;
    const preloadedImages = [];

    // Preload images
    svgPaths.forEach(path => {
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
}
)
