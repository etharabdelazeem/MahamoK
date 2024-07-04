const translations = {
    en: {
        //welcome: {{ 'Welcome, ' + current_user.username + '!' if current_user.is_authenticated else 'Welcome, Our dear Guest!' }},
	    h1: "MahamoK for today:",
	    //description: "Description: {{ task.description }}",
	    //deadline: "Deadline: {{ task.deadline }}"
    },
    ar: {
        //welcome: "!مرحباً بك",
	    h1: ":مهامُك لليوم",
	    //description: {{ "تفاصيل: " + task.description }},
	    //deadline: {{ "الموعد النهائي:" + task.deadline }}
    }
};

// Function to get the value of a cookie by name
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Apply translations based on the language cookie
document.addEventListener("DOMContentLoaded", () => {
    const language = getCookie('language') || 'en';
    //document.querySelector('#welcome').textContent = translations[language].welcome;
	document.querySelector('#h1').textContent = translations[language].h1;
	//document.querySelector('#description').textContent = translations[language].description;
	//document.querySelector('#deadline').textContent = translations[language].deadline;
});

