const translations = {
    en: {
        welcome: "{{ 'Welcome, ' + current_user.username + '!' if current_user.is_authenticated else 'Welcome, Our dear Guest!' }}",
	    h1: "Today's MahamoK:",
	    description: "Description: {{ task.description }}",
	    deadline: "Deadline: {{ task.deadline }}",
	    h1login: "Log In",
	    emailsjs: "Email Address",
	    passwordjs: "Password",
	    login: "Log In",
	    signup: "Sign Up",
	    guest: "Log In as a Guest"
        // Add other translations as needed
    },
    ar: {
        welcome: "halaa",
	    h1: "arrr",
	    description: "arab",
	    deadline: "arabi",
            emailsjs: "a Email Address",
            passwordjs: "r Password",
            login: "a Log In",
            signup: "b Sign Up",
            guest: "i Log In as a Guest"
        // Add other translations as needed
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
    document.querySelector('#welcome').textContent = translations[language].welcome;
	document.querySelector('#h1').textContent = translations[language].h1;
	document.querySelector('#description').textContent = translations[language].description;
	document.querySelector('#deadline').textContent = translations[language].deadline;
	document.querySelector('#login').textContent = translations[language].login;
        document.querySelector('#emailjs').textContent = translations[language].emailjs;
        document.querySelector('#passwordjs').textContent = translations[language].passwordjs;
        document.querySelector('#signup').textContent = translations[language].signup;
        document.querySelector('#guest').textContent = translations[language].guest;
    // Apply other translations as needed
});

