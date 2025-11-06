// --- Grab query params ---
const urlParams = new URLSearchParams(window.location.search);
const releaseKey = urlParams.get('release');
const trackKey = urlParams.get('track');

// What will be built into
const coverEl = document.getElementById('release-cover');
const titleEl = document.getElementById('release-title');
const buttonsContainer = document.getElementById('platform-buttons');

// Platform data
const platformsInfo = {
    spot: { display: 'Spotify', icon: '/assets/icons/spotify.svg', color: '#1DB954' },
    apple: { display: 'Apple Music', icon: '/assets/icons/apple-music.svg', color: '#FA233B' },
    tidal: { display: 'Tidal', icon: '/assets/icons/tidal.svg', color: '#000000' },
    qobuz: { display: 'Qobuz', icon: '/assets/icons/qobuz.svg', color: '#0066CC' },
    deezer: { display: 'Deezer', icon: '/assets/icons/deezer.svg', color: '#FF0000' },
    amz: { display: 'Amazon Music', icon: '/assets/icons/amazon-music.svg', color: '#00A8E1' },
    band: { display: 'Bandcamp', icon: '/assets/icons/bandcamp.svg', color: '#2D2D2D' },
    yt: { display: 'YouTube', icon: '/assets/icons/youtube.svg', color: '#FF0000' },
    ytm: { display: 'YouTube Music', icon: '/assets/icons/yt-music.svg', color: '#FF0000' }
};

// --- Fetch JSON and populate ---
fetch('/assets/data/releases-trial.json')
    .then(res => res.json())
    .then(data => {
        const releases = data.releases || data;
        const release = releases[releaseKey];

        if (!release) {
            titleEl.textContent = 'Release Not Found';
            return;
        }

        let displayData = release; // default to release-level info

        // if the target release is a part of an ep or album
        if (trackKey && release.tracks && release.tracks[trackKey]) {
            displayData = release.tracks[trackKey];
        }

        coverEl.src = displayData.cover || release.cover || '/assets/img/placeholder.jpg';
        titleEl.textContent = displayData.title || release.title || 'Untitled';
        document.title = `FUTUREVOID — ${displayData.title || release.title}`;

        // --- Update Metadata ---
        const metaDesc = document.querySelector('meta[name="description"]');
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        const ogImg = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        const twDesc = document.querySelector('meta[name="twitter:description"]');
        const twImg = document.querySelector('meta[name="twitter:image"]');

        const fullTitle = `FUTUREVOID — ${displayData.title || release.title}`;
        const description = displayData.description || release.description || 'Listen to the latest from FUTUREVOID.';
        const imageUrl = `https://futurevoid.ca${displayData.cover || release.cover || '/assets/images/fallback.jpg'}`;
        const canonicalUrl = `https://futurevoid.ca/releases/?release=${releaseKey}${trackKey ? `&track=${trackKey}` : ''}`;

        document.title = fullTitle;
        metaDesc?.setAttribute('content', description);
        ogTitle?.setAttribute('content', fullTitle);
        ogDesc?.setAttribute('content', description);
        ogImg?.setAttribute('content', imageUrl);
        ogUrl?.setAttribute('content', canonicalUrl);
        twTitle?.setAttribute('content', fullTitle);
        twDesc?.setAttribute('content', description);
        twImg?.setAttribute('content', imageUrl);

        // canonical link tag update
        let canonicalTag = document.querySelector('link[rel="canonical"]');
        if (!canonicalTag) {
            canonicalTag = document.createElement('link');
            canonicalTag.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalTag);
        }
        canonicalTag.setAttribute('href', canonicalUrl);


        const preferredOrder = [
            'spot', 'apple', 'ytm', 'amz', 'deezer', 'band', 'tidal', 'qobuz', 'yt'
        ];

        buttonsContainer.innerHTML = '';

        preferredOrder.forEach(key => {
            const url = displayData.platforms?.[key];
            const info = platformsInfo[key];
            if (!url || !info) return;


            // who needs CSS anyways?
            const btn = document.createElement('a');
            btn.classList.add('platform-btn', key);
            btn.href = url;
            btn.target = '_blank';
            btn.innerHTML = `<img src="${info.icon}" alt="${info.display}"> ${info.display}`;
            btn.style.background = `radial-gradient(circle at center, ${info.color} 30%, #220033 95%)`;
            btn.style.border = `2px solid ${info.color}`;
            btn.style.borderRadius = "9999px";
            btn.style.display = "inline-flex";
            btn.style.alignItems = "center";
            btn.style.gap = "8px";
            btn.style.padding = "10px 20px";
            btn.style.fontWeight = "600";
            btn.style.color = "#fff";
            btn.style.textShadow = `
                0 0 3px #000000,
                0 0 6px ${info.color}AA
            `;
            btn.style.textDecoration = "none";
            btn.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";

            const img = btn.querySelector("img");
            img.style.height = "20px";
            img.style.verticalAlign = "middle";
            img.style.transform = "translateY(1px)";
            img.style.filter = key === "tidal" ? "drop-shadow(0 0 2px #fff)" : "none";

            btn.addEventListener("mouseenter", () => {
                btn.style.transform = "translateY(-2px)";
                btn.style.boxShadow = `0 0 10px ${info.color}55`;
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.transform = "none";
                btn.style.boxShadow = "none";
            });

            buttonsContainer.appendChild(btn);
        });
    })
    .catch(err => {
        console.error('Error loading release:', err);
        titleEl.textContent = 'Error loading release';
    });
