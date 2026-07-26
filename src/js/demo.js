import "../styles/demo.scss";
import { demoEvent } from "./demo-event.js";
import { initParallax } from "./parallax.js";

initParallax();

function fillField(name, value) {
  document.querySelectorAll(`[data-field="${name}"]`).forEach((el) => {
    el.textContent = value;
  });
}

fillField("date", demoEvent.date);
fillField("time", demoEvent.time);
fillField("duration", demoEvent.duration);
fillField("venue", demoEvent.venue);
fillField("city", demoEvent.city);
fillField("price", demoEvent.price);

if (demoEvent.capacity !== null && demoEvent.capacity !== undefined) {
  const capacityRow = document.querySelector('[data-row="capacity"]');
  if (capacityRow) {
    capacityRow.hidden = false;
    fillField("capacity", `${demoEvent.capacity} places`);
  }
}

const filmingNotice = document.querySelector('[data-field="filming-notice"]');
if (filmingNotice) {
  filmingNotice.hidden = !demoEvent.filmingNotice;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function wireCta(name, url, { fallbackNoteSelector, disabledMessage } = {}) {
  const links = document.querySelectorAll(`[data-cta="${name}"]`);
  const note = fallbackNoteSelector ? document.querySelector(fallbackNoteSelector) : null;

  links.forEach((link) => {
    if (url) {
      link.href = isEmail(url) ? `mailto:${url}` : url;
      link.removeAttribute("aria-disabled");
      link.removeAttribute("title");
    } else {
      link.href = "#";
      link.setAttribute("aria-disabled", "true");
      if (disabledMessage) link.title = disabledMessage;
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });

  if (note) {
    if (url) {
      note.hidden = true;
    } else {
      note.hidden = false;
      note.textContent = "Lien d'inscription à venir — reviens bientôt ou pose ta question ci-dessous.";
    }
  }
}

wireCta("register", demoEvent.registrationUrl, {
  fallbackNoteSelector: '[data-field="registration-note"]',
  disabledMessage: "Lien d'inscription à venir"
});

wireCta("contact", demoEvent.contactUrl, {
  disabledMessage: "Lien de contact à venir"
});
