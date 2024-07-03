function generarPresupuesto() {
  alert("Bienvenido al generador de presupuestos");
  let nombreCliente = prompt("Ingrese el nombre del cliente:");
  let total = 0;
  let seguir = true;

  console.log(`Presupuesto para: ${nombreCliente}`);

  while (seguir) {
    let cantidadArticulos = parseInt(prompt("¿Cuántos artículos desea ingresar?"));

    for (let i = 0; i < cantidadArticulos; i++) {
      let nombreArticulo = prompt("Ingrese el nombre del artículo:");
      if (!nombreArticulo) {
        alert("El nombre del artículo no puede estar vacío. Intente de nuevo.");
        i--;
      } else {
        let precioUnitario = parseFloat(prompt("Ingrese el precio unitario:"));
        if (isNaN(precioUnitario) || precioUnitario <= 0) {
          alert("El precio unitario debe ser un número positivo. Intente de nuevo.");
          i--;
        } else {
          let cantidad = parseInt(prompt("Ingrese la cantidad de unidades:"));
          if (isNaN(cantidad) || cantidad <= 0) {
            alert("La cantidad debe ser un número entero positivo. Intente de nuevo.");
            i--;
          } else {
            alert(`Producto cargado con éxito (${nombreArticulo})`);
            console.log(`x${cantidad} ${nombreArticulo} --> $${precioUnitario.toFixed(2)}`);
            total += cantidad * precioUnitario;
          }
        }
      }
    }

    let respuesta = prompt("¿Desea seguir agregando productos? (si/no)");
    if (respuesta.toLowerCase() !== "si") {
      seguir = false;
    }
  }

  console.log(`Total = $${total.toFixed(2)}`);
  console.log("\n*Los precios de cada artículo son unitarios y no incluyen impuestos")
  alert("¡Presupuesto generado de forma exitosa!")
}

generarPresupuesto();