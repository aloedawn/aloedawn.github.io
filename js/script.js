const name = "YUT4RI";
const description = "Hanyang University (2020.3 ~) | Interested in Graphics & AI";
const twitterUrl = "https://x.com/yutari01";
const githubUrl = "https://github.com/yutari01";
const blogUrl = "https://blog.yutari.io";
const faviconUrl = "https://minotar.net/helm/68cf9063aa854545b0c0e922eeb28fef/512.png";

// DOM Elements
const nameElement = document.getElementById("name");
const descriptionElement = document.getElementById("description");
const twitterLink = document.getElementById("twitter");
const githubLink = document.getElementById("github");
const blogLink = document.getElementById("blog");
const themeToggle = document.getElementById('checkbox');
const bodyElement = document.body;
const themeIcon = document.getElementById('theme-icon'); // 아이콘 요소 가져오기

// Set initial content
nameElement.innerText = `Hello, I'm ${name}`;
descriptionElement.innerText = description;
twitterLink.href = twitterUrl;
githubLink.href = githubUrl;
blogLink.href = blogUrl;

// Set favicon
let link = document.createElement('link');
link.rel = 'icon';
link.href = faviconUrl;
document.head.appendChild(link);

// --- Dark Mode Logic ---

// Function to apply the theme and update the icon
function applyTheme(isDarkMode) {
    if (isDarkMode) {
        bodyElement.classList.add('dark-mode');
        themeToggle.checked = true; // Update toggle state
        themeIcon.classList.remove('fa-sun'); // 해 아이콘 제거
        themeIcon.classList.add('fa-moon');   // 달 아이콘 추가
    } else {
        bodyElement.classList.remove('dark-mode');
        themeToggle.checked = false; // Update toggle state
        themeIcon.classList.remove('fa-moon'); // 달 아이콘 제거
        themeIcon.classList.add('fa-sun');    // 해 아이콘 추가
    }
}

// Check localStorage for saved theme preference
const savedTheme = localStorage.getItem('theme');
// Check system preference if no saved theme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Determine initial theme
let isDarkMode = false;
if (savedTheme === 'dark') {
    isDarkMode = true;
} else if (savedTheme === 'light') {
    isDarkMode = false;
} else {
    // If no saved theme, use system preference
    isDarkMode = prefersDarkScheme.matches;
}

// Apply the initial theme and set the initial icon
applyTheme(isDarkMode);

// Event listener for the toggle switch
themeToggle.addEventListener('change', () => {
    const isChecked = themeToggle.checked;
    applyTheme(isChecked);
    // Save the preference to localStorage
    localStorage.setItem('theme', isChecked ? 'dark' : 'light');
});

// Listen for changes in system preference (optional but good practice)
prefersDarkScheme.addEventListener('change', (e) => {
    // Only change theme if no user preference is saved
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
    }
});