/* function validateRegister() checks all the registration form data */
function validateRegister () {
	/* clear any old success message */
	document.getElementById("register-success").textContent = "";

	/* Rule 1, username: at least 5 characters, letters, numbers and underscores only */
	var username = document.getElementById("username").value;
	var usernameError = document.getElementById("username-error");
	var result = true;                         /* assumes no errors */
	var pattern = /^[a-zA-Z0-9_]+$/;           /* letters, numbers and underscores only */

	if (username == "") {                      /* check whether username is empty */
		usernameError.textContent = "Username cannot be empty.";
		result = false;
	} else if (username.length < 5) {          /* check the minimum length */
		usernameError.textContent = "Username must be at least 5 characters.";
		result = false;
	} else if (!username.match(pattern)) {     /* check for wrong characters */
		usernameError.textContent = "Use letters, numbers and underscores only.";
		result = false;
	} else {
		usernameError.textContent = "";        /* no error, clear the message */
	}

	/* Rule 2, email: must be in a valid format */
	var email = document.getElementById("email").value;
	var emailError = document.getElementById("email-error");

	if (email == "") {                                          /* check whether email is empty */
		emailError.textContent = "Email cannot be empty.";
		result = false;
	} else if (email.indexOf("@") == -1) {                      /* no @ symbol */
		emailError.textContent = "Email must contain an @ symbol.";
		result = false;
	} else if (email.indexOf("@") == 0) {                       /* @ is the first character */
		emailError.textContent = "Email cannot start with an @ symbol.";
		result = false;
	} else if (email.indexOf(".", email.indexOf("@")) == -1) {  /* no dot after the @ */
		emailError.textContent = "Email must have a dot after the @ symbol.";
		result = false;
	} else {
		emailError.textContent = "";
	}

	/* Rule 3, phone number: 8 to 15 digits only */
	var phone = document.getElementById("phone").value;
	var phoneError = document.getElementById("phone-error");
	var phonePattern = /^[0-9]{8,15}$/;        /* only digits, 8 to 15 of them */

	if (phone == "") {
		phoneError.textContent = "Phone number cannot be empty.";
		result = false;
	} else if (!phone.match(phonePattern)) {
		phoneError.textContent = "Phone number must be 8 to 15 digits only.";
		result = false;
	} else {
		phoneError.textContent = "";
	}

	/* Rule 4, password: 10 or more characters with uppercase, lowercase, number and special character */
	var password = document.getElementById("password").value;
	var passwordError = document.getElementById("password-error");

	if (password == "") {
		passwordError.textContent = "Password cannot be empty.";
		result = false;
	} else if (password.length < 10) {                    /* check the minimum length */
		passwordError.textContent = "Password must be at least 10 characters.";
		result = false;
	} else if (!password.match(/[A-Z]/)) {                /* needs a capital letter */
		passwordError.textContent = "Password must contain an uppercase letter.";
		result = false;
	} else if (!password.match(/[a-z]/)) {                /* needs a small letter */
		passwordError.textContent = "Password must contain a lowercase letter.";
		result = false;
	} else if (!password.match(/[0-9]/)) {                /* needs a digit */
		passwordError.textContent = "Password must contain a number.";
		result = false;
	} else if (!password.match(/[^a-zA-Z0-9]/)) {         /* needs a symbol */
		passwordError.textContent = "Password must contain a special character.";
		result = false;
	} else {
		passwordError.textContent = "";
	}

	/* Rule 5, confirm password must be the same as the password */
	var confirmPassword = document.getElementById("confirm-password").value;
	var confirmError = document.getElementById("confirm-error");

	if (confirmPassword == "") {
		confirmError.textContent = "Please confirm your password.";
		result = false;
	} else if (confirmPassword != password) {             /* the two passwords are different */
		confirmError.textContent = "Passwords do not match.";
		result = false;
	} else {
		confirmError.textContent = "";
	}

	/* Rule 6, gender: one option must be selected */
	var female = document.getElementById("gender-female").checked;
	var male = document.getElementById("gender-male").checked;
	var genderError = document.getElementById("gender-error");

	if (!female && !male) {                               /* neither button is selected */
		genderError.textContent = "Please select a gender.";
		result = false;
	} else {
		genderError.textContent = "";
	}

	/* Rule 7, dietary preferences: at least one must be selected */
	var halal = document.getElementById("diet-halal").checked;
	var vegetarian = document.getElementById("diet-vegetarian").checked;
	var none = document.getElementById("diet-none").checked;
	var dietError = document.getElementById("diet-error");

	if (!halal && !vegetarian && !none) {                 /* no box is ticked */
		dietError.textContent = "Please choose at least one dietary preference.";
		result = false;
	} else {
		dietError.textContent = "";
	}

	/* Rule 8, country/region must be chosen */
	var country = document.getElementById("country").value;
	var countryError = document.getElementById("country-error");

	if (country == "") {                                  /* the "-- Select --" option has an empty value */
		countryError.textContent = "Please select a country or region.";
		result = false;
	} else {
		countryError.textContent = "";
	}

	/* Rule 9, home or work address (one is enough) and the billing address must be filled in */
	if (!validateAllAddresses()) {
		result = false;
	}

	/* if every rule passed, show a success message and clear the form */
	if (result == true) {
		document.getElementById("register-success").textContent = "Registration successful! Welcome, " + username + ".";
		document.getElementById("register-form").reset();
		return false;                                     /* false stops the page from reloading */
	}

	return result;                                        /* false blocks the submit when there are errors */
}

