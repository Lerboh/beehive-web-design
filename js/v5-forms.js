/* Prototype forms only. Nothing is stored or sent. */
(function () {
  var forms = document.querySelectorAll("[data-prototype-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector("[data-prototype-note]");
      if (!note) return;
      note.hidden = false;
      note.focus();
    });
  });
}());
