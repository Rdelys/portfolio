const navbar = document.querySelector(".navbar");
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
});

burger.addEventListener("click", () => {
    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
});