/* function updateDeposit() sets the deposit amount for the chosen restaurant */
function updateDeposit () {
	var restaurant = document.getElementById("restaurant").value;   /* the value of the chosen option */
	var deposit = document.getElementById("deposit");                /* the deposit box */
	var deposits = {                                                 /* deposit for each restaurant, same as the cards */
		asiba: 10,
		gula: 10,
		pakistan: 10,
		hakshan: 20,
		leela: 10,
		jisoo: 15
	};

	if (restaurant == "") {                  /* no restaurant chosen yet */
		deposit.value = 0;
	} else {
		deposit.value = deposits[restaurant];    /* look up the amount using the restaurant's name */
	}
}

/* function showPaymentFields() shows the voucher or card section for the chosen deposit method */
function showPaymentFields () {
	var voucherChosen = document.getElementById("pay-voucher").checked;   /* true if Voucher is selected */
	var onlineChosen = document.getElementById("pay-online").checked;     /* true if Online payment is selected */
	var voucherSection = document.getElementById("voucher-section");
	var cardSection = document.getElementById("card-section");

	if (voucherChosen) {
		voucherSection.style.display = "block";    /* show the voucher box */
		cardSection.style.display = "none";        /* hide the card fields */
	} else if (onlineChosen) {
		voucherSection.style.display = "none";
		cardSection.style.display = "block";
	}
}

/* function copyEmail() fills the billing email with the email address when the checkbox is ticked */
function copyEmail () {
	var sameEmail = document.getElementById("same-email").checked;
	var billingEmail = document.getElementById("billing-email");

	if (sameEmail) {
		billingEmail.value = document.getElementById("res-email").value;   /* copy the email address */
	} else {
		billingEmail.value = "";                                           /* clear it when unticked */
	}
}

/* function isValidEmail() returns true if the email looks valid, false if not */
function isValidEmail (email) {
	if (email.indexOf("@") < 1) {                          /* no @, or @ is the first character */
		return false;
	}
	if (email.indexOf(".", email.indexOf("@")) == -1) {    /* no dot after the @ */
		return false;
	}
	return true;
}

