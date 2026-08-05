/**
 * Live GitHub Activity & Tech Stack Breakdown Widget Controller
 * Fetches real-time stats from YashwanthNavari on GitHub API and renders interactive analytics.
 * Features: animated counters, multi-segment language bar, live repo cards, profile sync.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('github-activity-widget');
    if (!container) return;

    const username = 'YashwanthNavari';
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('GitHub API error');
        const repos = await response.json();

        const filteredRepos = repos.filter(r => !r.fork && r.name !== username);

        // --- Stats Aggregation ---
        const langCounts = {};
        let totalStars = 0;
        let totalForks = 0;

        filteredRepos.forEach(repo => {
            totalStars += repo.stargazers_count || 0;
            totalForks += repo.forks_count || 0;
            const lang = repo.language || 'Other';
            langCounts[lang] = (langCounts[lang] || 0) + 1;
        });

        // Sort languages by frequency
        const totalLangsCount = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const langStats = Object.entries(langCounts)
            .map(([lang, count]) => ({
                lang,
                count,
                percentage: Math.round((count / totalLangsCount) * 100)
            }))
            .sort((a, b) => b.count - a.count);

        const langColors = {
            'Python':          { bg: 'bg-yellow-400',  hex: '#f1e05a' },
            'TypeScript':      { bg: 'bg-blue-500',    hex: '#3178c6' },
            'JavaScript':      { bg: 'bg-yellow-300',  hex: '#f7df1e' },
            'HTML':            { bg: 'bg-orange-500',  hex: '#e34c26' },
            'CSS':             { bg: 'bg-purple-500',  hex: '#563d7c' },
            'C++':             { bg: 'bg-pink-500',    hex: '#f34b7d' },
            'C':               { bg: 'bg-slate-500',   hex: '#555555' },
            'Java':            { bg: 'bg-red-500',     hex: '#b07219' },
            'Jupyter Notebook':{ bg: 'bg-amber-500',   hex: '#da5b0b' },
            'Shell':           { bg: 'bg-emerald-500', hex: '#89e051' },
            'Other':           { bg: 'bg-slate-400',   hex: '#808080' },
        };

        const formatDate = (iso) =>
            new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        // --- Build Widget HTML ---
        container.innerHTML = `
            <div class="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#30363d] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_24px_60px_rgba(37,99,235,0.15)]">

                <!-- Ambient background glow -->
                <div class="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-700"></div>
                <div class="absolute -left-24 -top-24 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <!-- Header Row: Profile + Stats -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-slate-100 dark:border-[#21262d] mb-6">
                    
                    <!-- Profile -->
                    <div class="flex items-center gap-4">
                        <div class="relative">
                            <img src="https://github.com/${username}.png" alt="${username}"
                                class="w-14 h-14 rounded-2xl border-2 border-primary/50 shadow-lg object-cover">
                            <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#0d1117] rounded-full shadow-sm"></span>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-0.5">
                                <h3 class="text-lg font-black text-slate-900 dark:text-white tracking-tight">Navari Yashwanth Reddy</h3>
                                <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[9px] uppercase tracking-wider border border-emerald-500/20 animate-pulse">● LIVE</span>
                            </div>
                            <a href="https://github.com/${username}" target="_blank"
                                class="text-xs font-mono text-primary hover:underline flex items-center gap-1">
                                github.com/${username}
                                <span class="material-symbols-outlined text-[12px]">open_in_new</span>
                            </a>
                        </div>
                    </div>

                    <!-- Metrics Row -->
                    <div class="grid grid-cols-3 gap-3 w-full sm:w-auto">
                        <div class="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] shadow-sm">
                            <span class="text-xl font-black text-slate-900 dark:text-white leading-none counter" data-target="${filteredRepos.length}">0</span>
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Repos</span>
                        </div>
                        <div class="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] shadow-sm">
                            <span class="text-xl font-black text-amber-500 leading-none counter" data-target="${totalStars}">0</span>
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Stars ⭐</span>
                        </div>
                        <div class="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] shadow-sm">
                            <span class="text-xl font-black text-blue-500 leading-none counter" data-target="${totalForks}">0</span>
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Forks 🍴</span>
                        </div>
                    </div>
                </div>

                <!-- Language Distribution Bar -->
                <div class="mb-8">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-sm text-primary">code</span>
                            Tech Stack Distribution
                        </h4>
                        <span class="text-xs font-mono text-slate-400">${langStats.length} languages detected</span>
                    </div>

                    <!-- Segmented bar -->
                    <div class="w-full h-4 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex shadow-inner mb-4 gap-0.5">
                        ${langStats.map(item => {
                            const cfg = langColors[item.lang] || langColors['Other'];
                            return `<div class="${cfg.bg} h-full transition-all duration-700 rounded-full" style="width:0%" data-width="${item.percentage}%" title="${item.lang}: ${item.percentage}%"></div>`;
                        }).join('')}
                    </div>

                    <!-- Language Legend -->
                    <div class="flex flex-wrap gap-x-5 gap-y-2.5">
                        ${langStats.map(item => {
                            const cfg = langColors[item.lang] || langColors['Other'];
                            return `
                                <div class="flex items-center gap-1.5 text-xs group/lang cursor-default">
                                    <span class="w-2.5 h-2.5 rounded-full ${cfg.bg} shadow-sm"></span>
                                    <span class="font-semibold text-slate-700 dark:text-slate-300 group-hover/lang:text-primary transition-colors">${item.lang}</span>
                                    <span class="text-slate-400 font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">${item.percentage}%</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Most Recent Repositories -->
                <div>
                    <h4 class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-emerald-500">update</span>
                        Recently Updated Repositories
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${filteredRepos.slice(0, 6).map(r => {
                            const cfg = langColors[r.language] || langColors['Other'];
                            return `
                                <a href="${r.html_url}" target="_blank"
                                    class="group/repo flex flex-col gap-2 p-4 rounded-xl bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                    
                                    <div class="flex justify-between items-start gap-2">
                                        <h5 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover/repo:text-primary transition-colors leading-snug">
                                            ${r.name.replace(/-/g, ' ')}
                                        </h5>
                                        ${r.language ? `<span class="flex items-center gap-1 shrink-0 text-[10px] font-bold text-slate-500">
                                            <span class="w-2 h-2 rounded-full ${cfg.bg}"></span>
                                            ${r.language}
                                        </span>` : ''}
                                    </div>

                                    <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug flex-grow">
                                        ${r.description || 'No description provided.'}
                                    </p>

                                    <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200 dark:border-slate-800 mt-1">
                                        <div class="flex items-center gap-3">
                                            <span title="Stars">⭐ ${r.stargazers_count}</span>
                                            <span title="Forks">🍴 ${r.forks_count}</span>
                                        </div>
                                        <span class="opacity-70">${formatDate(r.updated_at)}</span>
                                    </div>
                                </a>
                            `;
                        }).join('')}
                    </div>

                    <!-- View All Link -->
                    <div class="mt-5 flex justify-center">
                        <a href="https://github.com/${username}?tab=repositories" target="_blank"
                            class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group/all">
                            View all ${filteredRepos.length} repositories on GitHub
                            <span class="material-symbols-outlined text-[16px] group-hover/all:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // --- Animated Number Counters ---
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target) || target === 0) { el.textContent = '0'; return; }
            const duration = 1200;
            const steps = 50;
            const increment = target / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, duration / steps);
        };

        setTimeout(() => {
            container.querySelectorAll('.counter').forEach(animateCounter);
        }, 200);

        // --- Animated Language Bar (staggered fill) ---
        setTimeout(() => {
            container.querySelectorAll('[data-width]').forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.getAttribute('data-width');
                }, i * 80);
            });
        }, 300);

    } catch (err) {
        console.error('GitHub Activity Widget error:', err);
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                <span class="material-symbols-outlined text-4xl">cloud_off</span>
                <p class="font-bold text-sm">Could not load GitHub stats. Please try again later.</p>
            </div>
        `;
    }
});
