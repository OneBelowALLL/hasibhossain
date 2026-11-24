$(function () {

  // Light / dark theme toggle. The choice is saved across all portfolio pages.
  const themeButton = document.getElementById("theme-toggle");
  const themeIcon = themeButton ? themeButton.querySelector(".theme-icon") : null;
  const themeLabel = themeButton ? themeButton.querySelector(".theme-label") : null;

  function setPortfolioTheme(theme, saveChoice) {
    const selectedTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", selectedTheme);
    if (saveChoice) {
      try { localStorage.setItem("portfolio-theme", selectedTheme); } catch (error) {}
    }
    if (themeButton) {
      const nextTheme = selectedTheme === "dark" ? "light" : "dark";
      themeButton.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
      themeButton.setAttribute("title", "Switch to " + nextTheme + " theme");
      if (themeIcon) themeIcon.textContent = selectedTheme === "dark" ? "☀" : "☾";
      if (themeLabel) themeLabel.textContent = selectedTheme === "dark" ? "Light" : "Dark";
    }
  }

  let initialTheme = document.documentElement.getAttribute("data-theme") || "light";
  try {
    const storedTheme = localStorage.getItem("portfolio-theme");
    if (storedTheme === "dark" || storedTheme === "light") initialTheme = storedTheme;
  } catch (error) {}
  setPortfolioTheme(initialTheme, false);

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setPortfolioTheme(currentTheme === "dark" ? "light" : "dark", true);
    });
  }

  // Highlight the current page in the navigation.
  const currentPage = $("body").data("page");
  $('.main-nav a').each(function () {
    if ($(this).data("nav") === currentPage) $(this).addClass("active");
  });

  // Mobile navigation menu.
  $(".menu-toggle").on("click", function () {
    const isOpen = $(".main-nav").hasClass("open");
    $(".main-nav").toggleClass("open");
    $(this).attr("aria-expanded", String(!isOpen)).text(isOpen ? "☰" : "✕");
  });
  $(".main-nav a").on("click", function () {
    $(".main-nav").removeClass("open");
    $(".menu-toggle").attr("aria-expanded", "false").text("☰");
  });


  // Optional profile photos on the Home and About pages.
  document.querySelectorAll(".profile-photo-frame").forEach(function (frame) {
    const profilePhoto = frame.querySelector(".profile-photo");
    const photoFallback = frame.querySelector(".photo-fallback");
    if (!profilePhoto || !photoFallback) return;

    function showPhoto() {
      profilePhoto.classList.add("is-loaded");
      profilePhoto.hidden = false;
      photoFallback.hidden = true;
    }
    function showFallback() {
      profilePhoto.hidden = true;
      photoFallback.hidden = false;
    }

    profilePhoto.addEventListener("load", showPhoto);
    profilePhoto.addEventListener("error", showFallback);

    if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
      showPhoto();
    }
  });

  // Automatically update the copyright year.
  $(".current-year").text(new Date().getFullYear());

  // Demonstration contact form: client-side validation only.
  $("#contact-form").on("submit", function (event) {
    event.preventDefault();
    const name = $("#visitor-name").val().trim();
    const email = $("#visitor-email").val().trim();
    const message = $("#visitor-message").val().trim();
    const feedback = $("#form-feedback");

    if (!name || !email || !message) {
      feedback.removeClass("success").addClass("error")
        .text("Please complete all fields before continuing.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedback.removeClass("success").addClass("error")
        .text("Please enter a valid email address.");
      return;
    }
    feedback.removeClass("error").addClass("success")
      .text("Validation successful. This demonstration form does not send messages yet.");
    this.reset();
  });
});
