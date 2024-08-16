class Articulo {
  constructor(nombre, id, stock, precio, categorias, descripcion) {
    this.nombre = nombre;
    this.id = id;
    this.stock = parseInt(stock, 10);
    this.precio = parseFloat(precio);
    this.categorias = categorias;
    this.descripcion = descripcion;
  }
}

// INICIALIZA LAS CATEGORÍAS PREDEFINIDAS
const categorias = [
  "Herramientas Manuales",
  "Herramientas Eléctricas",
  "Materiales de Construcción",
  "Pinturas y Accesorios",
  "Ferretería General",
  "Electricidad",
  "Jardinería",
  "Adhesivos",
  "Iluminación"
];

// INICIALIZA EL INVENTARIO
let inventario = [];

document.addEventListener("DOMContentLoaded", () => {
  let getInventario = fetch("../inventario.json")
  getInventario
    .then((res) => res.json())
    .then((res) => {
      inventario = res
      renderProducts(inventario)
    })
    .catch((error) => console.log("error ", error))
})

function completarConCeros(numero, tam) {
  let string = String(numero);
  while (string.length < tam) {
    string = "0" + string;
  }
  return string;
}

//FORMATEA UN PRECIO A PESOS ARGENTINOS
//FUNCION// RECIBE UN NUMERO Y DEVUELVE UN STRING CON EL NUMERO FORMATEADO
function formatearPrecioARS(precio) {
  return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

//PROCEDIMIENTO// RECIBE UN ARRAY DE OBJETOS Y LO ORDENA DE FORMA CRECIENTE POR EL VALOR DE SU PROPIEDAD "ID"
function ordenarArray(array) {
  array.sort((a, b) => a.id - b.id);
}

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const renderProducts = (arrayArticulos) => {
  let articulosContainer = document.getElementById("articulos-container");
  articulosContainer.innerHTML = "";

  // Renderizar

  arrayArticulos.forEach((articulo) => {
    let productCard = document.createElement("div");
    productCard.className = "articulo";
    productCard.innerHTML = ` 
        <div class="card">
          <div class="card-img-container"><img src="${articulo.imagen}" class="card-img"/></div>
          <div class="card-info">
            <h4 class="text-title">${articulo.nombre}</h4>
            <p class="text-body">${articulo.descripcion}</p>
            <p>ID: ${articulo.id}</p>
            <p>Stock: ${articulo.stock}</p>
          </div>
          <div class="card-footer">
            <span class="text-title">${formatearPrecioARS(articulo.precio)}</span>
            <div class="card-button" onclick="agregarAlCarrito('${articulo.id}')">+
              <svg class="svg-icon" viewBox="0 0 20 20">
                  <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                  <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                  <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
              </svg>
            </div>
          </div>
        </div>`;
    articulosContainer.appendChild(productCard);
  });
};

renderProducts(inventario);

const agregarAlCarrito = (id) => {
  let articulo = inventario.find((elemento) => elemento.id === id);
  let articuloEnElCarrito = carrito.find(elemento => elemento.id === id)

  if (articulo.stock > 0) {
    if (articuloEnElCarrito) {
      if (articuloEnElCarrito.quantity < articulo.stock) {
        articuloEnElCarrito.quantity += 1

        Swal.fire({
          html: `Se agregó ${articulo.nombre} al carrito`,
          showConfirmButton: false,
          position: 'bottom',
          toast: true,
          customClass: {
            width: '200px',
            textAlign: 'center'
          }
        });

      } else {
        console.log("No hay stock de este")
      }

    } else {
      carrito.push({ ...articulo, quantity: 1 });

      Swal.fire({
          html: `Se agregó ${articulo.nombre} al carrito`,
          showConfirmButton: false,
          position: 'bottom',
          toast: true,
          customClass: {
            width: '200px',
            textAlign: 'center'
          }
      });
    }
  } else {
    console.log("No hay stock de este")
  }

  localStorage.setItem("carrito", JSON.stringify(carrito))
};

function mostrarCategoriasMenu(categorias) {
  const menuCategorias = document.getElementById("categorias-list");
  menuCategorias.innerHTML = "";

  categorias.forEach((categoria) => {
    let li = document.createElement("li");
    li.innerHTML = `<button class="boton-personalizado categorias"><a href="#ancla">${categoria}</a></button>`;
    li.addEventListener("click", () => {
      filtrarProductosPorCategoria(categoria);
    });

    menuCategorias.appendChild(li);
  });
}

function filtrarProductosPorCategoria(categoria) {
  const productosFiltrados = inventario.filter((articulo) =>
    articulo.categorias.includes(categoria)
  );
  if (productosFiltrados.length > 0) {
    renderProducts(productosFiltrados);
  } else {
    renderProducts(productosFiltrados);
    console.log("No se encontraron productos en esta categoría")
    let container = document.getElementById("articulos-container")
    let mensaje = document.createElement("div")
    mensaje.className = "categoria-vacia-container"
    mensaje.innerHTML = `<h3 class="mensajeCategoriaVacia">No se encontraron artículos en esta categoría</h3>`
    container.appendChild(mensaje)
  }

}

mostrarCategoriasMenu(categorias);

const inputBuscador = document.getElementById("buscador");

if (inputBuscador) {
  inputBuscador.addEventListener("input", (evento) => {
    let value = evento.target.value.toLowerCase();
    let arrayFiltrado = inventario.filter((articulo) =>
      articulo.nombre.toLowerCase().includes(value)
    );
    renderProducts(arrayFiltrado);
  });
}
