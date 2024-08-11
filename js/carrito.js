let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(carrito);

function formatearPrecioARS(precio) {
    return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

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
                <div class="articulo-subtotal">
                    <p></p>
                    
                    <h3 class="text-body">Sub-Total:</h3>
                    <p>${formatearPrecioARS(articulo.quantity*articulo.precio)}</p>
                </div>
                <div class="card-footer-carrito">
                    <span class="text-title">${formatearPrecioARS(articulo.precio)}</span>
                    <div class="container-buttons-cart">
                        <button onclick="restarCantidad('${articulo.id}')" class="modificarArticuloCarritoBtn">-</button>
                        <p>${articulo.quantity}</p>
                        <button onclick="sumarCantidad('${articulo.id}')" class="modificarArticuloCarritoBtn">+</button>
                    </div>
                    <button onclick="eliminarDelCarrito('${articulo.id}')" class="eliminarArticuloBtn">
                        <img src="./img/TRASH-LOGO.svg" alt="eliminar" class="trash-logo">
                        Eliminar
                    </button>
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
    renderTotal(carrito);
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
                stopOnFocus: true
            }).showToast()
        } else {
            eliminarDelCarrito(productoEncontrado.id);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
    renderTotal(carrito);
};

const sumarCantidad = (id) => {
    let productoEncontrado = carrito.find((elemento) => elemento.id === id);
    if (productoEncontrado && productoEncontrado.quantity < productoEncontrado.stock) {
        productoEncontrado.quantity += 1;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
    renderTotal(carrito);
};

const renderTotal = (arrayArticulos) => {
    let totalContainer = document.getElementById("container-total");
    let total = 0;
    
    totalContainer.innerHTML = "";

    let table = document.createElement("table");
    table.className = "articulos-total";
    let tableHeader = `
        <tr>
            <th>Nombre</th>
            <th>ID</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
        </tr>
    `;
    table.innerHTML = tableHeader;

    arrayArticulos.forEach((articulo) => {
        let subtotal = articulo.quantity * articulo.precio;
        total += subtotal;
        
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${articulo.nombre}</td>
            <td>${articulo.id}</td>
            <td>${formatearPrecioARS(articulo.precio)}</td>
            <td>${articulo.quantity}</td>
            <td>${formatearPrecioARS(subtotal)}</td>
        `;
        table.appendChild(row);
    });

    totalContainer.appendChild(table);

    let totalElement = document.createElement("div");
    totalElement.className = "total"
    totalElement.innerHTML = `<h3>TOTAL: ${formatearPrecioARS(total)}</h3> <button id="confirmar">Confirmar compra</button>`;
    totalContainer.appendChild(totalElement);
}

renderTotal(carrito);