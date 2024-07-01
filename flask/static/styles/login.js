const translations = {
    en: {
            emailjs: "Email Address",
            passwordjs: "Password",
            login: "Log In",
            signup: "Sign Up",
            guest: "Log In as a Guest",
        // Add other translations as needed
    },
    ar: {
            emailjs: "عنوان البريد الإلكتروني",
            passwordjs: "كلمة السرّ",
            login: "تسجيل الدُّخول",
            signup: "إنشاء حساب",
            guest: "تسجيل الدُّخول كضيف",
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
document.addEventListener('DOMContentLoaded', () => {
	const guestLink = document.getElementById('guest');
	guestLink.addEventListener('click', (event) => {
		event.preventDefault(); // Prevent default anchor behavior
		window.location.href = guestLink.href; // Redirect manually
	});

	//for translations
	const language = getCookie('language') || 'en';
        document.querySelector('#login').textContent = translations[language].login;
	document.querySelector('#emailjs').textContent = translations[language].emailjs;
        document.querySelector('#passwordjs').textContent = translations[language].passwordjs;
        document.querySelector('#signup').textContent = translations[language].signup;
        document.querySelector('#guest').textContent = translations[language].guest;
});
