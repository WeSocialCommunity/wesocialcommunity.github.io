/* =====================================================
   WE SOCIAL CLUB — WEBSITE ENGINE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  // MOBILE NAVIGATION
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

      navigation.classList.toggle("open");

      const open = navigation.classList.contains("open");

      menuButton.setAttribute("aria-expanded", open);
      menuButton.classList.toggle("is-open", open);

      if (!menuButton.querySelector("span")) {
        menuButton.textContent = open ? "✕" : "☰";
      }

    });

    navigation.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.classList.remove("is-open");
      });

    });

  }

  // VIDEO PLAYBACK
  const videos = document.querySelectorAll("video");

  videos.forEach(function (video) {

    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;

    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");

    const wrapper = video.parentElement;

    const placeholder = wrapper
      ? wrapper.querySelector(".video-placeholder")
      : null;

    function videoReady() {
      if (placeholder) {
        placeholder.classList.add("is-hidden");
      }
    }

    function videoFailed() {
      if (placeholder) {
        placeholder.classList.remove("is-hidden");
        placeholder.textContent = "THIS VIDEO COULD NOT LOAD";
      }
    }

    video.addEventListener("loadeddata", videoReady);
    video.addEventListener("canplay", videoReady);
    video.addEventListener("error", videoFailed);

    if (video.readyState >= 2) {
      videoReady();
    }

    video.play().catch(function () {
      // Some browsers require user interaction.
    });

  });

  // SOUND CONTROLS
  document.querySelectorAll(".sound-toggle").forEach(function (button) {

    const container = button.closest(
      ".hero-video-frame, .feature-video, .movie-image, .community-card, .community-feature-video, .experience-card, .gallery-item"
    ) || button.parentElement;

    const video = container.querySelector("video");

    if (!video) return;

    function updateSoundLabel() {
      button.textContent = video.muted ? "SOUND ON" : "SOUND OFF";
    }

    updateSoundLabel();

    button.addEventListener("click", function (event) {

      event.preventDefault();

      video.muted = !video.muted;

      updateSoundLabel();

      video.play().catch(function () {});

    });

  });

  // PLAY VIDEOS WHEN VISIBLE
  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }

      });

    }, {
      threshold: 0.15
    });

    videos.forEach(function (video) {
      observer.observe(video);
    });

  }

  // SMOOTH PAGE TRANSITIONS
  document.querySelectorAll("a[href]").forEach(function (link) {

    link.addEventListener("click", function (event) {

      const destination = link.getAttribute("href");

      if (
        !destination ||
        destination.startsWith("#") ||
        destination.startsWith("http") ||
        destination.startsWith("mailto:") ||
        destination.startsWith("tel:") ||
        link.target === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      document.body.classList.add("page-leaving");

      setTimeout(function () {
        window.location.href = destination;
      }, 220);

    });

  });

  // COPYRIGHT YEAR
  document.querySelectorAll("#year, .current-year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

});
