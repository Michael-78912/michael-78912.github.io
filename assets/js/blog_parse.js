(() => {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return console.error("Blog container not found.");

    fetch('/assets/data/blog.md')
        .then(res => res.text())
        .then(rawContent => {
            // Remove all HTML comments first
            let content = rawContent.replace(/<!--[\s\S]*?-->/g, '');

            // Extract all <POST> blocks
            const postRegex = /<POST\s+DATE="([^"]+)"\s+AUTHOR="([^"]+)"\s+TITLE="([^"]+)"(?:\s+LOCATION="([^"]*)")?>([\s\S]*?)<\/POST>/gi;

            const posts = [];
            let match;
            while ((match = postRegex.exec(content)) !== null) {
                const [_, date, author, title, location, postContent] = match;
                posts.push({ date, author, title, location, content: postContent.trim() });
            }

            // Sort posts by date descending
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Show first 10 posts
            const recentPosts = posts.slice(0, 10);
            recentPosts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.classList.add('blog-post');
                postEl.innerHTML = `
                    <h2>${post.title}</h2>
                    <small>${post.date}${post.author ? ` | ${post.author}` : ""}${post.location ? ` | ${post.location}` : ""}</small>
                    ${marked.parse(post.content)}
                `;
                blogContainer.appendChild(postEl);
            });

            // Older posts tree
            const olderPosts = posts.slice(10);
            if (olderPosts.length) {
                const olderContainer = document.createElement('div');
                olderContainer.id = 'older-posts';
                olderContainer.style.display = 'none';

                // Group older posts by month
                const grouped = {};
                olderPosts.forEach(p => {
                    const month = p.date.slice(0, 7); // YYYY-MM
                    if (!grouped[month]) grouped[month] = [];
                    grouped[month].push(p);
                });

                for (const month in grouped) {
                    const monthEl = document.createElement('div');
                    monthEl.classList.add('month-group');

                    const monthHeader = document.createElement('button');
                    monthHeader.textContent = month;
                    monthHeader.addEventListener('click', () => {
                        const postsEl = monthEl.querySelector('.month-posts');
                        postsEl.style.display = postsEl.style.display === 'none' ? 'block' : 'none';
                    });

                    const postsEl = document.createElement('div');
                    postsEl.classList.add('month-posts');
                    postsEl.style.display = 'none';

                    grouped[month].forEach(post => {
                        const postEl = document.createElement('div');
                        postEl.classList.add('blog-post');
                        postEl.innerHTML = `
                            <h2>${post.title}</h2>
                            <small>${post.date}${post.author ? ` | ${post.author}` : ""}${post.location ? ` | ${post.location}` : ""}</small>
                            ${marked.parse(post.content)}
                        `;
                        postsEl.appendChild(postEl);
                    });

                    monthEl.appendChild(monthHeader);
                    monthEl.appendChild(postsEl);
                    olderContainer.appendChild(monthEl);
                }

                const showOlderBtn = document.createElement('button');
                showOlderBtn.textContent = 'Show older posts';
                showOlderBtn.addEventListener('click', () => {
                    olderContainer.style.display = 'block';
                    showOlderBtn.style.display = 'none';
                });

                blogContainer.appendChild(showOlderBtn);
                blogContainer.appendChild(olderContainer);
            }
        })
        .catch(err => console.error("Error loading blog.md:", err));
})();
