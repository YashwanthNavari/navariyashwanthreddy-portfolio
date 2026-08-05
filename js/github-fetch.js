document.addEventListener('DOMContentLoaded', async () => {
    const categoryKeys = ['ai-ml', 'cv', 'web', 'desktop', 'data', 'iot', 'healthcare', 'systems', 'smartcity', 'devtools'];
    const grids = {};
    categoryKeys.forEach(key => {
        grids[key] = document.getElementById(`grid-${key}`);
    });

    const githubUsername = 'YashwanthNavari';
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch from GitHub API');
        
        const repos = await response.json();
        
        // Filter out forks and profile README
        const filteredRepos = repos.filter(repo => {
            const repoName = repo.name.toLowerCase();
            return !repo.fork && repo.name !== githubUsername && repoName !== 'sandbox' && repoName !== 'sand-box';
        });

        // Category mapper function returning array of matching categories
        const getCategories = (repo) => {
            const text = (repo.name + ' ' + (repo.description || '')).toLowerCase();
            const lang = (repo.language || '').toLowerCase();
            const cats = [];

            // 1. AI & Machine Learning
            if (text.includes('ml') || text.includes('ai') || text.includes('predict') || text.includes('detect') || text.includes('neuro') || text.includes('cluster') || text.includes('agrisathi') || text.includes('cricbuzz') || text.includes('heart') || text.includes('stroke') || text.includes('age') || text.includes('gender')) {
                cats.push('ai-ml');
            }

            // 2. Computer Vision
            if (text.includes('detect') || text.includes('vision') || text.includes('age') || text.includes('gender') || text.includes('image') || text.includes('object') || text.includes('neurovision')) {
                cats.push('cv');
            }

            // 3. Web Applications
            if (text.includes('web') || text.includes('developerzip') || text.includes('organ') || text.includes('nayepankh') || text.includes('volunteer') || text.includes('internship') || text.includes('parking') || text.includes('smartpark') || text.includes('attendance') || text.includes('portfolio') || text.includes('app') || text.includes('management') || lang.includes('html') || lang.includes('javascript') || lang.includes('typescript')) {
                cats.push('web');
            }

            // 4. Desktop Applications
            if (text.includes('developerzip') || text.includes('hospital') || text.includes('pdf') || text.includes('outing') || text.includes('desktop') || text.includes('tkinter') || text.includes('electron') || text.includes('tauri')) {
                cats.push('desktop');
            }

            // 5. Data Science & Analytics
            if (text.includes('cricbuzz') || text.includes('cluster') || text.includes('netflix') || text.includes('heart') || text.includes('stroke') || text.includes('agrisathi') || text.includes('analytic') || text.includes('dashboard') || text.includes('data')) {
                cats.push('data');
            }

            // 6. IoT & Smart Systems
            if (text.includes('iot') || text.includes('smart') || text.includes('campus') || text.includes('parking') || text.includes('smartpark') || text.includes('agrisathi') || text.includes('disk') || text.includes('scheduling') || text.includes('priority')) {
                cats.push('iot');
            }

            // 7. Healthcare & Medical Technology
            if (text.includes('organ') || text.includes('heart') || text.includes('stroke') || text.includes('hospital') || text.includes('medical') || text.includes('health') || text.includes('age') || text.includes('gender')) {
                cats.push('healthcare');
            }

            // 8. Systems Programming & OS
            if (text.includes('disk') || text.includes('scheduling') || text.includes('priority') || text.includes('developerzip') || text.includes('system') || lang.includes('c++') || lang.includes('c') || lang.includes('java')) {
                cats.push('systems');
            }

            // 9. Smart City & Automation
            if (text.includes('smartpark') || text.includes('parking') || text.includes('campus') || text.includes('agrisathi') || text.includes('automation') || text.includes('city')) {
                cats.push('smartcity');
            }

            // 10. Developer Tools
            if (text.includes('developerzip') || text.includes('portfolio') || text.includes('tool') || text.includes('packaging')) {
                cats.push('devtools');
            }

            // Fallback
            if (cats.length === 0) {
                cats.push('web');
            }

            return cats;
        };

        const counts = {};
        categoryKeys.forEach(k => counts[k] = 0);

        // Clear grids
        Object.values(grids).forEach(grid => {
            if (grid) grid.innerHTML = '';
        });

        const themeConfig = {
            'ai-ml': { bgGlow: 'from-violet-500', badgeBg: 'bg-violet-500', lightBadge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400', label: 'AI & ML' },
            'cv': { bgGlow: 'from-purple-500', badgeBg: 'bg-purple-500', lightBadge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', label: 'VISION' },
            'web': { bgGlow: 'from-rose-500', badgeBg: 'bg-rose-500', lightBadge: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400', label: 'WEB' },
            'desktop': { bgGlow: 'from-orange-500', badgeBg: 'bg-orange-500', lightBadge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', label: 'DESKTOP' },
            'data': { bgGlow: 'from-amber-500', badgeBg: 'bg-amber-500', lightBadge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', label: 'DATA' },
            'iot': { bgGlow: 'from-emerald-500', badgeBg: 'bg-emerald-500', lightBadge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', label: 'IOT' },
            'healthcare': { bgGlow: 'from-red-500', badgeBg: 'bg-red-500', lightBadge: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', label: 'HEALTHCARE' },
            'systems': { bgGlow: 'from-blue-500', badgeBg: 'bg-blue-500', lightBadge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', label: 'SYSTEMS' },
            'smartcity': { bgGlow: 'from-sky-500', badgeBg: 'bg-sky-500', lightBadge: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', label: 'SMART CITY' },
            'devtools': { bgGlow: 'from-indigo-500', badgeBg: 'bg-indigo-500', lightBadge: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400', label: 'DEV TOOLS' }
        };

        const fallbackImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';

        filteredRepos.forEach(repo => {
            const repoCategories = getCategories(repo);

            repoCategories.forEach(category => {
                counts[category]++;
                const cfg = themeConfig[category] || themeConfig['web'];

                const cardHTML = `
                    <div class="block relative w-full h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-[#30363d] p-5 flex flex-col justify-between cursor-pointer">
                        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${cfg.bgGlow} opacity-40 blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
                        
                        <div class="relative z-10 flex justify-between items-start pointer-events-none">
                            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.badgeBg} text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                                <span class="w-1.5 h-1.5 rounded-full bg-white animate-[pulse_2s_ease-in-out_infinite]"></span> ${cfg.label}
                            </div>
                            <div class="inline-flex items-center px-2 py-0.5 rounded bg-slate-600/80 text-white font-bold text-[10px] shadow-sm backdrop-blur">
                                ${repo.language || 'Code'}
                            </div>
                        </div>
                        
                        <div class="absolute right-5 inset-y-0 flex items-center z-10 pointer-events-none">
                            <div class="w-16 h-16 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden shadow-lg transform translate-y-2 opacity-90 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                                <img src="${repo.owner.avatar_url}" class="w-full h-full object-cover" alt="Profile">
                            </div>
                        </div>

                        <div class="relative z-10 flex flex-col mt-auto w-[80%] drop-shadow-md pointer-events-none">
                            <h4 class="text-sm text-slate-800 dark:text-slate-400 font-medium mb-0.5 opacity-80">${githubUsername} /</h4>
                            <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                ${repo.name}
                            </h3>
                            <p class="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-1 font-medium">${repo.description || 'No description provided.'}</p>
                        </div>
                        
                        <div class="relative z-10 flex items-center gap-4 mt-3 text-slate-700 dark:text-slate-400 pb-1 pointer-events-none">
                            <div class="flex items-center gap-1.5 opacity-80">
                                <span class="material-symbols-outlined text-[14px]">star</span>
                                <span class="text-xs font-bold">${repo.stargazers_count}</span>
                            </div>
                            <div class="flex items-center gap-1.5 opacity-80">
                                <span class="material-symbols-outlined text-[14px]">fork_right</span>
                                <span class="text-xs font-bold">${repo.forks_count}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-5 flex flex-col flex-grow relative bg-white dark:bg-[#0d1117]">
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-2">
                            ${repo.description || 'Click to view more details about this project in the repository viewer.'}
                        </p>
                        
                        <div class="flex justify-between items-center mt-auto">
                            <div class="flex items-center gap-2">
                                <span class="px-2.5 py-1 ${cfg.lightBadge} font-bold text-[11px] uppercase rounded-full shadow-sm">
                                    ${cfg.label}
                                </span>
                            </div>
                            <button class="card-btn flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary transition-colors group/btn">
                                View Details 
                                <span class="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                `;

                const wrapper = document.createElement('div');
                wrapper.className = 'project-card-gh project-item cursor-pointer bg-white dark:bg-[#0d1117] rounded-xl overflow-hidden border border-slate-200 dark:border-[#30363d] shadow-sm hover:shadow-xl transition-all duration-300 w-full flex flex-col group block animate-fade-in';
                wrapper.setAttribute('data-category', category);
                wrapper.setAttribute('data-repo', repo.name);
                wrapper.setAttribute('data-image', fallbackImage);
                wrapper.innerHTML = cardHTML;
                
                const targetGrid = grids[category];
                if (targetGrid) {
                    targetGrid.appendChild(wrapper);
                }
            });
        });

        // Update counts in filter buttons
        const totalUnique = filteredRepos.length;
        const btnAll = document.querySelector('[data-filter="all"]');
        if (btnAll) btnAll.textContent = `✦ All Projects (${totalUnique})`;

        const buttonLabels = {
            'ai-ml': '🤖 AI & ML',
            'cv': '👁 Computer Vision',
            'web': '🌐 Web Apps',
            'desktop': '💻 Desktop',
            'data': '📊 Data Science',
            'iot': '📡 IoT & Smart Systems',
            'healthcare': '🏥 Healthcare',
            'systems': '⚙️ Systems',
            'smartcity': '🚗 Smart City',
            'devtools': '🛠 Dev Tools'
        };

        categoryKeys.forEach(k => {
            const btn = document.querySelector(`[data-filter="${k}"]`);
            if (btn) btn.textContent = `${buttonLabels[k]} (${counts[k]})`;

            // Update section count badge
            const grid = document.getElementById(`grid-${k}`);
            if (grid && grid.previousElementSibling) {
                const span = grid.previousElementSibling.querySelector('span');
                if (span) {
                    span.textContent = `${counts[k]} Project${counts[k] !== 1 ? 's' : ''}`;
                }
            }
        });

        // Update hero description
        const heroDesc = document.querySelector('section p.text-slate-500');
        if (heroDesc) {
            heroDesc.textContent = `A collection of ${totalUnique} projects spanning AI, Computer Vision, Web, Systems, Data Science, and IoT — built to solve real-world problems.`;
        }

        // Trigger filter system
        if (typeof window.filterProjects === 'function') {
            setTimeout(window.filterProjects, 50);
        }

    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
    }
});
