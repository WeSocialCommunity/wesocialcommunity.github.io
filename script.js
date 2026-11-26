const app = document.getElementById("app");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

const FORM_ENDPOINT =
"https://script.google.com/macros/s/AKfycbztYwGOawoebwMmyRnwjuseuSNphMgmeNdFpAJi4G772CqE4HArd-Xvq2w4WKERZEs19g/exec";


/* NAVIGATION */

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuToggle.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    !navigation.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    navigation.classList.remove("open");
    menuToggle.classList.remove("active");
  }
});


/* PAGE CONTENT */

const pages = {

  home: `
    <div class="page">

      <section class="hero">
        <div class="container hero-grid">

          <div>
            <div class="eyebrow">A DIFFERENT KIND OF SOCIAL CLUB — MBale</div>

            <h1 class="hero-title">
              <span>GOOD</span>
              <span class="italic">people.</span>
              <span>GREAT</span>
              <span class="italic">v!bes.</span>
            </h1>

            <p class="hero-description">
              A place to meet, connect, unwind and experience life
              with people who make being together feel easy.
              No pressure. No judgement. Just genuine belonging.
            </p>

            <a href="index.html?page=join" class="red-link">
              FIND YOUR PEOPLE <span>↗</span>
            </a>
          </div>

          <div class="hero-side">
            <img src="com1.jpeg" alt="We Social Club community">

            <div class="image-caption">
              <span>THE PEOPLE. THE MOMENTS.</span>
              <span>01 / 03</span>
            </div>

            <div class="hero-note">
              Life is better when<br>
              it is <em>shared.</em>
            </div>
          </div>

        </div>
      </section>

      <div class="marquee">
        <div class="marquee-track">
          <span>GOOD PEOPLE ✳ GREAT EXPERIENCES ✳ GENUINE BELONGING ✳ ANTI-TRAUMA ✳</span>
          <span>GOOD PEOPLE ✳ GREAT EXPERIENCES ✳ GENUINE BELONGING ✳ ANTI-TRAUMA ✳</span>
        </div>
      </div>

      <section class="intro-section">
        <div class="container intro-grid">

          <div class="intro-aside">
            WE ARE NOT HERE<br>
            TO IMPRESS ANYONE.<br><br>
            WE ARE HERE TO<br>
            MAKE CONNECTION<br>
            FEEL HUMAN AGAIN.
          </div>

          <div class="intro-main">
            <div class="eyebrow">01 — THE IDEA</div>

            <h2>
              More than a club.<br>
              A place to <em>belong.</em>
            </h2>

            <p class="body-copy">
              We Social Club brings people together through
              experiences, conversations, laughter and shared
              moments. We believe that connection matters.
              That everyone deserves somewhere they can show up
              as themselves and feel welcome.
            </p>

            <a href="index.html?page=about" class="text-link">
              GET TO KNOW US ↗
            </a>
          </div>

        </div>
      </section>

      <section class="experience-section">
        <div class="container">

          <div class="section-top">
            <div>
              <div class="eyebrow">02 — WHAT WE DO</div>
              <h2 class="section-heading">Life happens<br><em>together.</em></h2>
            </div>

            <a href="index.html?page=experiences" class="text-link">
              EXPLORE EXPERIENCES ↗
            </a>
          </div>

          <div class="experience-grid">

            <article class="experience-card">
              <div class="number">01 / CONNECTION</div>
              <h3>Meet people.</h3>
              <p>
                Real conversations, new friendships and
                the kind of company that makes you want
                to stay a little longer.
              </p>
            </article>

            <article class="experience-card">
              <div class="number">02 / EXPERIENCES</div>
              <h3>Make memories.</h3>
              <p>
                Outdoor adventures, movie nights, games,
                gatherings and unexpected good days.
              </p>
            </article>

            <article class="experience-card">
              <div class="number">03 / BELONGING</div>
              <h3>Find your place.</h3>
              <p>
                A welcoming, no-judgment community where
                people can be themselves and feel included.
              </p>
            </article>

          </div>
        </div>
      </section>

      <section class="join-banner">
        <div class="container">
          <div class="eyebrow">03 — YOUR INVITATION</div>

          <h2>
            You don't have<br>
            to do life <em>alone.</em>
          </h2>

          <p>
            Come as you are. Meet good people.
            Experience something different.
            There is room for you here.
          </p>

          <a href="index.html?page=join" class="red-link">
            JOIN WE SOCIAL CLUB ↗
          </a>
        </div>
      </section>

    </div>
  `,


  about: `
    <div class="page">

      <section class="inner-hero">
        <div class="container">
          <div class="eyebrow">01 — OUR STORY</div>
          <h1>WE BELIEVE<br>IN <em>PEOPLE.</em></h1>
        </div>
      </section>

      <section class="inner-content">
        <div class="container content-grid">

          <div class="intro-aside">
            WHO WE ARE<br><br>
            WHY WE EXIST<br><br>
            WHAT WE BELIEVE
          </div>

          <div class="content-main">
            <h2>
              A little more human.<br>
              A little less <em>alone.</em>
            </h2>

            <p>
              We Social Club is a community built around
              connection, belonging and shared experiences.
              We bring people together in an environment
              where everyone can feel welcome.
            </p>

            <p>
              We recognise that stress, loneliness, anxiety
              and difficult experiences can make life feel
              heavier than it needs to. We believe genuine
              human connection can help make a difference.
            </p>

            <p>
              We are here for good people, great experiences
              and genuine belonging. We are here for the
              conversations, the laughter, the quiet moments
              and the memories that stay with us.
            </p>

            <a href="index.html?page=join" class="red-link">
              BE PART OF THE STORY ↗
            </a>
          </div>

        </div>
      </section>

    </div>
  `,


  community: `
    <div class="page">

      <section class="inner-hero">
        <div class="container">
          <div class="eyebrow">02 — THE PEOPLE</div>
          <h1>BETTER<br><em>TOGETHER.</em></h1>
        </div>
      </section>

      <section class="inner-content">
        <div class="container content-grid">

          <div class="intro-aside">
            EVERYONE IS WELCOME.<br><br>
            NO JUDGEMENT.<br><br>
            GENUINE BELONGING.
          </div>

          <div class="content-main">
            <h2>
              There is room<br>
              for <em>you here.</em>
            </h2>

            <p>
              Our community is made up of people from
              different backgrounds, with different stories,
              interests and experiences.
            </p>

            <p>
              You do not need to be the loudest person in
              the room. You do not need to have everything
              figured out. You simply need to be willing
              to connect.
            </p>

            <p>
              We create spaces where people can meet,
              talk, laugh, participate and build meaningful
              friendships without the pressure to pretend.
            </p>

            <h2>Our Sundays.</h2>

            <p>
              Our regular meetups are on Sundays, from
              3:30 PM until we are tired. Some gatherings
              also happen online, depending on the programme.
            </p>

            <a href="index.html?page=join" class="red-link">
              MEET THE COMMUNITY ↗
            </a>
          </div>

        </div>
      </section>

    </div>
  `,


  experiences: `
    <div class="page">

      <section class="inner-hero">
        <div class="container">
          <div class="eyebrow">03 — THE GOOD STUFF</div>
          <h1>MAKE<br><em>MEMORIES.</em></h1>
        </div>
      </section>

      <section class="inner-content">
        <div class="container">

          <div class="content-main">
            <h2>
              Not just another<br>
              day on the <em>calendar.</em>
            </h2>

            <p>
              We bring people together through experiences
              that create room for friendship, laughter,
              discovery and connection.
            </p>
          </div>

          <div class="experience-grid" style="margin-top:65px;">

            <article class="experience-card">
              <div class="number">01 / OUTDOORS</div>
              <h3>Outside together.</h3>
              <p>
                Outdoor hangouts, adventures and moments
                that remind us to step away from routine.
              </p>
            </article>

            <article class="experience-card">
              <div class="number">02 / ENTERTAINMENT</div>
              <h3>Movie nights.</h3>
              <p>
                Films, popcorn, comfortable spaces and
                good company.
              </p>
            </article>

            <article class="experience-card">
              <div class="number">03 / COMMUNITY</div>
              <h3>Club gatherings.</h3>
              <p>
                Games, conversations, celebrations and
                opportunities to meet new people.
              </p>
            </article>

          </div>

        </div>
      </section>

    </div>
  `,


  gallery: `
    <div class="page">

      <section class="inner-hero">
        <div class="container">
          <div class="eyebrow">04 — MOMENTS WE KEEP</div>
          <h1>THE GOOD<br><em>MEMORIES.</em></h1>
        </div>
      </section>

      <section class="inner-content">
        <div class="container">

          <div class="content-main" style="margin-bottom:45px;">
            <h2>
              A collection of<br>
              being <em>together.</em>
            </h2>

            <p>
              The people, the places, the laughter and
              the moments that make this community what it is.
            </p>
          </div>

          <div class="gallery-grid">

            <figure class="gallery-item">
              <img src="com1.jpeg" alt="We Social Club gathering">
              <figcaption>01 — The people</figcaption>
            </figure>

            <figure class="gallery-item">
              <img src="com2.jpeg" alt="We Social Club experience">
              <figcaption>02 — The moments</figcaption>
            </figure>

            <figure class="gallery-item">
              <img src="com3.jpeg" alt="We Social Club community">
              <figcaption>03 — The memories</figcaption>
            </figure>

          </div>

        </div>
      </section>

    </div>
  `,


  join: `
    <div class="page">

      <section class="inner-hero">
        <div class="container">
          <div class="eyebrow">05 — YOUR PLACE IN THE STORY</div>
          <h1>COME AS<br><em>YOU ARE.</em></h1>
        </div>
      </section>

      <section class="container join-layout">

        <div class="join-intro">
          <div class="eyebrow">JOIN THE COMMUNITY</div>

          <h2>
            Your people<br>
            are <em>out there.</em>
          </h2>

          <p>
            Tell us a little about yourself.
            We would love to get to know you.
            Membership is free, and everyone
            is welcome.
          </p>
        </div>

        <div class="form-panel">

          <div class="form-progress">
            <span id="stepLabel">STEP 01 OF 07</span>
            <span>YOUR INTRODUCTION</span>
          </div>

          <div class="progress-line">
            <div class="progress-fill" id="progressFill"></div>
          </div>

          <form id="membershipForm">

            <div class="form-step active">
              <h3>First things first.</h3>

              <label for="name">What should we call you?</label>
              <input id="name" name="name" type="text" required placeholder="Your full name">
            </div>

            <div class="form-step">
              <h3>A little about you.</h3>

              <label for="age">How old are you?</label>
              <input id="age" name="age" type="number" min="18" required placeholder="Your age">
            </div>

            <div class="form-step">
              <h3>Where are you based?</h3>

              <label for="location">Your location</label>
              <input id="location" name="location" type="text" required placeholder="Town / district">
            </div>

            <div class="form-step">
              <h3>Tell us your story.</h3>

              <label for="about">A little about yourself</label>
              <textarea id="about" name="about" required placeholder="Who are you? What should we know about you?"></textarea>
            </div>

            <div class="form-step">
              <h3>What are you into?</h3>

              <label for="interests">Your interests</label>
              <textarea id="interests" name="interests" required placeholder="Music, movies, travel, sports, conversations..."></textarea>
            </div>

            <div class="form-step">
              <h3>What do you bring?</h3>

              <label for="skills">Skills, talents or things you enjoy doing</label>
              <textarea id="skills" name="skills" placeholder="Anything you would love to share with the community"></textarea>
            </div>

            <div class="form-step">
              <h3>Let's stay connected.</h3>

              <label for="participation">How would you like to participate?</label>
              <select id="participation" name="participation" required>
                <option value="">Choose one</option>
                <option value="Physical meetups">Physical meetups</option>
                <option value="Online activities">Online activities</option>
                <option value="Both">Both</option>
              </select>

              <label for="whatsapp">WhatsApp number</label>
              <input id="whatsapp" name="whatsapp" type="tel" required placeholder="+256...">

              <label for="extra">Anything else? (Optional)</label>
              <textarea id="extra" name="extra" placeholder="Anything else you would like us to know?"></textarea>
            </div>

            <div class="form-buttons">
              <button type="button" class="back-button" id="backButton">
                ← BACK
              </button>

              <button type="button" class="next-button" id="nextButton">
                CONTINUE →
              </button>
            </div>

            <p class="form-message" id="formMessage"></p>

          </form>
        </div>

      </section>

    </div>
  `
};


