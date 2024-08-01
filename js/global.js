/*

    Stylesheet for all pages

    Author: Preston Sia
    Created: 2024-08-01
    Last updated: 2024-08-01

*/

// Variables
var btnOpenMobileMenu = document.getElementById("btnOpenMobileMenu");
var btnCloseMobileMenu = document.getElementById("btnCloseMobileMenu");
var mainMobileMenu = document.getElementById("mainMobileMenu");

function openMobileMenu() {
    mainMobileMenu.classList.add("aaaMobileMenuAnimate");
}

function closeMobileMenu() {
    mainMobileMenu.classList.remove("aaaMobileMenuAnimate");
}

btnOpenMobileMenu.addEventListener("click", openMobileMenu);
btnCloseMobileMenu.addEventListener("click", closeMobileMenu);
