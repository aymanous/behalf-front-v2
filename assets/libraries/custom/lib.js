(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Get the forms we want to add validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

$(function () {
  $(".confirm-close").click(function (e) {
    e.preventDefault();
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir quitter cette page ? Veuillez vous assurer d'avoir correctement enregistré vos modifications avant de changer de page."
      )
    ) {
      location.href = this.href;
    }
  });
});

function isFormValid(formSelector) {
  var result = true;
  $(formSelector).validator("validate");
  $(formSelector + " .form-group").each(function () {
    if ($(this).hasClass("has-error")) {
      result = false;
      return false;
    }
  });
  return result;
}

function redirect(url) {
  window.location.replace(url);
}

function qp(attribute) {
  var results = new RegExp("[?&]" + attribute + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
}

function getCurrentTime() {
  var timeNow = new Date();
  var hours = timeNow.getHours();
  var minutes = timeNow.getMinutes();
  var seconds = timeNow.getSeconds();
  var timeString = hours;
  timeString += (minutes < 10 ? ":0" : ":") + minutes;
  timeString += (seconds < 10 ? ":0" : ":") + seconds;
  return timeString;
}

function CSVToJSON(str) {
  let obj = {
    headers: [],
    values: [],
  };
  let delimiter = ";";
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  obj.headers = headers;

  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  obj.values = rows.map((row) => {
    const values = row.split(delimiter);
    return headers.reduce(
      (object, curr, i) => ((object[curr] = parseFloat(values[i])), object),
      {}
    );
  });

  return obj;
}
