import "../styles/main.scss";

const SIGNUP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwiTjr_vB7Q1Y8YUpLCCJBqSoPjQYEE_RnbbQIiOn5ooV55bKgzhBXlDg9I_m8ppG6QXA/exec";

const form = document.querySelector(".signup");
const emailInput = form?.querySelector('input[type="email"], input[name="email"]');
const button = form?.querySelector("button");

function setMessage(text, type = "neutral") {
  let message = form.querySelector("[data-signup-message]");

  if (!message) {
    message = document.createElement("p");
    message.setAttribute("data-signup-message", "");
    message.className = "signup__message";
    form.appendChild(message);
  }

  message.textContent = text;
  message.dataset.type = type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form && emailInput && button) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    if (!isValidEmail(email)) {
      setMessage("Entrez une adresse courriel valide.", "error");
      emailInput.focus();
      return;
    }

    button.disabled = true;
    button.textContent = "Envoi...";

    try {
      const body = new URLSearchParams();
      body.set("email", email);
      body.set("source", "atelierexpression.ca");
      body.set("ua", navigator.userAgent);
      body.set("website", "");

      await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      emailInput.value = "";
      setMessage("Merci! On vous tiendra au courant des prochaines dates.", "success");
    } catch (error) {
      setMessage("Oups. Réessayez dans un moment.", "error");
    } finally {
      button.disabled = false;
      button.textContent = "Me prévenir";
    }
  });
}

