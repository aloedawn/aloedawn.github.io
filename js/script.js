const root = document.documentElement;
const themeSwitch = document.querySelector(".theme-switch");
const themeColor = document.querySelector('meta[name="theme-color"]');
const storedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function applyTheme(theme) {
    const isDark = theme === "dark";

    root.dataset.theme = theme;
    themeSwitch.setAttribute("aria-checked", String(isDark));
    themeSwitch.setAttribute("aria-label", isDark ? "라이트 모드 켜기" : "다크 모드 켜기");
    themeColor.setAttribute("content", isDark ? "#0a0a0a" : "#f2f2ef");
}

applyTheme(storedTheme ?? preferredTheme);

themeSwitch.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
});
