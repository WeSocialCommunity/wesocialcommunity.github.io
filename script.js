document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE NAVIGATION */

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("mainNavigation");

    if (menuButton && navigation) {

        function closeMenu() {
            navigation.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }

        menuButton.addEventListener("click", () => {
            const open = navigation.classList.toggle("open");

            menuButton.classList.toggle("active", open);
            menuButton.setAttribute("aria-expanded", String(open));
        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (!navigation.contains(event.target) &&
                !menuButton.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });
    }


    /* PAGE TRANSITIONS */

    document.body.classList.add("page-ready");

    document.querySelectorAll('a[href$=".html"]').forEach(link => {

        link.addEventListener("click", event => {

            const destination = link.getAttribute("href");

            if (
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.button !== 0
            ) return;

            if (!destination || destination.startsWith("http")) return;

            event.preventDefault();

            document.body.classList.add("page-leaving");

            setTimeout(() => {
                window.location.href = destination;
            }, 180);

        });

    });


    /* FOOTER YEAR */

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* GALLERY IMAGE VIEWER */

    document.querySelectorAll(".gallery-item, .preview-image").forEach(item => {

        item.addEventListener("click", event => {

            const image = item.querySelector("img");

            if (!image) return;

            event.preventDefault();

            const viewer = document.createElement("div");
            viewer.className = "image-viewer";

            viewer.innerHTML = `
                <button class="viewer-close" aria-label="Close image">×</button>
                <img src="${image.src}" alt="${image.alt}">
                <p>${image.alt}</p>
            `;

            document.body.appendChild(viewer);

            viewer.querySelector(".viewer-close").addEventListener("click", () => {
                viewer.remove();
            });

            viewer.addEventListener("click", event => {
                if (event.target === viewer) viewer.remove();
            });

            document.addEventListener("keydown", function closeViewer(event) {
                if (event.key === "Escape") {
                    viewer.remove();
                    document.removeEventListener("keydown", closeViewer);
                }
            });

        });

    });


    /* MEMBERSHIP FORM */

    const form = document.getElementById("membershipForm");

    if (form) {

        const steps = Array.from(form.querySelectorAll(".form-step"));
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


        function displayStep(index) {

            steps.forEach((step, position) => {
                step.classList.toggle("active", position === index);
            });

            currentStep = index;

            if (stepLabel) {
                stepLabel.textContent = `STEP ${index + 1} OF ${totalSteps}`;
            }

            if (progressFill) {
                progressFill.style.width =
                    `${((index + 1) / totalSteps) * 100}%`;
            }

            if (backButton) {
                backButton.style.visibility =
                    index === 0 ? "hidden" : "visible";
            }

            if (nextButton) {
                nextButton.textContent =
                    index === totalSteps - 1
                        ? "SEND APPLICATION →"
                        : "CONTINUE →";
            }

            if (formMessage) formMessage.textContent = "";

            const heading = steps[index].querySelector("h3");

            if (heading) {
                heading.setAttribute("tabindex", "-1");
                heading.focus({ preventScroll: true });
            }
        }


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


        if (backButton) {

            backButton.addEventListener("click", () => {

                if (isSending) return;

                if (currentStep > 0) {
                    displayStep(currentStep - 1);
                }

            });

        }


        form.addEventListener("submit", async event => {

            event.preventDefault();

            if (isSending) return;

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

            formMessage.textContent =
                "Please wait while we send your application...";

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

                form.innerHTML = `
                    <div class="form-success">
                        <span class="success-mark">✳</span>
                        <p class="eyebrow">WELCOME TO THE POSSIBILITY</p>
                        <h2>There's room for you.</h2>
                        <p>
                            Thank you for reaching out to WE Social Club.
                            We look forward to connecting with you.
                        </p>
                        <p class="success-note">
                            GOOD PEOPLE. GREAT EXPERIENCES.
                            GENUINE BELONGING & V!BES.
                        </p>
                    </div>
                `;

            } catch (error) {

                console.error("WE Social Club form error:", error);

                isSending = false;

                nextButton.disabled = false;
                nextButton.textContent = "SEND APPLICATION →";

                backButton.disabled = false;

                formMessage.textContent =
                    "We couldn't send your application. Please try again.";

            }

        });

        displayStep(0);
    }

    console.log("WE Social Club website is ready.");

});
