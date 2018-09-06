var link = document.querySelector(".contact-btn");
var feedback = document.querySelector(".feedback");
var close = document.querySelector(".feedback-close");
var feedback_form = document.querySelector(".feedback-form");

var feedback_login = document.querySelector("[name=feedback_login]");
var email = document.querySelector("[name=feedback_email]");
var storage = localStorage.getItem("feedback_login");


link.addEventListener("click", function (event) {
	event.preventDefault();

	feedback.classList.add("feedback-open");

	if(storage) {
		feedback_login.value = storage;

		email.focus();
	} else {
		feedback_login.focus();
	}
});

close.addEventListener("click", function (event) {
	event.preventDefault();

	feedback.classList.remove("feedback-open");
});

feedback_form.addEventListener("submit", function(event) {

	if(!feedback_login.value || !email.value) {
		event.preventDefault();
	} else {
		localStorage.setItem("feedback_login", feedback_login.value);
	}
});

window.addEventListener("keydown", function(event) {
	if(event.keyCode === 27) {
		if(feedback.classList.contains("feedback-open")) {
			feedback.classList.remove("feedback-open");
		}
	}
});
