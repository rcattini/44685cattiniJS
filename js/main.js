//Productos

//aray vacio para carrito
let articulosCarrito = [];

//Tarjetas de camisetas
const cards = document.querySelectorAll(".card");

//Funcion para ver productos en carrito
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    verDatosProductos(e.target.parentElement);
  });
});
function verDatosProductos(producto) {
  const infoProductos = {
    titulo: producto.querySelector(".card-title").textContent,
    id: producto.querySelector(".btn").getAttribute("data-id"),
  };
  articulosCarrito = [...articulosCarrito, infoProductos];
  console.log(articulosCarrito);
  carritoHTML();

  confirmarCompra();
}
const carrito = document.querySelector("#carrito");

//funcion para llenar carrito
function carritoHTML() {
  limpiarHTML();
  articulosCarrito.forEach((producto) => {
    const row = document.createElement("p");
    row.innerHTML = `<div class="container">
    <p>${producto.titulo}</p>
    <button class= "btn btn-danger" id="${producto.id}">Eliminar</button>
    </div>
    `;
    carrito.appendChild(row);
  });
}

function limpiarHTML() {
  carrito.innerHTML = "";
}

carrito.addEventListener("click", eliminarCompra);

//Funcion para eliminar articulos del carrito
function eliminarCompra(e) {
  if (e.target.classList.contains("btn-danger")) {
    let productoID = e.target.getAttribute("id");
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoID
    );
    carritoHTML();
  }
}

//Funcion para confirmar compras de carrito enviando una copia a una nueva array 
function confirmarCompra() {
  const conf = document.createElement("p");
  conf.innerHTML = `<button class= "btn btn-light compra" >Confirmar</button>`;
  carrito.appendChild(conf);
}
let compraConfirmada = [];
carrito.addEventListener("click", confirCompra);
function confirCompra(e) {
  if (e.target.classList.contains("btn-light")) {
    compraConfirmada = articulosCarrito.slice();
  }
}


//Base de datos para para logear usuarios 

const usuarios = [
  {
    mail: "juan@mail.com",
    pass: "1234",
  },
  {
    mail: "pedro@mail.com",
    pass: "1234",
  },
  {
    mail: "maria@mail.com",
    pass: "1234",
  },
];

//Ingresar usuario pre cargados
const mailLogin = document.getElementById("emailLogin"),
  passLogin = document.getElementById("passwordLogin"),
  recordar = document.getElementById("recordarme"),
  btnLogin = document.getElementById("login"),
  modalEl = document.getElementById("modalLogin"),
  modal = new bootstrap.Modal(modalEl);

//Guardamos los datos que recuperamos de la database en el storage
function guardarDatos(usuarioDB, storage) {
  const usuario = {
    user: usuarioDB.mail,
    pass: usuarioDB.pass,
  };

  storage.setItem("usuario", JSON.stringify(usuario));
}

//quitar los storages
function borrarDatos() {
  localStorage.clear();
  sessionStorage.clear();
}

//Traer los datos que se guardaron y los retorno
function traerUsuario(storage) {
  let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
  return usuarioEnStorage;
}



function validarUsuario(usersDB, user, pass) {
  let encontrado = usersDB.find((userDB) => userDB.mail == user);

  if (typeof encontrado === "undefined") {
    return false;
  } else {
    if (encontrado.pass != pass) {
      return false;
    } else {
      return encontrado;
    }
  }
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  //Validamos que ambos campos estén completos

    
    let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

    if (!data) {
      alert(`Usuario y/o contraseña erróneos`);
    } else {
      if (recordar.checked) {
        guardarDatos(data, localStorage);
      } else {
        guardarDatos(data, sessionStorage);
      }
      modal.hide();
    }
  
});

//Comienzo formulario de contacto
//variables
let nombreForm = document.querySelector("#nombre");
let apellidoForm = document.querySelector("#apellido");
let correoForm = document.querySelector("#correo");
let mensajeForm = document.querySelector("#mensaje");
let formulario = document.querySelector("#formulario")
let info = document.querySelector(".info")

//Eventos
.addEventListener("input", function () {
  console.log(nombreForm.value);
})
apellidoForm.addEventListener("input", function () {
  
})
correoForm.addEventListener("input", function () {
  
})
mensajeForm.addEventListener("input", function () {
  
})

const mostrarInfo = formulario.addEventListener ("submit", function (e){
  e.preventDefault();
  info.innerHTML=`
  <div class="alert alert-secondary" role="alert">
  <p>Gracias ${nombreForm.value} por tu mensaje.</p>
</div>
  `
})
