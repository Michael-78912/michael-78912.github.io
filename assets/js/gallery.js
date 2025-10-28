(() => {
    const galleryContainer = document.getElementById("gallery-container");
    const galleryImage = galleryContainer.querySelector(".gallery-image-wrapper img");
    const captionEl = galleryContainer.querySelector(".gallery-caption");
    const prevBtn = galleryContainer.querySelector(".gallery-nav.prev");
    const nextBtn = galleryContainer.querySelector(".gallery-nav.next");
    const closeBtn = galleryContainer.querySelector(".gallery-close");

    let galleryImages = [];
    let currentIndex = 0;
    const preloadedImages = {}; // cache for all images

    // Load data and preload images immediately
    fetch("/assets/data/gallery-data.csv")
        .then(res => res.text())
        .then(csv => {
            const lines = csv.trim().split("\n").slice(1);
            galleryImages = lines.map(line => {
                const [filename, date, caption] = line
                    .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                    .map(s => s.trim().replace(/^"(.*)"$/, '$1'));

                // Preload the image immediately
                const img = new Image();
                img.src = `/assets/images/gallery/${filename}`;
                preloadedImages[filename] = img;

                return { filename, date, caption };
            });

            // Show the first image
            showImage(0);
        });

    function showImage(index) {
        if (!galleryImages.length) return;

        // Wrap index correctly
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const { filename, caption, date } = galleryImages[currentIndex];

        // Set the image from the preloaded cache
        galleryImage.src = preloadedImages[filename].src;
        captionEl.textContent = `${caption}${date ? ` (${date})` : ""}`;
    }

    prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
    closeBtn.addEventListener("click", () => galleryContainer.classList.remove("active"));
})();
