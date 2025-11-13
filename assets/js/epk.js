// /assets/js/epk.js — single clean toggle implementation
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Helpers ---------- */
    const qs = (sel, root = document) => root.querySelector(sel);
    const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /* ---------- Collapsible sections (only for sections that opt-in with .collapsible) ---------- */
    qsa('.epk-section.collapsible').forEach(section => {
        const header = qs('.collapsible-header', section) || qs('h2', section);
        const content = qs('.collapsible-content', section);

        // If there's no content wrapper, try to build one from children (fallback)
        if (!content) {
            console.warn('No .collapsible-content found for section:', section.id);
        }

        // Ensure header exists
        if (!header) return;

        // Initial state: collapsed
        if (content) content.style.display = 'none';
        header.classList.remove('active');

        // Click handler
        header.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = header.classList.toggle('active');
            if (content) {
                content.style.display = isActive ? 'block' : 'none';
            } else {
                // fallback: toggle display for all direct children except header
                Array.from(section.children).forEach(child => {
                    if (child === header) return;
                    child.style.display = isActive ? '' : 'none';
                });
            }
        });
    });


    /* ---------- Ensure bio and music sections are expanded / visible ---------- */
    qsa('.epk-section').forEach(section => {
        if (section.classList.contains('bio') || section.classList.contains('music')) {
            // make sure contents are visible (useful if CSS/old JS hid them)
            Array.from(section.children).forEach(child => {
                child.style.display = '';
            });
        }
    });


    /* ---------- Read more (bio) ---------- */
    const expandBtn = qs('#expand-bio');
    const longBio = qs('.bio-long');

    if (expandBtn && longBio) {
        // start hidden via CSS (.bio-long { display:none; })
        longBio.style.display = longBio.classList.contains('active') ? 'block' : 'none';
        expandBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            const isActive = longBio.classList.toggle('active');
            longBio.style.display = isActive ? 'block' : 'none';
            expandBtn.textContent = isActive ? 'Read less' : 'Read more';
            // optional: scroll into view when opening
            if (isActive) longBio.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    } else {
        // safe guards: prevent errors if missing elements
        if (!expandBtn) console.warn('#expand-bio button not found');
        if (!longBio) console.warn('.bio-long element not found');
    }


    /* ---------- Gallery overlay opener ---------- */
    // There may be a visible button with id="open-gallery" used by the overlay loader.
    // We support multiple triggers: buttons with id="open-gallery" OR elements with class ".gallery-trigger".
    const openGalleryBtn = qs('#open-gallery');

    const openGallery = async (ev) => {
        if (ev) ev.preventDefault();
        const placeholder = qs('#gallery-placeholder');
        if (!placeholder) {
            console.error('gallery-placeholder element not found');
            return;
        }

        // If already loaded, just activate
        let galleryContainer = qs('#gallery-container');
        if (galleryContainer) {
            galleryContainer.classList.add('active');
            return;
        }

        try {
            const html = await fetch('/assets/embeds/gallery.html').then(r => {
                if (!r.ok) throw new Error('Gallery fetch failed: ' + r.status);
                return r.text();
            });
            placeholder.innerHTML = html;

            // attach gallery script
            const script = document.createElement('script');
            script.src = '/assets/js/gallery.js';
            script.onload = () => {
                const gc = qs('#gallery-container');
                if (gc) gc.classList.add('active');
            };
            script.onerror = (e) => console.error('Failed loading gallery.js', e);
            document.body.appendChild(script);

        } catch (err) {
            console.error('Error loading gallery overlay:', err);
        }
    };

    if (openGalleryBtn) openGalleryBtn.addEventListener('click', openGallery);

    // wire any on-page triggers (.gallery-trigger)
    qsa('.gallery-trigger').forEach(el => el.addEventListener('click', openGallery));


    /* ---------- Photo grid lightbox hookup (if gallery html already present) ---------- */
    // This is a defensive hookup in case the gallery html is already in DOM at load time.
    qsa('.photo-grid img').forEach(img => {
        img.addEventListener('click', () => {
            const lb = qs('#lightbox') || createLightbox();
            lb.querySelector('img').src = img.src;
            lb.querySelector('#lightbox-caption').textContent = img.alt || '';
            lb.style.display = 'flex';
        });
    });

    /* Creates a simple reusable lightbox. (Will only create once.) */
    function createLightbox() {
        let lb = qs('#lightbox');
        if (lb) return lb;
        lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.style.display = 'none';
        lb.style.alignItems = 'center';
        lb.style.justifyContent = 'center';
        lb.style.position = 'fixed';
        lb.style.top = '0';
        lb.style.left = '0';
        lb.style.width = '100%';
        lb.style.height = '100%';
        lb.style.background = 'rgba(0,0,0,0.9)';
        lb.style.zIndex = '10000';
        lb.style.cursor = 'pointer';
        lb.innerHTML = `<div style="position:relative; text-align:center;">
        <img style="max-width:90%; max-height:90%; border:4px solid #e11d48; border-radius:8px;">
        <p id="lightbox-caption" style="color:#fff; margin-top:0.5rem;"></p>
    </div>`;
        lb.addEventListener('click', () => {
            lb.style.display = 'none';
            lb.querySelector('img').src = '';
            lb.querySelector('#lightbox-caption').textContent = '';
        });
        document.body.appendChild(lb);
        return lb;
    }

    // create one upfront if there are .photo-grid images visible at load
    if (qsa('.photo-grid img').length) createLightbox();


    /* ---------- Smooth scroll for epk-nav anchors ---------- */
    qsa('.epk-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

}); // DOMContentLoaded
