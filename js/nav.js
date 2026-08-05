document.addEventListener("DOMContentLoaded", () => {
    // 1. Determine the current active page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";

    // 2. Helper function to return active or inactive classes based on page name
    const getNavClass = (targetPage) => {
        if (pageName === targetPage || (pageName === "" && targetPage === "index.html")) {
            return `px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-md transition-all`;
        }
        return "px-3 py-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors";
    };

    // 3. Define the HTML for the new navigation bar
    const navHTML = `
        <div class="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 w-full pointer-events-none">
            <header class="pointer-events-auto flex items-center justify-between bg-white/70 dark:bg-[#0f172a]/70 rounded-2xl px-3 py-2 w-full max-w-[70rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl transition-all">
                
                <!-- Logo Section -->
                <div class="flex items-center gap-3 cursor-pointer pl-1 hover:opacity-80 transition-opacity shrink-0" onclick="window.location.href='index.html'">
                    <div class="relative shrink-0">
                        <img src="https://github.com/YashwanthNavari.png" alt="Yashwanth Navari" class="size-9 rounded-xl object-cover border border-slate-200 dark:border-slate-600 shadow-sm">
                        <span class="absolute -bottom-1 -right-1 size-2.5 bg-emerald-500 border-2 border-white dark:border-[#0f172a] rounded-full"></span>
                    </div>
                    <div class="flex flex-col justify-center shrink-0">
                        <span class="font-black text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 whitespace-nowrap">YASHWANTH</span>
                    </div>
                </div>

                <!-- Desktop Navigation Links -->
                <nav class="hidden lg:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                    <a href="index.html" class="${getNavClass("index.html")}">Home</a>
                    <a href="about.html" class="${getNavClass("about.html")}">About</a>
                    <a href="projects.html" class="${getNavClass("projects.html")}">Projects</a>
                    <a href="skills.html" class="${getNavClass("skills.html")}">Skills</a>
                    <a href="experience.html" class="${getNavClass("experience.html")}">Experience</a>
                    <a href="certifications.html" class="${getNavClass("certifications.html")}">Certifications</a>
                    <a href="resume.html" class="${getNavClass("resume.html")}">Resume</a>
                    <a href="blog.html" class="${getNavClass("blog.html")}">Blog</a>
                </nav>

                <!-- Action Button & Mobile Toggle -->
                <div class="flex items-center gap-3 shrink-0">
                    <a href="contact.html" class="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-cyan-500/30 hover:scale-105 transition-all whitespace-nowrap shrink-0">
                        Hire Me <span class="material-symbols-outlined text-[18px]">rocket_launch</span>
                    </a>
                    
                    <div class="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>

                    <!-- Sound Toggle -->
                    <button onclick="window.toggleAudioUI()" class="sound-toggle flex items-center justify-center p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300" aria-label="Toggle Sound FX" title="Enable Sound FX">
                        <span class="material-symbols-outlined text-lg">volume_off</span>
                    </button>

                    <!-- Theme Toggle -->
                    <button onclick="window.toggleTheme()" class="theme-toggle flex items-center justify-center p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300" aria-label="Toggle Dark Mode">
                        <span class="material-symbols-outlined text-lg">dark_mode</span>
                    </button>

                    <!-- Mobile Menu Toggle -->
                    <button id="mobile-menu-btn" class="lg:hidden text-slate-600 dark:text-slate-300 p-2 hover:text-emerald-500 transition-colors bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>
        </div>

        <!-- Mobile Navigation Menu -->
        <div id="mobile-menu" class="fixed inset-0 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl z-[90] opacity-0 invisible transition-all duration-300 flex flex-col items-center justify-center pointer-events-none">
            <div class="flex flex-col items-center gap-6 w-full px-6 pointer-events-auto">
                <a href="index.html" class="text-xl font-black ${pageName === 'index.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">Home</a>
                <a href="about.html" class="text-xl font-black ${pageName === 'about.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">About</a>
                <a href="projects.html" class="text-xl font-black ${pageName === 'projects.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">Work</a>
                <a href="skills.html" class="text-xl font-black ${pageName === 'skills.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">Skills</a>
                <a href="experience.html" class="text-xl font-black ${pageName === 'experience.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">Experience</a>
                <a href="certifications.html" class="text-xl font-black ${pageName === 'certifications.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">Certifications</a>
                <a href="resume.html" class="text-xl font-black ${pageName === 'resume.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">Resume</a>
                <a href="blog.html" class="text-xl font-black ${pageName === 'blog.html' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-800 dark:text-white'}">Blog</a>
                <a href="contact.html" class="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold mt-4 shadow-lg shadow-emerald-500/30">Let's Talk</a>
            </div>
        </div>
    `;

    // 4. Clean up existing elements
    const existingHeader = document.querySelector('header');
    if (existingHeader) existingHeader.remove();

    const existingMobileMenu = document.getElementById('mobile-menu');
    if (existingMobileMenu) existingMobileMenu.remove();

    // 5. Inject the new navigation bar into the body
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    // Add padding to body to account for fixed header
    document.body.classList.add("pt-24");

    // 6. Add event listener for new mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        let isMenuOpen = false;
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
                mobileMenu.classList.add('opacity-100', 'visible', 'pointer-events-auto');
                mobileBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
            } else {
                mobileMenu.classList.add('opacity-0', 'invisible', 'pointer-events-none');
                mobileMenu.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
                mobileBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
            }
        });
    }

    // Load audio UI micro-interaction engine if not already present
    if (!document.querySelector('script[src*="audio-ui.js"]')) {
        const audioScript = document.createElement('script');
        audioScript.src = 'js/audio-ui.js';
        document.head.appendChild(audioScript);
    }
});
