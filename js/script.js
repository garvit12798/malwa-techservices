/* ==========================================================================
   Malwa-Tec Services — site script
   Vanilla JS. No dependencies. Covers: sticky header, mobile menu, active
   nav state, scroll reveal, FAQ accordion, gallery filter + lightbox,
   enquiry form (validation + Formspree-ready submit), service query param,
   back-to-top, escape-to-close.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
    var btt = document.querySelector(".back-to-top");
    if (btt) btt.classList.toggle("show", window.scrollY > 500);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var hamburger = document.querySelector(".hamburger");
  var mobilePanel = document.querySelector(".mobile-panel");
  var scrim = document.querySelector(".scrim");

  function openMenu() {
    if (!mobilePanel) return;
    mobilePanel.classList.add("open");
    scrim.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!mobilePanel) return;
    mobilePanel.classList.remove("open");
    scrim.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      var isOpen = mobilePanel.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });
  }
  if (scrim) scrim.addEventListener("click", closeMenu);
  var mpClose = document.querySelector(".mp-close");
  if (mpClose) mpClose.addEventListener("click", closeMenu);

  /* ---------- Active nav link ---------- */
  (function setActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-panel a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      var hrefFile = href.split("?")[0];
      if (hrefFile === path || (path === "" && hrefFile === "index.html")) {
        a.classList.add("active");
      }
    });
  })();

  /* ---------- Escape closes menu / lightbox / modals ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
      closeLightbox();
    }
  });

  /* ---------- Back to top ---------- */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";
      // close siblings within the same list
      var list = item.closest(".faq-list");
      if (list) {
        list.querySelectorAll(".faq-item").forEach(function (sib) {
          if (sib !== item) {
            sib.setAttribute("data-open", "false");
            sib.querySelector(".faq-a").style.maxHeight = null;
            sib.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          }
        });
      }
      item.setAttribute("data-open", isOpen ? "false" : "true");
      q.setAttribute("aria-expanded", isOpen ? "false" : "true");
      a.style.maxHeight = isOpen ? null : a.scrollHeight + "px";
    });
  });

  /* ---------- Gallery filter ---------- */
  var gfilters = document.querySelectorAll(".gfilter");
  var gitems = document.querySelectorAll(".gitem");
  if (gfilters.length) {
    gfilters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        gfilters.forEach(function (b) {
          b.setAttribute("aria-pressed", "false");
        });
        btn.setAttribute("aria-pressed", "true");
        var cat = btn.getAttribute("data-filter");
        gitems.forEach(function (item) {
          var match = cat === "all" || item.getAttribute("data-category") === cat;
          item.hidden = !match;
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  var lbImg = document.querySelector(".lightbox img");
  var lbCap = document.querySelector(".lightbox-cap");
  var galleryList = Array.prototype.slice.call(gitems);
  var currentIndex = 0;

  function visibleGallery() {
    return galleryList.filter(function (i) {
      return !i.hidden;
    });
  }

  function openLightbox(index) {
    if (!lightbox) return;
    var list = visibleGallery();
    if (!list.length) return;
    currentIndex = index;
    var item = list[currentIndex];
    var img = item.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  function stepLightbox(dir) {
    var list = visibleGallery();
    if (!list.length) return;
    currentIndex = (currentIndex + dir + list.length) % list.length;
    var img = list[currentIndex].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
  }

  gitems.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      var list = visibleGallery();
      var realIdx = list.indexOf(item);
      openLightbox(realIdx);
    });
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });
  var lbClose = document.querySelector(".lightbox-close");
  var lbPrev = document.querySelector(".lightbox-prev");
  var lbNext = document.querySelector(".lightbox-next");
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", function () { stepLightbox(-1); });
  if (lbNext) lbNext.addEventListener("click", function () { stepLightbox(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
  });

  /* ---------- Service pre-select via query param (contact.html) ---------- */
  (function preselectService() {
    var select = document.querySelector("#service");
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var service = params.get("service");
    var property = params.get("property");
    if (service) {
      var opt = select.querySelector('option[value="' + service + '"]');
      if (opt) {
        select.value = service;
        var banner = document.querySelector("#service-preselect-note");
        if (banner) {
          banner.hidden = false;
          banner.textContent = "Pre-selected service: " + opt.textContent;
        }
      }
    }
    if (property) {
      var radio = document.querySelector('input[name="propertyType"][value="' + property + '"]');
      if (radio) radio.checked = true;
    }
  })();

  /* ---------- Enquiry form ---------- */
  var form = document.querySelector("#enquiry-form");
  if (form) {
    var statusBox = document.querySelector("#form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    function setError(field, message) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      wrap.classList.toggle("has-error", !!message);
      var msg = wrap.querySelector(".error-msg");
      if (msg) msg.textContent = message || "";
    }

    function validate() {
      var valid = true;
      var name = form.querySelector("#fullName");
      var phone = form.querySelector("#phone");
      var service = form.querySelector("#service");
      var property = form.querySelector('input[name="propertyType"]:checked');
      var message = form.querySelector("#message");

      if (!name.value.trim()) {
        setError(name, "Please enter your name.");
        valid = false;
      } else setError(name, "");

      var phoneClean = phone.value.trim();
      if (!phoneClean || !/^[+]?[\d\s-]{8,15}$/.test(phoneClean)) {
        setError(phone, "Please enter a valid phone number.");
        valid = false;
      } else setError(phone, "");

      if (!service.value) {
        setError(service, "Please select a service.");
        valid = false;
      } else setError(service, "");

      if (!property) {
        var pWrap = form.querySelector("#propertyTypeGroup");
        if (pWrap) {
          var pMsg = pWrap.querySelector(".error-msg");
          if (pMsg) pMsg.textContent = "Please choose a property type.";
        }
        valid = false;
      } else {
        var pWrap2 = form.querySelector("#propertyTypeGroup");
        if (pWrap2) {
          var pMsg2 = pWrap2.querySelector(".error-msg");
          if (pMsg2) pMsg2.textContent = "";
        }
      }

      if (!message.value.trim()) {
        setError(message, "Please describe your pest control requirement.");
        valid = false;
      } else setError(message, "");

      return valid;
    }

    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("blur", function () {
        validate();
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return; // prevent double submit
      if (!validate()) {
        statusBox.className = "form-status show error";
        statusBox.textContent = "Please fix the highlighted fields and try again.";
        return;
      }

      var endpoint = form.getAttribute("action");
      var placeholderEndpoint = !endpoint || endpoint.indexOf("YOUR_FORM_ENDPOINT_HERE") !== -1;

      submitBtn.disabled = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending...";

      if (placeholderEndpoint) {
        // No live endpoint configured yet — be honest about it, do not claim success.
        statusBox.className = "form-status show error";
        statusBox.innerHTML =
          "This form is not yet connected to an email service. Please call <a href='tel:+919893264066'>+91 98932 64066</a> or WhatsApp us directly, or see README.md to connect a form endpoint.";
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        return;
      }

      var formData = new FormData(form);
      fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            statusBox.className = "form-status show success";
            statusBox.textContent = "Thank you. Your enquiry has been sent — our team will contact you shortly.";
            form.reset();
          } else {
            return response.json().then(function (data) {
              throw new Error((data && data.error) || "Submission failed.");
            });
          }
        })
        .catch(function () {
          statusBox.className = "form-status show error";
          statusBox.innerHTML =
            "Something went wrong sending your enquiry. Please call <a href='tel:+919893264066'>+91 98932 64066</a> or WhatsApp us instead.";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll(".cur-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
