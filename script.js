(function () {
  "use strict";

  const config = window.GRIMORIO_CONFIG || {};
  const prices = {
    latam: "US$ 7,90",
    mx: "MX$ 149",
    co: "COP $29.900",
    pe: "S/ 29,90",
    cl: "CLP $6.990"
  };

  const countrySelects = Array.from(document.querySelectorAll(".js-country"));
  const priceElements = Array.from(document.querySelectorAll("[data-price]"));
  const checkoutButtons = Array.from(document.querySelectorAll(".js-checkout"));
  const toast = document.querySelector(".toast");
  let currentCountry = localStorage.getItem("grimorio-country") || detectCountry();

  if (!prices[currentCountry]) currentCountry = "latam";

  function detectCountry() {
    const locale = (navigator.language || "").toLowerCase();
    if (locale.includes("mx")) return "mx";
    if (locale.includes("co")) return "co";
    if (locale.includes("pe")) return "pe";
    if (locale.includes("cl")) return "cl";
    return "latam";
  }

  function updateCountry(country) {
    currentCountry = prices[country] ? country : "latam";
    localStorage.setItem("grimorio-country", currentCountry);
    countrySelects.forEach((select) => {
      select.value = currentCountry;
    });
    priceElements.forEach((element) => {
      element.textContent = prices[currentCountry];
    });
  }

  function checkoutUrl() {
    const countryUrls = config.checkoutByCountry || {};
    return countryUrls[currentCountry] || config.checkoutDefault || "";
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => {
      toast.hidden = true;
    }, 5200);
  }

  function track(eventName, extra) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, country: currentCountry, ...extra });
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, { country: currentCountry, ...extra });
    }
  }

  countrySelects.forEach((select) => {
    select.addEventListener("change", (event) => {
      updateCountry(event.target.value);
      track("CountrySelected", { price: prices[currentCountry] });
    });
  });

  checkoutButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const url = checkoutUrl();
      track("InitiateCheckout", { price: prices[currentCountry] });

      if (!url) {
        event.preventDefault();
        document.querySelector("#oferta")?.scrollIntoView({ behavior: "smooth" });
        showToast("La página está lista. Falta conectar el enlace del checkout LATAM antes del lanzamiento.");
        return;
      }

      button.href = url;
    });
  });

  document.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) track("FaqOpened", { question: detail.querySelector("summary")?.textContent || "" });
    });
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const supportLink = document.querySelector("[data-support]");
  if (supportLink && config.supportEmail) {
    supportLink.href = `mailto:${config.supportEmail}`;
    supportLink.hidden = false;
  }

  function loadMetaPixel(pixelId) {
    if (!pixelId || window.fbq) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }

  updateCountry(currentCountry);
  loadMetaPixel(config.metaPixelId);
})();
