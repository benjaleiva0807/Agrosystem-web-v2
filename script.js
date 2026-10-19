const elLuz = document.getElementById("luz");
const elRiego = document.getElementById("riego");
const elTemp = document.getElementById("temp");
const elHumedad = document.getElementById("humedad");

let temperatura = 22.4;
let humedad = 68;
let regando = true;
let minutosRiego = 12;

const HUMEDAD_MIN = 60; 
const HUMEDAD_MAX = 75; 

function aleatorio(min, max) {
  return Math.random() * (max - min) + min;
}

function simular() {
  temperatura += aleatorio(-0.4, 0.4);
  temperatura = Math.min(26, Math.max(20, temperatura));

  if (regando) {
    humedad += aleatorio(1, 3);
    minutosRiego += 1;
  } else {
    humedad -= aleatorio(0.5, 1.5);
  }

  if (regando && humedad >= HUMEDAD_MAX) {
    regando = false;
  } else if (!regando && humedad <= HUMEDAD_MIN) {
    regando = true;
    minutosRiego = 0;
  }

  elTemp.textContent = temperatura.toFixed(1);
  elHumedad.textContent = Math.round(humedad);
  elLuz.textContent = Math.round(aleatorio(295, 305));
  elRiego.textContent = regando ? "Activo · " + minutosRiego + " min" : "Inactivo";
}

setInterval(simular, 1500);

const formulario = document.getElementById("form-contacto");

function mostrarError(campo, texto) {
  document.getElementById("error-" + campo).textContent = texto;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  let valido = true;

  mostrarError("nombre", "");
  mostrarError("email", "");
  mostrarError("mensaje", "");
  document.getElementById("resultado-form").textContent = "";

  if (nombre.length < 3) {
    mostrarError("nombre", "Escribe tu nombre (mínimo 3 letras).");
    valido = false;
  }

  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronEmail.test(email)) {
    mostrarError("email", "Escribe un correo válido, por ejemplo nombre@correo.com.");
    valido = false;
  }

  if (mensaje.length < 10) {
    mostrarError("mensaje", "Cuéntanos un poco más (mínimo 10 caracteres).");
    valido = false;
  }

  if (valido) {
    document.getElementById("resultado-form").textContent =
      "¡Gracias, " + nombre + "! Recibimos tu solicitud (solo demostración: no se envió ningún dato).";
    formulario.reset();
  }
});