/* function validateReservation() checks all the reservation form data */
function validateReservation () {
	var result = true;                                     /* assumes no errors */

	/* Full name must not be empty */
	var fullname = document.getElementById("fullname").value;
	var fullnameError = document.getElementById("fullname-error");

	if (fullname == "") {
		fullnameError.textContent = "Full name cannot be empty.";
		result = false;
	} else {
		fullnameError.textContent = "";
	}

	/* Email must not be empty and must be valid */
	var email = document.getElementById("res-email").value;
	var emailError = document.getElementById("res-email-error");

	if (email == "") {
		emailError.textContent = "Email cannot be empty.";
		result = false;
	} else if (!isValidEmail(email)) {
		emailError.textContent = "Please enter a valid email address.";
		result = false;
	} else {
		emailError.textContent = "";
	}

	/* Phone number must have at least 10 digits */
	var phone = document.getElementById("res-phone").value;
	var phoneError = document.getElementById("res-phone-error");
	var phonePattern = /^[0-9]{10,}$/;                     /* digits only, 10 or more */

	if (phone == "") {
		phoneError.textContent = "Phone number cannot be empty.";
		result = false;
	} else if (!phone.match(phonePattern)) {
		phoneError.textContent = "Phone number must have at least 10 digits.";
		result = false;
	} else {
		phoneError.textContent = "";
	}

	/* A restaurant must be chosen */
	var restaurant = document.getElementById("restaurant").value;
	var restaurantError = document.getElementById("restaurant-error");

	if (restaurant == "") {
		restaurantError.textContent = "Please select a restaurant.";
		result = false;
	} else {
		restaurantError.textContent = "";
	}

	/* Date and time must be chosen and must not be in the past */
	var datetime = document.getElementById("datetime").value;
	var datetimeError = document.getElementById("datetime-error");
	var chosenDate = new Date(datetime);                   /* turn the text into a date */
	var now = new Date();                                  /* the current date and time */

	if (datetime == "") {
		datetimeError.textContent = "Please choose a date and time.";
		result = false;
	} else if (chosenDate < now) {                         /* earlier than now means it is in the past */
		datetimeError.textContent = "Reservation date and time cannot be in the past.";
		result = false;
	} else {
		datetimeError.textContent = "";
	}

	/* Number of people must be greater than 0 */
	var people = document.getElementById("people").value;
	var peopleError = document.getElementById("people-error");

	if (people == "") {
		peopleError.textContent = "Please enter the number of people.";
		result = false;
	} else if (people <= 0) {
		peopleError.textContent = "Number of people must be greater than 0.";
		result = false;
	} else {
		peopleError.textContent = "";
	}

	/* A deposit method must be chosen */
	var voucherChosen = document.getElementById("pay-voucher").checked;
	var onlineChosen = document.getElementById("pay-online").checked;
	var paymethodError = document.getElementById("paymethod-error");

	if (!voucherChosen && !onlineChosen) {
		paymethodError.textContent = "Please choose a deposit method.";
		result = false;
	} else {
		paymethodError.textContent = "";
	}

	/* Voucher code is only checked for voucher payment: exactly 12 digits */
	var voucher = document.getElementById("voucher").value;
	var voucherError = document.getElementById("voucher-error");
	var voucherPattern = /^[0-9]{12}$/;                    /* exactly 12 digits */

	if (voucherChosen) {
		if (voucher == "") {
			voucherError.textContent = "Voucher code cannot be empty.";
			result = false;
		} else if (!voucher.match(voucherPattern)) {
			voucherError.textContent = "Voucher code must be exactly 12 digits.";
			result = false;
		} else {
			voucherError.textContent = "";
		}
	} else {
		voucherError.textContent = "";                     /* clear old voucher error for online payment */
	}

	/* Card details are only checked for online payment */
	var cardType = document.getElementById("cardtype").value;
	var cardNumber = document.getElementById("cardnumber").value;
	var cardTypeError = document.getElementById("cardtype-error");
	var cardNumberError = document.getElementById("cardnumber-error");
	var digitsPattern = /^[0-9]+$/;                        /* digits only */

	if (onlineChosen) {
		if (cardType == "") {
			cardTypeError.textContent = "Please select a card type.";
			result = false;
		} else {
			cardTypeError.textContent = "";
		}

		if (cardNumber == "") {
			cardNumberError.textContent = "Card number cannot be empty.";
			result = false;
		} else if (!cardNumber.match(digitsPattern)) {
			cardNumberError.textContent = "Card number must contain digits only.";
			result = false;
		} else if (cardType == "amex" && cardNumber.length != 15) {
			cardNumberError.textContent = "American Express card numbers must be 15 digits.";
			result = false;
		} else if ((cardType == "visa" || cardType == "mastercard") && cardNumber.length != 16) {
			cardNumberError.textContent = "Visa and Mastercard numbers must be 16 digits.";
			result = false;
		} else {
			cardNumberError.textContent = "";
		}
	} else {
		cardTypeError.textContent = "";                    /* clear old card errors for voucher payment */
		cardNumberError.textContent = "";
	}

	/* Billing email must not be empty and must be valid */
	var billingEmail = document.getElementById("billing-email").value;
	var billingError = document.getElementById("billing-email-error");

	if (billingEmail == "") {
		billingError.textContent = "Billing email cannot be empty.";
		result = false;
	} else if (!isValidEmail(billingEmail)) {
		billingError.textContent = "Please enter a valid billing email address.";
		result = false;
	} else {
		billingError.textContent = "";
	}

	/* Home or work address (one is enough) and the billing address must be filled in */
	if (!validateAllAddresses()) {
		result = false;
	}

	return result;                                         /* false blocks the form from being submitted */
}

/* function prefillRestaurant() selects the restaurant named in the link, e.g. reservation.html?restaurant=leela */
function prefillRestaurant () {
	var params = new URLSearchParams(window.location.search);   /* reads the part of the address after the ? */
	var chosen = params.get("restaurant");                      /* the value of "restaurant", or null if it is missing */
	var restaurantSelect = document.getElementById("restaurant");

	if (chosen != null) {                                       /* only when the link has a restaurant */
		restaurantSelect.value = chosen;                        /* select that option in the drop-down */
		updateDeposit();                                        /* then set the matching deposit */
	}
}

