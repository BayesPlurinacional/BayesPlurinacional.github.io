document.addEventListener("DOMContentLoaded", function () {
  let lang = navigator.language || navigator.userLanguage;
  let headerFile = lang.startsWith("es") ? "/NEW components/header_es.html" : "/NEW components/header_en.html";

  fetch(headerFile)
      .then(response => response.text())
      .then(data => {
          document.body.insertAdjacentHTML("afterbegin", data);
      });
});
