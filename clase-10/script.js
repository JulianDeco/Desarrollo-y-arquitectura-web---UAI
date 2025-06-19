function enviar_datos(data){
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: data
  }) 
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(data_http => {
    console.log(data_http);
    alert("Datos del formulario:\n" + JSON.stringify(data));
  })
  .catch(error => {
    alert('Error durante petición HTTP:', error);
  });
}

var form = document.getElementsByClassName('subscription-form')[0];



function btnForm(event) {
  event.preventDefault();

  var formData = new FormData(form);
  var entries = formData.entries();
  var data = {};
  var entry;
  while (!(entry = entries.next()).done) {
    data[entry.value[0]] = entry.value[1];
  }

  var errors = validateAllInputs(data);

  if (errors.length > 0) {
    alert("Errores:\n" + errors.join("\n"));
  } else {
    enviar_datos(data)
  }
}

form.addEventListener("submit", btnForm);

var inputs = form.querySelectorAll("input");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("blur", function () {
    validateInput(this);
  });
  inputs[i].addEventListener("focus", function () {
    clearError(this);
  });
}

function validateAllInputs(data) {
  var errors = [];
  for (var i = 0; i < inputs.length; i++) {
    var error = validateInput(inputs[i]);
    if (error) errors.push(error);
  }
  return errors;
}

function validateInput(input) {
  var id = input.id;
  var value = input.value.trim();
  var error = "";

  switch (id) {
    case "fullname":
      if (value.length < 7 || value.indexOf(" ") === -1) {
        error = "Nombre completo debe tener al menos 7 letras y un espacio.";
      }
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Email inválido.";
      }
      break;
    case "password":
      if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        error = "Contraseña debe tener al menos 8 caracteres, letras y números.";
      }
      break;
    case "password_2":
      var pass = document.getElementById("password").value;
      if (value !== pass) {
        error = "Las contraseñas no coinciden.";
      }
      break;
    case "age":
      if (!/^\d+$/.test(value) || parseInt(value, 10) < 18) {
        error = "Edad debe ser un número mayor o igual a 18.";
      }
      break;
    case "phone":
      if (!/^\d{7,}$/.test(value)) {
        error = "Teléfono debe tener al menos 7 dígitos, sin símbolos.";
      }
      break;
    case "address":
      if (value.length < 5 || !/\d/.test(value) || !/[a-zA-Z]/.test(value) || value.indexOf(" ") === -1) {
        error = "Dirección inválida. Debe tener letras, números y un espacio.";
      }
      break;
    case "city":
      if (value.length < 3) {
        error = "Ciudad debe tener al menos 3 caracteres.";
      }
      break;
    case "zipcode":
      if (value.length < 3) {
        error = "Código Postal debe tener al menos 3 caracteres.";
      }
      break;
    case "dni":
      if (!/^\d{7,8}$/.test(value)) {
        error = "DNI debe tener 7 u 8 dígitos.";
      }
      break;
  }

  showError(input, error);
  return error;
}

function showError(input, message) {
  var errorEl = input.parentNode.querySelector(".error-message");
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.className = "error-message";
    errorEl.style.color = "red";
    input.parentNode.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearError(input) {
  var errorEl = input.parentNode.querySelector(".error-message");
  if (errorEl) errorEl.textContent = "";
}
