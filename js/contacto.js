//Comienzo formulario de contacto
//variables
let nombreForm = document.querySelector("#nombre");
let apellidoForm = document.querySelector("#apellido");
let correoForm = document.querySelector("#correo");
let mensajeForm = document.querySelector("#mensaje");
let formulario = document.querySelector("#formulario");
let info = document.querySelector("#respuesta");

const mostrarInfo = formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  info.innerHTML = `
  <div class="alert alert-secondary" role="alert">
  <p>Gracias ${nombreForm.value} ${apellidoForm.value} por tu mensaje.
  Se respondera a ${correoForm.value} y tu mensaje
  (${mensajeForm.value})
  sera tenido en cuenta </p>
</div>
  `;
});
