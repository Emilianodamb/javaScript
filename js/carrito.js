let carrito = JSON.parse(localStorage.getItem("carrito")) || []

console.log(carrito)


//FORMATEA UN PRECIO A PESOS ARGENTINOS
//FUNCION// RECIBE UN NUMERO Y DEVUELVE UN STRING CON EL NUMERO FORMATEADO
function formatearPrecioARS(precio) {
    return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

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
        <button onclick="eliminarDelCarrito('${
        articulo.id
        }')">Eliminar del carrito</button>`;
    articulosCarrito.appendChild(productCard);
});
};

renderProducts(carrito);

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((articulo) => articulo.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
};