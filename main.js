// -------- SCROLL TO SECTION --------
function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:"smooth"});
}

// load & init EmailJS
(function(){
  if (typeof emailjs === "undefined") {
    console.error("EmailJS no está cargado. Verifica la inclusión del script.");
    return;
  }
  emailjs.init("UbEbX9GcZw5W1_T1Z"); // Public key
})();

document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if(!form){
    console.warn("No se encontró #contact-form en el DOM.");
    return;
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    status.textContent = "Enviando mensaje...";
    const submitBtn = form.querySelector(".submit");
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Enviar usando sendForm (usa los names del formulario)
    emailjs.sendForm("service_w779q0c", "template_2up3d5t", this)
      .then(function(){
        status.textContent = "✅ ¡Mensaje enviado con éxito!";
        form.reset();
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }, function(err){
        console.error("EmailJS error:", err);
        status.textContent = "❌ Ocurrió un error. Intenta nuevamente.";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      });
  });
});