/* the restaurants and the facts the rules use (minPrice is the lowest price per person on the card) */
var restaurants = [
	{id: "asiba", name: "Restaurant Asiba", halal: true, vegetarian: true, minPrice: 10, purposes: ["family"]},
	{id: "gula", name: "Restaurant Gula Cakery", halal: true, vegetarian: false, minPrice: 45, purposes: ["date", "business"]},
	{id: "pakistan", name: "Restaurant Pakistan", halal: true, vegetarian: true, minPrice: 40, purposes: ["family", "date", "business"]},
	{id: "hakshan", name: "Restaurant Hakshan", halal: false, vegetarian: false, minPrice: 30, purposes: ["date", "business"]},
	{id: "leela", name: "Madam Leela's", halal: true, vegetarian: true, minPrice: 20, purposes: ["family", "date", "business"]},
	{id: "jisoo", name: "Restaurant Jisoo Korean Fried Chicken", halal: false, vegetarian: false, minPrice: 25, purposes: ["date"]}
];

/* function recommendRestaurants() finds the restaurants that match the user's choices */
function recommendRestaurants () {
	var diet = document.getElementById("diet").value;
	var budget = document.getElementById("budget").value;
	var purpose = document.getElementById("purpose").value;
	var valid = true;                                     /* assumes all three choices were made */

	/* every question must be answered */
	if (diet == "") {
		document.getElementById("diet-rec-error").textContent = "Please choose a dietary preference.";
		valid = false;
	} else {
		document.getElementById("diet-rec-error").textContent = "";
	}
	if (budget == "") {
		document.getElementById("budget-error").textContent = "Please choose a budget.";
		valid = false;
	} else {
		document.getElementById("budget-error").textContent = "";
	}
	if (purpose == "") {
		document.getElementById("purpose-error").textContent = "Please choose a dining purpose.";
		valid = false;
	} else {
		document.getElementById("purpose-error").textContent = "";
	}

	if (valid == false) {
		return false;                                     /* stop here and keep the page as it is */
	}

	/* go through each restaurant and keep the ones that pass all three rules */
	var matches = [];
	for (var i = 0; i < restaurants.length; i++) {
		var r = restaurants[i];
		var dietOk = (diet == "none") || (diet == "halal" && r.halal) || (diet == "vegetarian" && r.vegetarian);
		var budgetOk = r.minPrice <= Number(budget);      /* starting price must fit the budget */
		var purposeOk = r.purposes.indexOf(purpose) != -1;    /* purpose must be in the restaurant's list */

		if (dietOk && budgetOk && purposeOk) {
			matches.push(r);                              /* add this restaurant to the matches */
		}
	}

	/* build the result: a list with a Reserve button for each match, or a no-match message */
	var output = "";
	if (matches.length == 0) {
		output = "<p>No exact match. Try a higher budget or a different dining purpose.</p>";
	} else {
		output = "<h3>Recommended for you</h3><ul>";
		for (var j = 0; j < matches.length; j++) {
			output += "<li>" + matches[j].name + " <a class='btn' href='reservation.html?restaurant=" + matches[j].id + "'>Reserve a table</a></li>";
		}
		output += "</ul>";
	}
	document.getElementById("recommend-results").innerHTML = output;

	return false;                                         /* false stops the page from reloading */
}

/* the four parts of every address; the box ids are the prefix (home-, work-, bill-) plus one of these */
var addressParts = ["street", "city", "state", "postcode"];

/* function fillBillingAddress() fills the billing section depending on which of the three options is chosen */
function fillBillingAddress () {
	var useHome = document.getElementById("bill-opt-home").checked;
	var useWork = document.getElementById("bill-opt-work").checked;
	var useEmail = document.getElementById("bill-opt-email").checked;
	var source = "";                                       /* stays empty when "same as email" is chosen */

	if (useHome) {
		source = "home";
	} else if (useWork) {
		source = "work";
	}

	for (var i = 0; i < addressParts.length; i++) {
		var billingBox = document.getElementById("bill-" + addressParts[i]);
		if (source == "") {
			billingBox.value = "";                         /* no street address is needed when the email is used */
		} else {
			billingBox.value = document.getElementById(source + "-" + addressParts[i]).value;
		}
	}

	var billingEmail = document.getElementById("billing-email");   /* only the reservation page has this box */
	var sameEmail = document.getElementById("same-email");
	if (useEmail && billingEmail) {
		sameEmail.checked = true;                          /* tick the existing checkbox too */
		copyEmail();                                       /* copy the email address into the billing email */
	}
}

