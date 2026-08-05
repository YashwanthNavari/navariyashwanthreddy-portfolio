/**
 * Project Filter System
 * Dynamically queries .project-item so it works with GitHub-fetched cards across all 10 categories.
 */
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('projectSearch');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    // Initialize Event Listeners
    initCategoryFilters();
    initSearch();

    function initCategoryFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button visual state
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white', 'shadow-md', 'shadow-blue-500/20', 'active-filter');
                    btn.classList.add('bg-white', 'dark:bg-[#1c2333]', 'text-slate-600', 'dark:text-slate-300');
                });
                button.classList.remove('bg-white', 'dark:bg-[#1c2333]', 'text-slate-600', 'dark:text-slate-300');
                button.classList.add('bg-primary', 'text-white', 'shadow-md', 'shadow-blue-500/20', 'active-filter');

                // Update state and filter
                currentCategory = button.getAttribute('data-filter');
                filterProjects();
            });
        });
    }

    function initSearch() {
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            filterProjects();
        });
    }

    function filterProjects() {
        const categoryKeys = ['ai-ml', 'cv', 'web', 'desktop', 'data', 'iot', 'healthcare', 'systems', 'smartcity', 'devtools'];
        const sections = {};
        const sectionHasVisible = {};

        categoryKeys.forEach(key => {
            sections[key] = document.getElementById(`section-${key}`);
            sectionHasVisible[key] = false;
        });

        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const title = h3 ? h3.textContent.toLowerCase() : '';
            const desc = p ? p.textContent.toLowerCase() : '';
            const techText = Array.from(item.querySelectorAll('span')).map(s => s.textContent.toLowerCase()).join(' ');

            const fullContent = title + ' ' + desc + ' ' + techText;

            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            const matchesSearch = currentSearchTerm === '' || fullContent.includes(currentSearchTerm);

            if (matchesCategory && matchesSearch) {
                item.classList.remove('hidden');
                item.classList.add('animate-fade-in');
                if (sectionHasVisible[category] !== undefined) {
                    sectionHasVisible[category] = true;
                }
            } else {
                item.classList.add('hidden');
                item.classList.remove('animate-fade-in');
            }
        });

        // Show/hide sections based on active category & items present
        Object.entries(sections).forEach(([key, section]) => {
            if (!section) return;
            const grid = document.getElementById(`grid-${key}`);
            const hasItems = grid && grid.children.length > 0;

            if (!hasItems) {
                section.style.display = 'none';
            } else if (currentCategory === 'all') {
                section.style.display = '';
            } else {
                section.style.display = (currentCategory === key) ? '' : 'none';
            }
        });
    }

    // Expose filterProjects globally
    window.filterProjects = filterProjects;
});
