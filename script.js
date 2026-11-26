/* =========================================
   WE SOCIAL CLUB — WEBSITE INTERACTIONS
========================================= */


/* -----------------------------------------
   MOBILE NAVIGATION
----------------------------------------- */

const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");

if (menuButton && mainNavigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("open");

        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a navigation link
    mainNavigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNavigation.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    // Close menu when Escape is pressed
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            mainNavigation.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}


/* -----------------------------------------
   MEMBERSHIP FORM
----------------------------------------- */

const membershipForm = document.getElementById("membershipForm");

if (membershipForm) {

    const steps = Array.from(
        membershipForm.querySelectorAll(".form-step")
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


    // Show the correct form step
    function showStep(index) {

        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });

        currentStep = index;

        // Update step counter
        if (stepLabel) {
            stepLabel.textContent =
                `STEP ${currentStep + 1} OF ${totalSteps}`;
        }

        // Update progress bar
        if (progressFill) {
            const progress =
                ((currentStep + 1) / totalSteps) * 100;

            progressFill.style.width = `${progress}%`;
        }

        // Back button visibility
        if (backButton) {
            backButton.style.display =
                currentStep === 0 ? "none" : "inline-flex";
        }

        // Change final button text
        if (nextButton) {
            nextButton.textContent =
                currentStep === totalSteps - 1
                    ? "SEND APPLICATION →"
                    : "CONTINUE →";
        }

        if (formMessage) {
            formMessage.textContent = "";
        }
    }


    // Check whether the current step is complete
    function validateCurrentStep() {

        const currentFields =
            steps[currentStep].querySelectorAll(
                "input, select, textarea"
            );

        for (const field of currentFields) {

            if (!field.checkValidity()) {
                field.reportValidity();
                return false;
            }
        }

        return true;
    }


    // Move forward
    if (nextButton) {
        nextButton.addEventListener("click", () => {

            if (isSending) return;

            if (!validateCurrentStep()) return;

            if (currentStep < totalSteps - 1) {
                showStep(currentStep + 1);
            } else {
                membershipForm.requestSubmit();
            }
        });
    }


    // Move backward
    if (backButton) {
        backButton.addEventListener("click", () => {

            if (isSending) return;

            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    }


    // Submit application
    membershipForm.addEventListener("submit", async event => {

        event.preventDefault();

        if (isSending) return;

        // Validate every step before submission
        for (let i = 0; i < totalSteps; i++) {

            const fields =
                steps[i].querySelectorAll(
                    "input, select, textarea"
                );

            for (const field of fields) {

                if (!field.checkValidity()) {
                    showStep(i);
                    field.reportValidity();
                    return;
                }
            }
        }

        isSending = true;

        if (nextButton) {
            nextButton.disabled = true;
            nextButton.textContent = "SENDING...";
        }

        if (backButton) {
            backButton.disabled = true;
        }

        if (formMessage) {
            formMessage.textContent =
                "Sending your application. Please wait...";
        }

        // Collect the form information
        const formData = new FormData(membershipForm);
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

            // Show confirmation
            membershipForm.innerHTML = `
                <div class="form-success">
                    <span class="success-mark">✳</span>

                    <p class="eyebrow">WE GOT YOU</p>

                    <h2>You're one step closer to belonging.</h2>

                    <p>
                        Thank you for reaching out to We Social Club.
                        Your application has been sent. We'll be in touch.
                    </p>

                    <p class="success-note">
                        Good people. Great experiences.
                        Genuine belonging & v!bes.
                    </p>
                </div>
            `;

        } catch (error) {

            console.error("Application submission error:", error);

            isSending = false;

            if (nextButton) {
                nextButton.disabled = false;
                nextButton.textContent = "SEND APPLICATION →";
            }

            if (backButton) {
                backButton.disabled = false;
            }

            if (formMessage) {
                formMessage.textContent =
                    "Something went wrong. Please try again.";
            }
        }
    });


    // Start at the first step
    showStep(0);
}


/* -----------------------------------------
   FOOTER YEAR
----------------------------------------- */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* -----------------------------------------
   CLOSE NAVIGATION WHEN CLICKING OUTSIDE
----------------------------------------- */

document.addEventListener("click", event => {

    if (!menuButton || !mainNavigation) return;

    const clickedInsideMenu =
        mainNavigation.contains(event.target);

    const clickedButton =
        menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
        mainNavigation.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    }
});
