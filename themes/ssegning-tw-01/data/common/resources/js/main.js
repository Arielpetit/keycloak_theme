"use strict";
(self["webpackChunkssegning_tw_01"] = self["webpackChunkssegning_tw_01"] || []).push([[792],{

/***/ 317:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


;// ./src/templates/theme-toggle.html
// Module
var code = `<div class="theme-toggle" id="theme-toggle" role="button" tabindex="0" aria-label="Toggle dark mode"> <div class="theme-toggle-slider"> <span class="light-icon">☀️</span> <span class="dark-icon" style="display:none">🌙</span> </div> </div> `;
// Exports
/* harmony default export */ const theme_toggle = (code);
;// ./src/libs/theme.ts

const mainThemes = ["vymalo-light", "vymalo-dark"];
const dataKey = "ssegning-tw-01-theme";
function loadTheme(theme = normalizeTheme(localStorage.getItem(dataKey))) {
    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }
}
function setTheme(theme = 'vymalo-dark') {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(dataKey, theme);
}
function normalizeTheme(theme) {
    return mainThemes.includes(theme) ? theme : 'vymalo-dark';
}
function addThemeToggle() {
    const headerWrapper = document.querySelector('#kc-header-wrapper');
    if (!headerWrapper)
        return;
    headerWrapper.insertAdjacentHTML('afterbegin', theme_toggle);
}
window.addEventListener('load', async () => {
    loadTheme();
    addThemeToggle();
    window.setTheme = setTheme;
    console.log('Theme loaded');
});

;// ./src/index.ts


// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = null;
        this.lightIcon = null;
        this.darkIcon = null;
        this.init();
    }
    static getInstance() {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }
    init() {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('dgrv-theme');
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
        else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
        }
        // Create and add theme toggle
        this.createThemeToggle();
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('dgrv-theme')) {
                document.documentElement.classList.toggle('dark', e.matches);
                this.updateToggleState();
            }
        });
    }
    createThemeToggle() {
        // Create theme toggle element
        const toggle = document.createElement('div');
        toggle.className = 'theme-toggle';
        toggle.id = 'theme-toggle';
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        const slider = document.createElement('div');
        slider.className = 'theme-toggle-slider';
        const lightIcon = document.createElement('span');
        lightIcon.className = 'light-icon';
        lightIcon.textContent = '☀️';
        const darkIcon = document.createElement('span');
        darkIcon.className = 'dark-icon';
        darkIcon.textContent = '🌙';
        darkIcon.style.display = 'none';
        slider.appendChild(lightIcon);
        slider.appendChild(darkIcon);
        toggle.appendChild(slider);
        // Add to page
        const content = document.querySelector('#kc-content');
        if (content) {
            content.appendChild(toggle);
        }
        this.themeToggle = toggle;
        this.lightIcon = lightIcon;
        this.darkIcon = darkIcon;
        // Add event listeners
        toggle.addEventListener('click', () => this.toggleTheme());
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        this.updateToggleState();
    }
    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('dgrv-theme', isDark ? 'dark' : 'light');
        this.updateToggleState();
    }
    updateToggleState() {
        const isDark = document.documentElement.classList.contains('dark');
        if (this.themeToggle) {
            this.themeToggle.classList.toggle('active', isDark);
        }
        if (this.lightIcon && this.darkIcon) {
            this.lightIcon.style.display = isDark ? 'none' : 'block';
            this.darkIcon.style.display = isDark ? 'block' : 'none';
        }
    }
}
// DGRV branding enhancements
class DGRVBranding {
    static init() {
        this.addBrandText();
        this.updatePageContent();
        this.enhanceFormLabels();
        this.removeRealmText();
    }
    static addBrandText() {
        const logo = document.querySelector('#kc-logo');
        if (logo && !document.querySelector('.brand-text')) {
            const brandText = document.createElement('div');
            brandText.className = 'brand-text';
            const brandName = document.createElement('div');
            brandName.className = 'brand-name';
            brandName.textContent = 'DGRV';
            const brandTagline = document.createElement('div');
            brandTagline.className = 'brand-tagline';
            brandTagline.textContent = 'Sustainability Assessment Tool';
            brandText.appendChild(brandName);
            brandText.appendChild(brandTagline);
            // Insert after logo
            logo.parentNode?.insertBefore(brandText, logo.nextSibling);
        }
        // Ensure DGRV logo is displayed
        this.ensureDGRVLogo();
    }
    static ensureDGRVLogo() {
        const logoContainer = document.querySelector('#kc-logo');
        if (logoContainer) {
            // Check if there's already an image
            let logoImg = logoContainer.querySelector('img');
            if (!logoImg) {
                // Create DGRV logo image
                logoImg = document.createElement('img');
                logoImg.alt = 'DGRV Logo';
                logoImg.style.width = '80px';
                logoImg.style.height = '80px';
                logoImg.style.margin = '0 auto';
                logoImg.style.display = 'block';
                logoImg.style.objectFit = 'contain';
                // Try to use dgrv.jpg first, fallback to dgrv.svg
                logoImg.src = 'img/dgrv.jpg';
                logoImg.onerror = () => {
                    if (logoImg) {
                        logoImg.src = 'img/dgrv.svg';
                    }
                };
                logoContainer.appendChild(logoImg);
            }
            else {
                // If logo exists but might be wrong, update it
                if (!logoImg.src.includes('dgrv')) {
                    logoImg.src = 'img/dgrv.jpg';
                    logoImg.onerror = () => {
                        if (logoImg) {
                            logoImg.src = 'img/dgrv.svg';
                        }
                    };
                }
            }
        }
    }
    static updatePageContent() {
        // Update page title
        const pageTitle = document.querySelector('#kc-page-title');
        if (pageTitle && pageTitle.textContent?.includes('Sign in')) {
            pageTitle.textContent = 'Welcome Back';
        }
        // Add subtitle if not present
        if (!document.querySelector('.login-subtitle')) {
            const subtitle = document.createElement('p');
            subtitle.className = 'login-subtitle';
            subtitle.textContent = 'Sign in to your DGRV Sustainability account';
            if (pageTitle) {
                pageTitle.parentNode?.insertBefore(subtitle, pageTitle.nextSibling);
            }
        }
    }
    static enhanceFormLabels() {
        // Update username label
        const usernameLabel = document.querySelector('label[for="username"]');
        if (usernameLabel) {
            usernameLabel.textContent = 'Email Address';
        }
        // Update password label
        const passwordLabel = document.querySelector('label[for="password"]');
        if (passwordLabel) {
            passwordLabel.textContent = 'Password';
        }
        // Update login button
        const loginButton = document.querySelector('input[type="submit"][value*="Sign in"], button[type="submit"]');
        if (loginButton && loginButton instanceof HTMLInputElement) {
            loginButton.value = 'Sign In';
        }
        else if (loginButton && loginButton instanceof HTMLButtonElement) {
            loginButton.textContent = 'Sign In';
        }
        // Update forgot password link
        const forgotPasswordLink = document.querySelector('a[href*="reset-credentials"]');
        if (forgotPasswordLink) {
            forgotPasswordLink.textContent = 'Forgot your password?';
        }
        // Ensure all links are properly styled
        this.styleAllLinks();
    }
    static styleAllLinks() {
        // Style all links to be blue and visible
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            if (link instanceof HTMLAnchorElement) {
                const linkText = link.textContent?.toLowerCase() || '';
                // Make "New user?" and registration links black
                if (linkText.includes('new user') ||
                    linkText.includes('register') ||
                    linkText.includes('sign up') ||
                    linkText.includes('create account')) {
                    link.style.color = '#1E293B'; // Black color
                    link.style.textDecoration = 'underline';
                    link.style.fontWeight = '600';
                }
                else {
                    // Keep other links blue
                    link.style.color = '#1E40AF';
                    link.style.textDecoration = 'underline';
                    link.style.fontWeight = '500';
                }
                // Make sure links are visible
                if (linkText.includes('forgot') ||
                    linkText.includes('register') ||
                    linkText.includes('sign up') ||
                    linkText.includes('create account') ||
                    linkText.includes('new user')) {
                    link.style.display = 'inline';
                    link.style.visibility = 'visible';
                    link.style.opacity = '1';
                }
            }
        });
        // Force update after a short delay to ensure all links are styled
        setTimeout(() => {
            this.forceUpdateLinkColors();
        }, 100);
    }
    static forceUpdateLinkColors() {
        // Force update registration links to be black
        const registrationLinks = document.querySelectorAll('a[href*="register"], a[href*="signup"]');
        registrationLinks.forEach(link => {
            if (link instanceof HTMLAnchorElement) {
                const linkText = link.textContent?.toLowerCase() || '';
                if (linkText.includes('new user') || linkText.includes('register')) {
                    link.style.color = '#1E293B';
                    link.style.fontWeight = '600';
                    link.style.textDecoration = 'underline';
                }
            }
        });
    }
    static removeRealmText() {
        // Remove any realm name or required fields text
        const elementsToRemove = [
            ...document.querySelectorAll('[id*="realm"]'),
            ...document.querySelectorAll('[class*="realm"]'),
            ...document.querySelectorAll('[class*="required"]'),
            ...document.querySelectorAll('[class*="Required"]'),
            ...document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        ];
        elementsToRemove.forEach(element => {
            const text = element.textContent?.toLowerCase() || '';
            if (text.includes('sustainability-realm') ||
                text.includes('required fields') ||
                text.includes('* required fields') ||
                text.includes('realm')) {
                element.style.display = 'none';
            }
        });
        // Also check for any text nodes that might contain these strings
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        textNodes.forEach(textNode => {
            const text = textNode.textContent?.toLowerCase() || '';
            if (text.includes('sustainability-realm') ||
                text.includes('required fields') ||
                text.includes('* required fields')) {
                if (textNode.parentElement) {
                    textNode.parentElement.style.display = 'none';
                }
            }
        });
    }
}
// Form enhancements
class FormEnhancements {
    static init() {
        this.enhanceInputFields();
        this.addLoadingStates();
        this.enhanceErrorMessages();
    }
    static enhanceInputFields() {
        // Add proper classes to form groups
        const formGroups = document.querySelectorAll('.form-group, [class*="form-group"]');
        formGroups.forEach(group => {
            group.classList.add('form-group');
        });
        // Enhance input fields
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        inputs.forEach(input => {
            if (input instanceof HTMLInputElement) {
                // Add proper placeholder if missing
                if (!input.placeholder && input.type === 'email') {
                    input.placeholder = 'Enter your email address';
                }
                else if (!input.placeholder && input.type === 'password') {
                    input.placeholder = 'Enter your password';
                }
            }
        });
    }
    static addLoadingStates() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', () => {
                const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
                if (submitButton) {
                    submitButton.classList.add('loading');
                    if (submitButton instanceof HTMLInputElement) {
                        submitButton.value = 'Signing in...';
                    }
                    else if (submitButton instanceof HTMLButtonElement) {
                        submitButton.innerHTML = '<span class="loading-spinner"></span> Signing in...';
                    }
                }
            });
        });
    }
    static enhanceErrorMessages() {
        // Enhance existing error messages
        const errorMessages = document.querySelectorAll('.error-message, .alert-error');
        errorMessages.forEach(message => {
            message.classList.add('alert', 'alert-error');
        });
    }
}
// Initialize everything when DOM is loaded
window.addEventListener("load", () => {
    // Initialize theme manager
    ThemeManager.getInstance();
    // Initialize DGRV branding
    DGRVBranding.init();
    // Initialize form enhancements
    FormEnhancements.init();
    // Legacy functionality
    const languageButton = document.querySelector("#kc-current-locale-link");
    addFeatherIconToButton(languageButton, "globe");
    replaceWrongCheckboxes();
    replaceWrongHr();
    replaceTitle();
});
window.addEventListener("load", async () => {
    await __webpack_require__.e(/* import() */ 911).then(__webpack_require__.t.bind(__webpack_require__, 911, 23)).then(({ default: feather }) => {
        feather.replace();
    });
    console.log("DGRV Theme loaded successfully");
});
// Legacy functions (keeping for compatibility)
function replaceWrongCheckboxes() {
    const wrongCheckBoxes = document.querySelectorAll("div.checkbox");
    for (const element of wrongCheckBoxes) {
        const checkBox = element.querySelector("input");
        if (!checkBox)
            continue;
        checkBox.classList.add("checkbox");
        const registerSpan = document.createElement("span");
        registerSpan.innerText = element.innerText.trim();
        registerSpan.classList.add("label-text", "ml-2");
        const label = document.createElement("label");
        label.classList.add("cursor-pointer", "label");
        label.appendChild(checkBox);
        label.appendChild(registerSpan);
        if (element.parentNode) {
            element.parentNode.replaceChild(label, element);
        }
    }
}
function replaceWrongHr() {
    const socialProviders = document.querySelector("#kc-social-providers");
    if (!socialProviders)
        return;
    const wrongHr = socialProviders.querySelectorAll("hr");
    let replacement = socialProviders.querySelector("h2");
    replacement = replacement ?? socialProviders.querySelector("h4");
    if (!replacement)
        return;
    for (const element of wrongHr) {
        const divDivider = document.createElement("div");
        divDivider.innerText = replacement.innerText.trim();
        divDivider.classList.add("divider");
        if (element.parentNode) {
            element.parentNode.removeChild(replacement);
            element.parentNode.replaceChild(divDivider, element);
        }
    }
}
function replaceTitle() {
    const title = document.querySelector("#kc-page-title");
    if (!title)
        return;
    const newTitleContent = document.createElement("span");
    newTitleContent.classList.add("bg-clip-text", "text-transparent", "bg-gradient-to-r", "from-pink-500", "to-violet-500");
    newTitleContent.innerText = title.innerText.trim();
    title.innerHTML = "";
    title.appendChild(newTitleContent);
}
function addFeatherIconToButton(element, iconStr) {
    const icon = createIcon(iconStr);
    if (!element)
        return;
    element.prepend(icon);
}
function createIcon(icon) {
    const languageIcon = document.createElement("i");
    const attr = document.createAttribute("data-feather");
    attr.value = icon;
    languageIcon.attributes.setNamedItem(attr);
    return languageIcon;
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(317));
/******/ }
]);
//# sourceMappingURL=main.js.map