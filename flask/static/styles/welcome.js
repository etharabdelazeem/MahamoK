const translations = {
      en: {
            select : "* Please select your preferred language:",
            title : "Welcome to MahamoK",
            pargr : "A simple todo-list management web-application",
	        ComeIn : "Come In :D"
      },
      ar: {
            select : ":من فضلك اختر اللغة المناسبة *",
            title : "!مرحباً بك في مهامُك",
            pargr : "تطبيق بسيط يتيح لك إدارة مهامِك",
	        ComeIn : "تفضّل بالدخُول :D"
      }
};

const languageSelectop = document.querySelector("select");

languageSelectop.addEventListener("change", (event) =>{
      setLanguage(event.target.value);
});

const setLanguage = (language) => {
    document.cookie = `language=${language};path=/`;
    applyTranslations(language);
};

const applyTranslations = (language) => {
    document.querySelector('#title').textContent = translations[language].title;
    document.querySelector('#par').textContent = translations[language].pargr;
    document.querySelector('h3').textContent = translations[language].select;
    document.querySelector('#ComeIn').textContent = translations[language].ComeIn;
};

// Function to get the value of a cookie by name
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Apply the language from the cookie on page load
document.addEventListener("DOMContentLoaded", () => {
    const language = getCookie('language') || 'en';
    languageSelector.value = language;
    applyTranslations(language);
});
