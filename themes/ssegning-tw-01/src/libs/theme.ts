import themeToggle from '../templates/theme-toggle.html';

const mainThemes: MainTheme[] = ["vymalo-light", "vymalo-dark"];
const dataKey = "ssegning-tw-01-theme";

export function loadTheme(theme = normalizeTheme(localStorage.getItem(dataKey))) {
    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

export function setTheme(theme: MainTheme = 'vymalo-dark') {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(dataKey, theme);
}

function normalizeTheme(theme: string | null | undefined) {
    return mainThemes.includes(theme as MainTheme) ? theme as MainTheme : 'vymalo-dark';
}

function addThemeToggle() {
    const headerWrapper = document.querySelector<HTMLDivElement>('#kc-header-wrapper');
    if (!headerWrapper) return;
    headerWrapper.insertAdjacentHTML('afterbegin', themeToggle);
}

window.addEventListener('load', async () => {
    loadTheme();
    addThemeToggle();
    window.setTheme = setTheme;
    console.log('Theme loaded');
});