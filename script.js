```javascript
document.addEventListener("DOMContentLoaded", function () {

  console.log("WE Social Club website loaded.");

  // ==========================================
  // GOOGLE SHEETS CONNECTION
  // ==========================================

  const GOOGLE_SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbztYwGOawoebwMmyRnwjuseuSNphMgmeNdFpAJi4G772CqE4HArd-Xvq2w4WKERZEs19g/exec";


  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
      });
    });

  }


  // ==========================================
  // MEMBERSHIP FORM
  // ==========================================

  const form = document.getElementById("joinForm");
  const steps = document.querySelectorAll(".form-step");
  const progressBar = document.getElementById("progressBar");
  const stepCounter = document.getElementById("stepCounter");
  const formMessage = document.getElementById("formMessage");

  let currentStep = 1;
  const totalSteps = steps.length;


  function showStep(stepNumber) {

    currentStep = stepNumber;

    steps.forEach(function (step) {
      step.classList.remove("active");
    });

    const activeStep = document.querySelector(
      '.form-step[data-step="' + stepNumber + '"]'
    );

    if (activeStep) {
      activeStep.classList.add("active");
    }

    if (progressBar) {
      progressBar.style.width =
        (stepNumber / totalSteps) * 100 + "%";
    }

    if (stepCounter) {
      stepCounter.textContent =
        String(stepNumber).padStart(2, "0") +
        " / " +
        String(totalSteps).padStart(2, "0");
    }

  }


  function validateCurrentStep() {

    const activeStep = document.querySelector(
      '.form-step[data-step="' + currentStep + '"]'
    );

    if (!activeStep) return false;

    const requiredFields = activeStep.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );

    for (const field of requiredFields) {

      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }

    }

    return true;

  }


  // ==========================================
  // NEXT BUTTONS
  // ==========================================

  document.querySelectorAll(".next-btn").forEach(function (button) {

    button.addEventListener("click", function () {

      if (!validateCurrentStep()) return;

      if (currentStep < totalSteps) {
        showStep(currentStep + 1);
      }

    });

  });


  // ==========================================
  // SUBMIT MEMBERSHIP DETAILS
  // ==========================================

  if (form) {

    form.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!validateCurrentStep()) return;

      const submitButton = form.querySelector(".submit-btn");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";
      }

      const name = document.getElementById("name").value.trim();
      const age = document.getElementById("age").value.trim();
      const location = document.getElementById("location").value.trim();
      const about = document.getElementById("aboutYou").value.trim();
      const interests = document.getElementById("interests").value.trim();
      const skills = document.getElementById("skills").value.trim();
      const whatsapp = document.getElementById("whatsapp").value.trim();
      const participation = document.getElementById("participation").value;
      const extra = document.getElementById("extra").value.trim();


      // Prepare data for the existing Google Sheet.

      const formData = new URLSearchParams();

      formData.append("name", name);
      formData.append("age", age);
      formData.append("location", location);
      formData.append("about", about);
      formData.append("interests", interests);
      formData.append("skills", skills);
      formData.append("participation", participation);
      formData.append("whatsapp", whatsapp);
      formData.append("extra", extra);


      fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
      })

      .then(function () {

        formMessage.textContent =
          "THANK YOU, " + name.toUpperCase() +
          "! Your membership details have been sent. We'll be in touch.";

        formMessage.style.color = "#246b35";

        form.reset();

        showStep(1);

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "SUBMIT MY DETAILS ↗";
        }

        console.log("Membership submission attempted for:", name);

      })

      .catch(function (error) {

        console.error("Submission error:", error);

        formMessage.textContent =
          "Something went wrong. Please check your connection and try again.";

        formMessage.style.color = "#a52c20";

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "TRY AGAIN ↗";
        }

      });

    });

  }


  // ==========================================
  // START FORM AT STEP ONE
  // ==========================================

  showStep(1);


  console.log("WE Social Club interactions ready.");

});
```
