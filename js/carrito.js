let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(carrito);

//FORMATEA UN PRECIO A PESOS ARGENTINOS
//FUNCION// RECIBE UN NUMERO Y DEVUELVE UN STRING CON EL NUMERO FORMATEADO
function formatearPrecioARS(precio) {
    return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}
/*
const renderProducts = (arrayArticulos) => {
    let articulosCarrito = document.getElementById("container-cart");
    articulosCarrito.innerHTML = "";

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
            <div class="container-buttons-cart">
                <button onclick="restarCantidad('${articulo.id}')">-</button>
                <p>${articulo.quantity}</p>
                <button onclick="sumarCantidad('${articulo.id}')">+</button>
            </div>
            
            <button onclick="eliminarDelCarrito('${articulo.id
                }')">Eliminar del carrito</button>`;

        articulosCarrito.appendChild(productCard);
    });
};
*/

const renderProducts = (arrayArticulos) => {
    let articulosContainer = document.getElementById("container-cart");
    articulosContainer.innerHTML = "";
  
    // Renderizar
  
    arrayArticulos.forEach((articulo) => {
        let productCard = document.createElement("div");
        productCard.className = "articulo-carrito";
        productCard.innerHTML = ` 
            <div class="card-carrito">
                <div class="card-header-carrito">
                    <h5 class="text-title">${articulo.nombre}</h5>
                    <img src="${articulo.imagen}" class="card-img-carrito"/>
                </div>
                <div class="card-info-carrito">
                    <p class="text-body">Product description and details</p>
                    <p>ID: ${articulo.id}</p>
                    <p>Stock: ${articulo.stock}</p>
                </div>
                <div class="card-footer-carrito">
                    <span class="text-title">${formatearPrecioARS(articulo.precio)}</span>
                    <div class="container-buttons-cart">
                        <button onclick="restarCantidad('${articulo.id}')">-</button>
                        <p>${articulo.quantity}</p>
                        <button onclick="sumarCantidad('${articulo.id}')">+</button>
                    </div>
                    <button onclick="eliminarDelCarrito('${articulo.id}')">Eliminar del carrito</button>
                </div>
            </div>`;
      articulosContainer.appendChild(productCard);
    });
  };



renderProducts(carrito);

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((articulo) => articulo.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
};

const restarCantidad = (id) => {
    let productoEncontrado = carrito.find((elemento) => elemento.id === id);
    if (productoEncontrado) {
        if (productoEncontrado.quantity > 1) {
            productoEncontrado.quantity -= 1;
            Toastify({
                text: `Se restó una unidad de ${productoEncontrado.nombre}`,
                gravity: "bottom",
                duration: 3000,
                position: "right",
                close: true,
                backgroundColor: "red",
                stopOnFocus: true
            }).showToast()
        } else {
            eliminarDelCarrito(productoEncontrado.id);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
};

const sumarCantidad = (id) => {
    let productoEncontrado = carrito.find((elemento) => elemento.id === id);
    if (productoEncontrado && productoEncontrado.quantity < productoEncontrado.stock) {
        productoEncontrado.quantity += 1;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
};
