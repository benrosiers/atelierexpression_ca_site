import "../styles/main.scss";

const form = document.querySelector("[data-waitlist-form]");
const message = document.querySelector("[data-form-message]");

if (form && message) {
  form.addEventListener("submit", async (event) => {
    const endpoint = form.getAttribute("action") || "";

    if (endpoint.includes("TON_ID_FORMSPREE")) {
      event.preventDefault();
      message.textContent =
        "Mode démo: remplace TON_ID_FORMSPREE par ton vrai endpoint pour recevoir les courriels.";
      message.classList.add("is-warning");
      return;
    }

    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);

    submitButton.disabled = true;
    submitButton.textContent = "Envoi...";
    message.textContent = "";
    message.classList.remove("is-error", "is-success", "is-warning");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Erreur d’inscription");
      }

      form.reset();
      message.textContent = "C’est fait. On vous tient au courant bientôt.";
      message.classList.add("is-success");
    } catch (error) {
      message.textContent =
        "L’inscription n’a pas fonctionné. Réessayez dans un instant.";
      message.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Me prévenir";
    }
  });
}
