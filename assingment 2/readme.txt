
MyRestaurant - COS10005 Assignment 2
Student name: Muhammad Aasif
Student ID: 106947103


1. WEBSITE STRUCTURE

MyRestaurant is a restaurant discovery and reservation website for
six restaurants in Kota Kemuning. It has five pages, and every page
shares the same header, navigation menu and footer. The menu
highlights the page you are on.

assignment2/
  index.html         Home: about the platform, who it is for, what we offer

  restaurants.html   Six restaurant cards (cuisine, description, dishes and
                     prices, average price, halal, vegetarian, best for,
                     deposit, Reserve button)

  recommend.html     Recommendation form (diet, budget, dining purpose)
  register.html      Registration form with validation

  reservation.html   Reservation form with validation, deposit and billing
  css/style.css      All the styling (mobile-first, with tablet and desktop
                     breakpoints)

  js/script.js       All the JavaScript for every page

  images/            Logo, home page picture and the six restaurant photos

  Readme.txt         This file

The reservation form is sent (method POST) to:
http://mercury.swin.edu.au/it000000/cos10005/regtest.php


2. GITHUB REPOSITORY

https://github.com/sif2310/COS10005.git



3. HOW THE JAVASCRIPT WORKS 

All the JavaScript is in js/script.js. Every page loads this file, so
when the page opens, a function called init() runs. It looks for the
forms on the current page and only connects the functions to the forms
that exist there.

Register form (validateRegister)
 - The username must be at least 5 characters and use only letters,
   numbers and underscores.
 - The email must contain an @ that is not the first character, and a
   dot after the @.
 - The phone number must be 8 to 15 digits only.
 - The password must be at least 10 characters and contain an uppercase
   letter, a lowercase letter, a number and a special character.
 - The confirm password must match the password.
 - A gender must be chosen, at least one dietary preference must be
   ticked, and a country must be selected.
 - If any rule fails, an error message is written under that field and
   the form is not submitted. If everything is correct, a success
   message is shown.

Reservation form (validateReservation)
 - The full name must not be empty and the email must be valid.
 - The phone number must be at least 10 digits.
 - A restaurant must be chosen, and the date and time must be chosen and
   must not be in the past.
 - The number of people must be more than 0.
 - A deposit method must be chosen. The deposit amount is filled in
   automatically from the restaurant chosen (updateDeposit).
 - If Voucher is chosen, the voucher box is shown and the code must be
   exactly 12 digits. If Online payment is chosen, the card section is
   shown (showPaymentFields). The card type must be chosen and the card
   number must be digits only: 16 digits for Visa and Mastercard, 15
   digits for American Express.
 - The billing email must be valid. The "Same as email address" tick
   box copies the email above into it (copyEmail).
 - If any rule fails, the form is not submitted. If everything is
   correct, the form is sent to the Mercury server.

Addresses (register and reservation pages)
 - The user must fill in a home address OR a work address (one is
   enough). If an address is started, all four boxes (street, city,
   state, postcode) must be filled, and the postcode must be 4 to 6
   digits.
 - The billing address has three options: same as home, same as work, or
   same as email. The first two copy that address into the billing
   boxes (fillBillingAddress). "Same as email" clears the billing
   address boxes, and on the reservation page it also fills the billing
   email. If no option is chosen, the user types a billing address and
   it is required.

Recommendation (recommendRestaurants)
 - All three choices must be made. The six restaurants are stored in an
   array of objects (name, halal, vegetarian, lowest price, dining
   purposes). The function goes through the list with a loop and keeps a
   restaurant only if it matches the diet, the budget (its lowest price
   is not above the budget) and the dining purpose.
 - Each match is shown with a Reserve button. The button link carries
   the restaurant name (reservation.html?restaurant=leela), and the
   reservation page reads it (prefillRestaurant) so that restaurant is
   already selected.


4. KNOWN ISSUES AND LIMITATIONS

 - The validation depends on JavaScript. If JavaScript is turned off,
   the forms are not checked.
 - The billing email is copied when the tick box or the "same as email"
   option is chosen. If the email is changed afterwards, the user must
   tick it again.
 - The recommendation uses each restaurant's lowest price per person, so
   a restaurant can be recommended even if its dearer dishes are above
   the budget.
 - The voucher code and card number are checked for format only. They
   are not checked against a real payment system.
 - The registration form shows a success message but does not send the
   data to a server.
 - The bonus bill calculator page was not attempted.


5. REFERENCES

 - Home page photo showing variety of foods: https://pixabay.com/photos/food-dishes-restaurant-meal-menu-1050813/ (karriezhu)
 - Restaurant photos: [i took all of the picture my myself].

 - Logo: made by me using an AI image tool 

 - Restaurant names, addresses and dishes are based on the real
   restaurants in Kota Kemuning. The descriptions were written by me
   in my own words. [Source of menu prices= i went to all of the restaurant in real life and got the menu prices.]

 - Class lab files (validation, tooltip examples) were used as a guide
   for the coding style.


6. USE OF AI TOOLS

I used an AI assistant (Claude) to help plan the site, to explain
concepts, to help  review and teach parts of the HTML, CSS and
JavaScript, and to help generate the logo.
