(async function loadMusic() {
    const featuredContainer = document.getElementById('featured-release');
    const catalogueContainer = document.getElementById('catalogue');

    if (!featuredContainer || !catalogueContainer) {
        console.error('Music page containers not found.');
        return;
    }

    try {
        const res = await fetch('/assets/data/releases-trial.json');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();

        if (!data || !data.releases || !data.featuredReleaseKey) {
            console.error('Invalid JSON structure.');
            return;
        }

        const releases = data.releases;
        const featuredId = data.featuredReleaseKey;
        const featured = releases[featuredId];

        if (!featured) {
            console.error(`Featured release "${featuredId}" not found.`);
            return;
        }

        // FEATURED RELEASE 
        featuredContainer.innerHTML = `
            <div class="release-card featured" data-link="/releases?release=${featuredId}">
                <img src="${featured.cover || ''}" alt="${featured.title || 'Cover'}" class="release-cover">
                <h2>${featured.title || 'Untitled'}</h2>
                ${featured.description ? `<p class="release-description">${featured.description}</p>` : ''}
                <a href="/releases?release=${featuredId}" class="release-link">Listen / More</a>
            </div>
        `;


        let catalogueHTML = '';

        Object.entries(releases).forEach(([key, release]) => {
            if (key === featuredId) return;

            const cover = release.cover || '';
            const title = release.title || 'Untitled';
            const description = release.description ? `<p class="release-description">${release.description}</p>` : '';
            const releaseLink = `/releases?release=${key}`;

            if (release.type === 'single') {
                catalogueHTML += `
                    <div class="release-card" data-link="${releaseLink}">
                        <img src="${cover}" alt="${title} Cover" class="release-cover">
                        <h3>${title}</h3>
                        ${description}
                        <a href="${releaseLink}" class="release-link">Listen / More</a>
                    </div>
                `;
            } else if (release.type === 'ep' || release.type === 'album') {
                let trackListHTML = '';
                if (release.tracks && Object.keys(release.tracks).length > 0) {
                    trackListHTML = Object.entries(release.tracks)
                        .map(([trackId, track]) => {
                            const trackTitle = track.title || 'Untitled Track';
                            return `<li><a href="/releases?release=${key}&track=${trackId}">${trackTitle}</a></li>`;
                        })
                        .join('');
                }

                catalogueHTML += `
                    <div class="release-card ep" data-link="${releaseLink}">
                        <img src="${cover}" alt="${title} Cover" class="release-cover">
                        <h3>${title}</h3>
                        ${description}
                        ${trackListHTML ? `<button class="toggle-tracks" data-release="${key}">Show Tracks</button>` : ''}
                        <ul class="track-list" id="tracks-${key}" style="display:none;">
                            ${trackListHTML}
                        </ul>
                    </div>
                `;
            }
        });

        catalogueContainer.innerHTML = catalogueHTML;

        catalogueContainer.querySelectorAll('.toggle-tracks').forEach(btn => {
            const releaseKey = btn.dataset.release;
            const trackList = document.getElementById(`tracks-${releaseKey}`);
            if (!trackList) return;

            btn.addEventListener('click', e => {
                e.stopPropagation();
                const isVisible = trackList.style.display === 'block';
                trackList.style.display = isVisible ? 'none' : 'block';
                btn.textContent = isVisible ? 'Show Tracks' : 'Hide Tracks';
            });
        });

        // MAKE WHOLE CARD CLICKABLE (except track links/buttons)
        document.querySelectorAll('.release-card').forEach(card => {
            const releaseURL = card.dataset.link;
            if (!releaseURL) return;

            card.addEventListener('click', e => {
                // dont let redirect happen from clicking t he collapse button or tracklists
                if (e.target.closest('.track-list a') || e.target.classList.contains('toggle-tracks')) {
                    return;
                }
                window.location.href = releaseURL;
            });
        });

        console.log('Music page loaded successfully.');
    } catch (err) {
        console.error('Error loading music:', err);
    }
})();
