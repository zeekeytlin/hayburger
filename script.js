
document.addEventListener("DOMContentLoaded", () => {

   
const darkModeToggle = document.getElementById("darkModeToggle");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function updateThemeButton() {
    if (darkModeToggle) {
        const isDark = document.body.classList.contains("darkmode");

        darkModeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        darkModeToggle.setAttribute("aria-pressed", isDark);
    }
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || (!savedTheme && systemTheme.matches)) {
    document.body.classList.add("darkmode");
} else {
    document.body.classList.remove("darkmode");
}

updateThemeButton();

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("darkmode");

        const isDark = document.body.classList.contains("darkmode");

        localStorage.setItem("theme", isDark ? "dark" : "light");

        updateThemeButton();
    });
}

systemTheme.addEventListener("change", event => {
    if (!localStorage.getItem("theme")) {
        document.body.classList.toggle("darkmode", event.matches);
        updateThemeButton();
    }
});

    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function(event) {

            const destination = this.getAttribute("href");

            if (
                destination &&
                !destination.startsWith("#") &&
                !destination.startsWith("mailto:") &&
                !destination.startsWith("tel:") &&
                !this.target &&
                this.origin === window.location.origin
            ) {

                event.preventDefault();

                document.body.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = destination;
                }, 300);

            }

        });

    });


    const sizeButtons = document.querySelectorAll(".szbtn");
    let selectedSize = "M";

    if (sizeButtons.length > 0) {

        sizeButtons.forEach(btn => {

            if (btn.textContent.trim() === "M") {
                btn.classList.add("selected");
                btn.setAttribute("aria-pressed", "true");
            }

            btn.addEventListener("click", () => {

                sizeButtons.forEach(b => {
                    b.classList.remove("selected");
                    b.setAttribute("aria-pressed", "false");
                });

                btn.classList.add("selected");
                btn.setAttribute("aria-pressed", "true");

                selectedSize = btn.textContent.trim();

            });

        });

    }

    const minusBtn = document.getElementById("decreaseQty");
    const plusBtn = document.getElementById("increaseQty");
    const qtyInput = document.querySelector(".qtyinput");

    if (qtyInput) {

        qtyInput.value = Math.max(1, parseInt(qtyInput.value) || 1);

        if (minusBtn) {
            minusBtn.addEventListener("click", () => {

                let quantity = parseInt(qtyInput.value) || 1;

                if (quantity > 1) {
                    qtyInput.value = quantity - 1;
                }

            });
        }

        if (plusBtn) {
            plusBtn.addEventListener("click", () => {

                let quantity = parseInt(qtyInput.value) || 1;

                qtyInput.value = quantity + 1;

            });
        }

        qtyInput.addEventListener("change", () => {

            let quantity = parseInt(qtyInput.value);

            if (isNaN(quantity) || quantity < 1) {
                qtyInput.value = 1;
            } else {
                qtyInput.value = quantity;
            }

        });

    }


    const orderBtn = document.querySelector(".orderbtnlink");

    if (orderBtn && qtyInput) {

        orderBtn.addEventListener("click", event => {

            event.preventDefault();

            const productName = document.querySelector(".productdetails h2")?.textContent.trim() || "Hayburger Tee";

            const quantity = Math.max(1, parseInt(qtyInput.value) || 1);

            const total = 499 * quantity;

            const recipient = "shop@Hayburger.com";

            const emailSubject = encodeURIComponent("Order Details");

            const emailBody = encodeURIComponent(
                "Product: " + productName + "\n" +
                "Size: " + selectedSize + "\n" +
                "Quantity: " + quantity + "\n" +
                "Total Price: ₱" + total + "\n\n" +
                "Customer Name: \n" +
                "Contact Number: \n" +
                "Delivery Address: "
            );

            window.location.href =
                "mailto:" + recipient +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

        });

    }

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {

                formStatus.textContent =
                    "Please complete all fields before sending your message.";

                formStatus.classList.add("show");

                return;

            }

            const recipient = "hello@hayburger.com";

            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            const mailtoLink =
                "mailto:" + recipient +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            formStatus.textContent =
                "Your email app is opening! Please review your message and press Send to contact Hayburger.";

            formStatus.classList.add("show");

            window.location.href = mailtoLink;

        });

    }

});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    function closeMenu() {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", event => {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            closeMenu();
        }
    });
}
