

//Venta de CAMISETAS

const productos = [];

class Camiseta {
  constructor(equipo, precio, anio, id, img1, img2) {
    this.equipo = equipo;
    this.precio = parseFloat(precio);
    this.anio = parseInt(anio);
    this.id = id;
    this.img1 = img1;
    this.img2 = img2;
  }
  mostrarCamisetas() {
    const card = `<div class="card m-2 text-center" style="width: 18rem">
      <div
        id="carouselExampleControls1"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src=${this.img1}
              class="d-block w-100 h-100"
              alt=
            />
          </div>
          <div class="carousel-item">
            <img
              src=${this.img2}
              class="d-block w-100 h-100"
              alt=
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls1"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls1"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="card-body">
        <h5 class="card-title text-primary">${this.equipo}</h5>
        <p class="card-text">USD ${this.precio}</p>
        <p class="card-text">Del Año ${this.anio}</p>
        <button class="btn btn-primary compra" data-id=${this.id} onClick='javascript:agregarCarrito(${JSON.stringify(this)})' >
          Agregar a Carrito
        </button>
      </div>
    </div>`;
    const cards = document.querySelector("#cards");
    cards.innerHTML += card;
  }


};

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => 
  {
    data.forEach((producto) => {
      let nuevaCamiseta = new Camiseta(
        producto.equipo,
        producto.precio,
        producto.anio,
        producto.id,
        producto.img1,
        producto.img2
      );
      
      productos.push(nuevaCamiseta);
    });
    
    productos.forEach((e) => {
      e.mostrarCamisetas();
    });
  }
  );

  //CARRITO DE COMPRAS


//Array vacio para carrito o autollenada con objetos del storage cargada previamente
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//funcion para agregar producos al carrito
  function agregarCarrito(producto){
    
    const enCarrito = carrito.find(prod=>prod.id == producto.id)
    
    if(!enCarrito){
      carrito.push({...producto, cantidad:1})
    }else{
      let carritoFiltrado =carrito.filter(prod => prod.id != enCarrito.id)
      carrito=[
        ...carritoFiltrado,
        {
          ...enCarrito,
          cantidad: enCarrito.cantidad +1
        }
      ]
    }
    localStorage.setItem("carrito",JSON.stringify(carrito))
    contador.innerHTML = carrito.reduce((acceder, prod)=>acceder+ prod.cantidad,0 )
    console.log(carrito)
  }


  const contador= document.getElementById("contCarrito")
  contador.innerHTML = carrito.reduce((acceder, prod)=>acceder+ prod.cantidad,0 )

  const botonCarrito = document.querySelector("#btnCarrito");
  botonCarrito.addEventListener("click", carritoHTML);
  const carr = document.querySelector("#carrito");
  function carritoHTML() {
    limpiarHTML();
    carrito.forEach((producto) => {
      const row = document.createElement("p");
      row.innerHTML = `<div class="container border border-5">
      <p>${producto.equipo}</p>
      <p>cantidad ${producto.cantidad}</p>
      <button class= "btn btn-danger " onClick="eliminarCompra(event)" id="${producto.id}">Eliminar</button>
      </div>
      `;
      
      carr.appendChild(row);
      
    })
    confirmarCompra()
    ;
  }
  function limpiarHTML() {
    carr.innerHTML = "";
  }
  console.log(carrito)
  //Funcion para eliminar articulos del carrito
function eliminarCompra(e) {
    debugger
    let productoID = e.target.getAttribute("id");
    carrito = carrito.filter(
      (producto) => producto.id != productoID
    );
    localStorage.setItem("carrito",JSON.stringify(carrito))
    console.log(carrito)
    carritoHTML();
    
  }


  //Confirmacion de compra
  function confirmarCompra() {
    const conf = document.createElement("p");
    conf.innerHTML = `
    <button id="btnconf" class= "btn btn-light compra" >Confirmar</button>

    `;
    
    carr.appendChild(conf);
    const btnconfi=document.querySelector("#btnconf")
      btnconfi.addEventListener("click", confirCompra);
      console.log(btnconfi);
  function confirCompra(e) {
    if (e.target.classList.contains("btn-light")) {
      compraConfirmada = carrito.slice();
    }
    localStorage.clear();
console.log(compraConfirmada);

enviarAConfirmados()

  }
  }


  let compraConfirmada = [];

const productosConfirmados = document.querySelector("#productosConfirmados");
  function enviarAConfirmados() {
    compraConfirmada.forEach((producto) => {
      const row = document.createElement("p");
      row.innerHTML = `<div class="container">
      <p>${producto.equipo}</p>
      <p>cantidad ${producto.cantidad}</p>
      </div>
      `;
      
      productosConfirmados.appendChild(row);
      
    })
    
    ;
  }

  //Uso de libreria sweetalert2 notificando confirmacion de compra
  const alertConfirmacion = document.getElementById("alertaConfirmacion")
  alertConfirmacion.addEventListener("click", alertaLibreria)

  function alertaLibreria(){
    Swal.fire({
      icon: 'success',
      title: 'Compra Finalizada',
      text: 'Pongamonos en Contacto',
      footer: '<a href="https://api.whatsapp.com/send?phone=+5980099661928&text=Tenemos%20la%20camiceta%20que%20queres!">Whatsapp</a>'
    })
  } 