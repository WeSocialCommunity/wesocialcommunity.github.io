document.addEventListener("DOMContentLoaded", function () {

    // MOBILE MENU
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    // VIDEO SETUP
    document.querySelectorAll(".loop-video").forEach(video => {

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        const container = video.parentElement;
        const placeholder = container.querySelector(".video-placeholder");

        video.addEventListener("loadeddata", function () {

            if (placeholder) {
                placeholder.style.display = "none";
            }

        });

        video.addEventListener("error", function () {

            if (placeholder) {
                placeholder.style.display = "flex";
            }

        });

        video.play().catch(() => {
            // Autoplay may require interaction on some browsers.
        });

    });


    // SOUND BUTTONS
    document.querySelectorAll(".sound-toggle").forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const video = button.parentElement.querySelector("video");

            if (!video) return;

            video.muted = !video.muted;

            button.textContent = video.muted ? "SOUND OFF" : "SOUND ON";

        });

    });


    // PAUSE VIDEOS WHEN OFF SCREEN
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                const video = entry.target;

                if (entry.isIntersecting) {

                    video.play().catch(() => {});

                } else {

                    video.pause();

                }

            });

        }, {
            threshold: 0.15
        });

        document.querySelectorAll(".loop-video").forEach(video => {
            observer.observe(video);
        });

    }


    // FOOTER YEAR
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