/* function refreshBilling() keeps the billing address up to date if the home or work address is edited */
function refreshBilling () {
	var useHome = document.getElementById("bill-opt-home").checked;
	var useWork = document.getElementById("bill-opt-work").checked;

	if (useHome || useWork) {
		fillBillingAddress();
	}
}

/* function isAddressEmpty() returns true if all four boxes of an address are empty */
function isAddressEmpty (prefix) {
	for (var i = 0; i < addressParts.length; i++) {
		if (document.getElementById(prefix + "-" + addressParts[i]).value != "") {
			return false;                                  /* found something typed in */
		}
	}
	return true;
}

/* function validateAddress() checks one address (prefix is home, work or bill) and returns true or false */
function validateAddress (prefix, label, required) {
	var street = document.getElementById(prefix + "-street").value;
	var city = document.getElementById(prefix + "-city").value;
	var state = document.getElementById(prefix + "-state").value;
	var postcode = document.getElementById(prefix + "-postcode").value;
	var errorBox = document.getElementById(prefix + "-address-error");
	var postcodePattern = /^[0-9]{4,6}$/;                  /* digits only, 4 to 6 of them */

	if (isAddressEmpty(prefix)) {
		if (required) {
			errorBox.textContent = label + " address: please fill in the street, city, state and postcode.";
			return false;
		}
		errorBox.textContent = "";                         /* an optional address can be left empty */
		return true;
	}

	if (street == "" || city == "" || state == "" || postcode == "") {
		errorBox.textContent = label + " address: please fill in all four boxes, or leave them all empty.";
		return false;
	} else if (!postcode.match(postcodePattern)) {
		errorBox.textContent = label + " address: the postcode must be 4 to 6 digits.";
		return false;
	}

	errorBox.textContent = "";
	return true;
}

/* function validateAllAddresses() needs the home or the work address (either one) and the billing address */
function validateAllAddresses () {
	var ok = true;

	if (isAddressEmpty("home") && isAddressEmpty("work")) {
		document.getElementById("home-address-error").textContent = "Please fill in your home address or your work address (one is enough).";
		document.getElementById("work-address-error").textContent = "";
		ok = false;
	} else {
		if (!validateAddress("home", "Home", false)) {
			ok = false;
		}
		if (!validateAddress("work", "Work", false)) {
			ok = false;
		}
	}

	var emailChosen = document.getElementById("bill-opt-email").checked;   /* billing goes to the email, so no street address is needed */
	if (!validateAddress("bill", "Billing", !emailChosen)) {
		ok = false;
	}

	return ok;
}

/* function init() links the forms and fields to their functions */
function init () {
	var registerForm = document.getElementById("register-form");
	if (registerForm) {
		registerForm.onsubmit = validateRegister;
	}

	var restaurantSelect = document.getElementById("restaurant");   /* only the reservation page has this */
	if (restaurantSelect) {
		restaurantSelect.onchange = updateDeposit;                  /* run updateDeposit when the choice changes */
		prefillRestaurant();                                        /* pre-select from the link */
	}

	var payVoucher = document.getElementById("pay-voucher");
	var payOnline = document.getElementById("pay-online");
	if (payVoucher && payOnline) {
		payVoucher.onclick = showPaymentFields;     /* run when Voucher is clicked */
		payOnline.onclick = showPaymentFields;      /* run when Online payment is clicked */
	}

	var sameEmail = document.getElementById("same-email");
	if (sameEmail) {
		sameEmail.onclick = copyEmail;              /* run when the checkbox is clicked */
	}

	var reservationForm = document.getElementById("reservation-form");
	if (reservationForm) {
		reservationForm.onsubmit = validateReservation;
	}

	var recommendForm = document.getElementById("recommend-form");
	if (recommendForm) {
		recommendForm.onsubmit = recommendRestaurants;
	}

	var billingHome = document.getElementById("bill-opt-home");   /* only the register and reservation pages have this */
	if (billingHome) {
		var billingChoices = ["bill-opt-home", "bill-opt-work", "bill-opt-email"];
		for (var k = 0; k < billingChoices.length; k++) {
			document.getElementById(billingChoices[k]).onclick = fillBillingAddress;   /* fill when a choice is clicked */
		}
		for (var m = 0; m < addressParts.length; m++) {
			document.getElementById("home-" + addressParts[m]).oninput = refreshBilling;   /* keep billing up to date */
			document.getElementById("work-" + addressParts[m]).oninput = refreshBilling;
		}
	}
}

/* run init() once the page has loaded */
window.onload = init;