class Articulo {
  constructor(nombre, id, stock, precio, categorias) {
    this.nombre = nombre;
    this.id = id;
    this.stock = parseInt(stock, 10);
    this.precio = parseFloat(precio);
    this.categorias = categorias;
  }
}

// INICIALIZA LAS CATEGORÍAS PREDEFINIDAS
const categorias = [
  "Herramientas Manuales",
  "Herramientas Eléctricas",
  "Materiales de Construcción",
  "Carpintería",
  "Pinturas y Accesorios",
  "Ferretería General",
  "Electricidad",
  "Sanitarios",
  "Jardinería",
  "Seguridad",
  "Adhesivos y Selladores",
  "Hogar y Organización",
];

// INICIALIZA EL INVENTARIO
const inventario = [
  {
    nombre: "Maza",
    id: "1123",
    stock: 200,
    precio: 255.99,
    categorias: ["Herramientas Manuales", "Materiales de Construcción"],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Sierra",
    id: "121",
    stock: 300,
    precio: 200.49,
    categorias: [
      "Herramientas Manuales",
      "Materiales de Construcción",
      "Carpintería",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Martillo",
    id: "3163",
    stock: 250,
    precio: 1500,
    categorias: [
      "Herramientas Manuales",
      "Materiales de Construcción",
      "Carpintería",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Clavos",
    id: "443",
    stock: 15000,
    precio: 4.47,
    categorias: [
      "Herramientas Manuales",
      "Materiales de Construcción",
      "Carpintería",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Madera",
    id: "1023",
    stock: 290,
    precio: 255.99,
    categorias: [
      "Herramientas Manuales",
      "Materiales de Construcción",
      "Carpintería",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Hacha",
    id: "25",
    stock: 500,
    precio: 564,
    categorias: [
      "Pinturas y Accesorios",
      "Ferretería General",
      "Electricidad",
      "Sanitarios",
      "Jardinería",
      "Seguridad",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Veneno",
    id: "355",
    stock: 126,
    precio: 255.99,
    categorias: ["Herramientas Manuales", "Materiales de Construcción"],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Amoniaco",
    id: "265",
    stock: 458,
    precio: 200.49,
    categorias: [
      "Pinturas y Accesorios",
      "Ferretería General",
      "Electricidad",
      "Sanitarios",
      "Jardinería",
      "Seguridad",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Serrucho",
    id: "126",
    stock: 556,
    precio: 1500,
    categorias: ["Herramientas Manuales", "Carpinteria"],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Caño 1'",
    id: "9854",
    stock: 3000,
    precio: 4.47,
    categorias: [
      "Ferretería General",
      "Materiales de Construcción",
      "Sanitarios",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Maderita",
    id: "963",
    stock: 12,
    precio: 22.59,
    categorias: [
      "Ferretería General",
      "Jardinería",
      "Materiales de Construcción",
    ],
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Virulana",
    id: "77",
    stock: 123,
    precio: 129.5,
    categorias: ["Herramientas Manuales", "Materiales de Construcción"],
    imagen: "https://via.placeholder.com/100",
  },
];

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
        <img src="${articulo.imagen}"/>
        <h4>${articulo.nombre}</h4>
        <p>ID: ${articulo.id}</p>
        <b>${formatearPrecioARS(articulo.precio)}</b>
        <p>Stock: ${articulo.stock}</p>
        <button onclick="agregarAlCarrito('${
          articulo.id
        }')">Agregar al carrito</button>`;
    articulosContainer.appendChild(productCard);
  });
};

renderProducts(inventario);

const agregarAlCarrito = (id) => {
  let articulo = inventario.find((elemento) => elemento.id === id);
  if (articulo) {
    carrito.push(articulo);
    localStorage.setItem("carrito", JSON.stringify(carrito))
  } else {
    console.error("Artículo no encontrado");
  }
};

function mostrarCategoriasMenu(categorias) {
  const menuCategorias = document.getElementById("categorias-list");
  menuCategorias.innerHTML = "";

  categorias.forEach((categoria) => {
    let li = document.createElement("div");
    li.innerHTML = `<li class="categorias"><a href="#ancla">${categoria}</a></li>`;
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
  renderProducts(productosFiltrados);
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




