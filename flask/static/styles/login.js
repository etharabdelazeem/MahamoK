document.addEventListener('DOMContentLoaded', () => {
	const guestLink = document.getElementById('guest');
	guestLink.addEventListener('click', (event) => {
		event.preventDefault(); // Prevent default anchor behavior
		window.location.href = guestLink.href; // Redirect manually
	});
});
