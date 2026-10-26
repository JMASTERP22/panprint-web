```javascript
"use strict";

/*
 * PAN PRINT PACK WEBSITE
 *
 * Replace these two values with your real business details.
 */

const BUSINESS_EMAIL = "YOUR-BUSINESS-EMAIL@example.com";

const WHATSAPP_NUMBER = "91XXXXXXXXXX";


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));

        navLinks.classList.toggle("open", !isOpen);

    });

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* COPYRIGHT YEAR */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* WHATSAPP BUTTON */

const whatsappButton = document.getElementById("whatsappButton");

if (whatsappButton) {

    if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {

        const message =
            "Hello PAN Print Pack, I would like to enquire about corrugated boxes and packaging solutions.";

        whatsappButton.href =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        whatsappButton.target = "_blank";

        whatsappButton.rel = "noopener noreferrer";

    } else {

        /*
         * Until a real number is added, the button leads
         * to the website's enquiry section.
         */

        whatsappButton.href = "#contact";

        whatsappButton.removeAttribute("target");

    }

}


/* QUOTATION FORM */

const quoteForm = document.getElementById("quoteForm");

const formStatus = document.getElementById("formStatus");

if (quoteForm) {

    quoteForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!quoteForm.reportValidity()) {
            return;
        }

        /*
         * Prevent the form from opening an email addressed
         * to an unchanged placeholder.
         */

        if (
            !BUSINESS_EMAIL ||
            BUSINESS_EMAIL.includes("YOUR-BUSINESS-EMAIL") ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(BUSINESS_EMAIL)
        ) {

            if (formStatus) {

                formStatus.textContent =
                    "Website setup required: add your real business email in script.js before using the quotation form.";

            }

            return;

        }


        const formData = new FormData(quoteForm);

        const name = formData.get("name") || "";
        const company = formData.get("company") || "";
        const email = formData.get("email") || "";
        const phone = formData.get("phone") || "";
        const product = formData.get("product") || "";
        const quantity = formData.get("quantity") || "Not specified";
        const location = formData.get("location") || "Not specified";
        const details = formData.get("details") || "";


        const subject =
            "Packaging Enquiry - " + name;


        const body = [
            "PAN PRINT PACK - NEW WEBSITE ENQUIRY",
            "",
            "Customer name: " + name,
            "Company: " + (company || "Not specified"),
            "Email: " + email,
            "Phone: " + phone,
            "Product: " + product,
            "Quantity: " + quantity,
            "Delivery location: " + location,
            "",
            "Requirements:",
            details,
            "",
            "Sent through panprintpack.co.in"
        ].join("\n");


        const mailtoLink =
            "mailto:" +
            BUSINESS_EMAIL +
            "?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);


        if (formStatus) {

            formStatus.textContent =
                "Opening your email application. Please review and send the enquiry.";

        }


        window.location.href = mailtoLink;

    });

}
```