/* LOAD PAGE */

function loadPage() {

  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("page") || "home";

  const page = pages[requestedPage] ? requestedPage : "home";

  app.innerHTML = pages[page];

  document.title = page === "home"
    ? "WE Social Club — Good People. Great Experiences."
    : page.charAt(0).toUpperCase() + page.slice(1) + " — WE Social Club";

  navigation.classList.remove("open");
  menuToggle.classList.remove("active");

  window.scrollTo(0, 0);

  if (page === "join") {
    setupMembershipForm();
  }
}

loadPage();


/* MEMBERSHIP FORM */

function setupMembershipForm() {

  const form = document.getElementById("membershipForm");

  if (!form) return;

  const steps = Array.from(form.querySelectorAll(".form-step"));
  const nextButton = document.getElementById("nextButton");
  const backButton = document.getElementById("backButton");
  const stepLabel = document.getElementById("stepLabel");
  const progressFill = document.getElementById("progressFill");
  const message = document.getElementById("formMessage");

  let currentStep = 0;

  function showStep(index) {

    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });

    currentStep = index;

    stepLabel.textContent =
      `STEP ${String(index + 1).padStart(2, "0")} OF 07`;

    progressFill.style.width =
      `${((index + 1) / steps.length) * 100}%`;

    backButton.style.visibility =
      index === 0 ? "hidden" : "visible";

    nextButton.textContent =
      index === steps.length - 1 ? "SUBMIT →" : "CONTINUE →";

    message.textContent = "";
  }

  function validateCurrentStep() {

    const inputs = steps[currentStep].querySelectorAll(
      "input[required], textarea[required], select[required]"
    );

    for (const input of inputs) {

      if (!input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }

    return true;
  }

  nextButton.addEventListener("click", async () => {

    if (!validateCurrentStep()) return;

    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
      return;
    }

    nextButton.disabled = true;
    nextButton.textContent = "SENDING...";

    const formData = new FormData(form);
    const data = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      data.append(key, value);
    }

    try {

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: data
      });

      form.innerHTML = `
        <h3>You're one of us now.</h3>
        <p class="body-copy">
          Thank you for reaching out to WE Social Club.
          We look forward to connecting with you.
        </p>
      `;

    } catch (error) {

      message.textContent =
        "Something went wrong. Please check your connection and try again.";

      nextButton.disabled = false;
      nextButton.textContent = "TRY AGAIN →";
    }

  });

  backButton.addEventListener("click", () => {

    if (currentStep > 0) {
      showStep(currentStep - 1);
    }

  });

  showStep(0);
}
