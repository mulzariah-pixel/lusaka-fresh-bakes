
/* ========================================
   LUSAKA FRESH BAKES
   JavaScript Functionality
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    function closeMenu() {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // 2. CLOSE MENU WHEN A LINK IS CLICKED

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });


    // 3. AUTOMATIC PRODUCT SELECTION

    const orderButtons = document.querySelectorAll(".order-btn");
    const productSelect = document.getElementById("product");

    orderButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedProduct = button.dataset.product;

            productSelect.value = selectedProduct;

        });

    });


    // 4. CONTACT FORM VALIDATION

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const product = productSelect.value;

        const message = document.getElementById("message").value.trim();


        // Check empty fields

        if (!name || !email || !product || !message) {

            formStatus.textContent =
                "Please complete all required fields.";

            formStatus.style.color = "#b91c1c";

            return;

        }


        // Validate email address

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formStatus.textContent =
                "Please enter a valid email address.";

            formStatus.style.color = "#b91c1c";

            return;

        }


        // Display demo confirmation

        formStatus.textContent =
            `Thank you, ${name}! Your enquiry about ${product} has been validated. This is a demo; no message was sent.`;

        formStatus.style.color = "#15803d";


        // Clear form fields

        contactForm.reset();

    });


    // 5. AUTOMATIC COPYRIGHT YEAR

    const footerParagraphs =
        document.querySelectorAll(".footer p");

    footerParagraphs.forEach(function (paragraph) {

        if (paragraph.textContent.includes("©")) {

            paragraph.textContent =
                `© ${new Date().getFullYear()} Lusaka Fresh Bakes.`;

        }

    });


    // 6. CONFIRM JAVASCRIPT IS RUNNING

    console.log("Lusaka Fresh Bakes: JavaScript loaded successfully.");

});
