/* =========================================
   WE SOCIAL CLUB — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // MOBILE NAVIGATION
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("open");

      const isOpen = navigation.classList.contains("open");

      menuButton.setAttribute("aria-expanded", isOpen);
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }


  // VIDEO AUTOPLAY AND LOOPING
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

    video.play().catch(function () {
      // Some browsers require user interaction before playback.
    });
  });


  // VIDEO SOUND CONTROLS
  const soundButtons = document.querySelectorAll(".sound-toggle");

  soundButtons.forEach(function (button) {

    button.textContent = "Sound on";

    button.addEventListener("click", function () {

      const container = button.parentElement;
      const video = container.querySelector("video");

      if (!video) return;

      if (video.muted) {
        video.muted = false;
        button.textContent = "Mute sound";
      } else {
        video.muted = true;
        button.textContent = "Sound on";
      }

      video.play().catch(function () {
        video.muted = true;
        button.textContent = "Sound on";
      });

    });

  });


  // PAUSE VIDEOS WHEN THEY ARE OFF SCREEN
  const videoObserver = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  videos.forEach(function (video) {
    videoObserver.observe(video);
  });


  // AUTOMATIC COPYRIGHT YEAR
  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


});
