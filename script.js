/* ==========================================
   WE SOCIAL CLUB
   INTERACTIONS & ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ======================================
       1. MOBILE NAVIGATION
    ====================================== */

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("mainNavigation");

    if (menuButton && navigation) {

        function closeMenu() {
            navigation.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }

        menuButton.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuButton.classList.toggle("active", isOpen);
            menuButton.setAttribute("aria-expanded", isOpen);

        });

        // Close menu after selecting a link
        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {

            if (
                !navigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMenu();
            }

        });

        // Close menu with Escape
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    /* ======================================
       2. SMOOTH NAVIGATION
    ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Update the browser address
            history.replaceState(null, "", targetId);

        });

    });


    /* ======================================
       3. SECTION REVEAL ANIMATION
    ====================================== */

    const revealStyle = document.createElement("style");

    revealStyle.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(28px);
            transition:
                opacity .8s ease,
                transform .8s cubic-bezier(.2,.7,.2,1);
        }

        .reveal-element.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .experience-card,
        .community-card,
        .gallery-item {
            will-change: transform;
        }

        .button:active,
        .nav-join:active {
            transform: scale(.96);
        }

        .button:focus-visible,
        a:focus-visible,
        button:focus-visible {
            outline: 2px solid #461619;
            outline-offset: 5px;
        }
    `;

    document.head.appendChild(revealStyle);

    const revealItems = document.querySelectorAll(
        ".section-heading, .about-grid, .community-grid, " +
        ".experiences-intro, .experience-card, .meetup-inner, " +
        ".gallery-heading, .gallery-item, .join-intro, .membership-form"
    );

    revealItems.forEach(item => {
        item.classList.add("reveal-element");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("is-visible");
        });

    }


    /* ======================================
       4. MEMBERSHIP FORM
    ====================================== */

    const form = document.getElementById("membershipForm");

    if (form) {

        const steps = Array.from(
            form.querySelectorAll(".form-step")
        );

        const nextButton = document.getElementById("nextButton");
        const backButton = document.getElementById("backButton");
        const stepLabel = document.getElementById("stepLabel");
        const progressFill = document.getElementById("progressFill");
        const formMessage = document.getElementById("formMessage");

        const totalSteps = steps.length;

        let currentStep = 0;
        let isSending = false;

        const submissionURL =
            "https://script.google.com/macros/s/AKfycbztYwGOawoebwMmyRnwjuseuSNphMgmeNdFpAJi4G772CqE4HArd-Xvq2w4WKERZEs19g/exec";


        // Display the selected step
        function displayStep(index) {

            steps.forEach((step, position) => {

                step.classList.toggle(
                    "active",
                    position === index
                );

            });

            currentStep = index;

            // Step number
            if (stepLabel) {

                stepLabel.textContent =
                    `STEP ${index + 1} OF ${totalSteps}`;

            }

            // Progress bar
            if (progressFill) {

                const progress =
                    ((index + 1) / totalSteps) * 100;

                progressFill.style.width = `${progress}%`;

            }

            // Back button
            if (backButton) {

                backButton.style.visibility =
                    index === 0 ? "hidden" : "visible";

            }

            // Continue / submit button
            if (nextButton) {

                nextButton.textContent =
                    index === totalSteps - 1
                        ? "SEND APPLICATION →"
                        : "CONTINUE →";

            }

            if (formMessage) {
                formMessage.textContent = "";
            }

        }


        // Validate fields in the current step
        function validateStep(index) {

            const fields = steps[index].querySelectorAll(
                "input, textarea, select"
            );

            for (const field of fields) {

                if (!field.checkValidity()) {

                    field.reportValidity();

                    return false;

                }

            }

            return true;

        }


        // Continue button
        if (nextButton) {

            nextButton.addEventListener("click", () => {

                if (isSending) return;

                if (!validateStep(currentStep)) return;

                if (currentStep < totalSteps - 1) {

                    displayStep(currentStep + 1);

                } else {

                    form.requestSubmit();

                }

            });

        }


        // Back button
        if (backButton) {

            backButton.addEventListener("click", () => {

                if (isSending) return;

                if (currentStep > 0) {

                    displayStep(currentStep - 1);

                }

            });

        }


        // Submit the application
        form.addEventListener("submit", async event => {

            event.preventDefault();

            if (isSending) return;


            // Check every step before submission
            for (let i = 0; i < totalSteps; i++) {

                if (!validateStep(i)) {

                    displayStep(i);

                    return;

                }

            }


            isSending = true;

            nextButton.disabled = true;
            nextButton.textContent = "SENDING...";

            backButton.disabled = true;

            if (formMessage) {

                formMessage.textContent =
                    "Please wait while we send your application...";

            }


            // Collect the information
            const formData = new FormData(form);
            const submissionData = new URLSearchParams();

            formData.forEach((value, key) => {

                submissionData.append(key, value);

            });


            try {

                await fetch(submissionURL, {

                    method: "POST",

                    mode: "no-cors",

                    body: submissionData

                });


                // Confirmation screen
                form.innerHTML = `

                    <div class="form-success">

                        <span class="success-mark">✳</span>

                        <p class="eyebrow">WELCOME TO THE POSSIBILITY</p>

                        <h2>There's room for you.</h2>

                        <p>
                            Thank you for reaching out to WE Social Club.
                            Your application has been submitted.
                            We look forward to connecting with you.
                        </p>

                        <p class="success-note">
                            GOOD PEOPLE. GREAT EXPERIENCES.
                            GENUINE BELONGING & V!BES.
                        </p>

                    </div>

                `;

            } catch (error) {

                console.error(
                    "WE Social Club form error:",
                    error
                );

                isSending = false;

                nextButton.disabled = false;
                nextButton.textContent = "SEND APPLICATION →";

                backButton.disabled = false;

                if (formMessage) {

                    formMessage.textContent =
                        "We couldn't send your application. Please try again.";

                }

            }

        });


        // Start at step one
        displayStep(0);

    }


    /* ======================================
       5. FOOTER YEAR
    ====================================== */

    const year = document.getElementById("currentYear");

    if (year) {

        year.textContent = new Date().getFullYear();

    }


    /* ======================================
       6. LOGO MOVEMENT
    ====================================== */

    const logos = document.querySelectorAll(
        ".brand img, .hero-logo, .footer-brand img"
    );

    logos.forEach((logo, index) => {

        logo.style.animationDelay = `${index * 0.4}s`;

    });


    /* ======================================
       7. GALLERY IMAGE INTERACTION
    ====================================== */

    document.querySelectorAll(".gallery-item").forEach(item => {

        item.addEventListener("mouseenter", () => {

            item.style.zIndex = "2";

        });

        item.addEventListener("mouseleave", () => {

            item.style.zIndex = "1";

        });

    });


    console.log("WE Social Club website is ready.");

});
