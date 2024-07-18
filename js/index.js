//Definicion de clases y sus metodos
class Articulo {
  constructor(nombre, id, stock, precio) {
    this.nombre = nombre;
    this.id = id;
    this.stock = parseInt(stock, 10);
    this.precio = parseFloat(precio);
  }
}

class Inventario {
  constructor() {
    this.articulos = [];
  }

  agregarArticulo(articulo) {
    this.articulos.push(articulo);
  }

  modificarArticulo(nombre) {
    let articulo = this.articulos.find((a) => a.nombre === nombre);
    if (articulo) {
      console.log("Modificando artículo:", articulo);
      articulo.nombre = prompt(
        `Ingrese el nuevo nombre del artículo (anterior: ${articulo.nombre}):`,
        articulo.nombre
      );
      articulo.id = prompt(
        `Ingrese el nuevo ID del artículo (anterior: ${articulo.id}):`,
        articulo.id
      );
      articulo.stock = parseInt(
        prompt(
          `Ingrese el nuevo stock del artículo (anterior: ${articulo.stock}):`,
          articulo.stock
        ),
        10
      );
      articulo.precio = parseFloat(
        prompt(
          `Ingrese el nuevo precio del artículo (anterior: ${articulo.precio}):`,
          articulo.precio
        )
      );
      console.log("Artículo modificado:", articulo);
    } else {
      console.log("Artículo no encontrado.");
    }
  }

  eliminarArticulo(nombre) {
    let index = this.articulos.findIndex((a) => a.nombre === nombre);
    if (index !== -1) {
      let eliminado = this.articulos.splice(index, 1);
      console.log("Artículo eliminado:", eliminado[0]);
    } else {
      console.log("Artículo no encontrado.");
    }
  }

  mostrarInventario() {
    if (this.articulos.length > 0) {
      console.log("-------------------------");
      console.log("-------Inventario:-------");
      this.articulos.forEach((articulo) => {
        console.log(
          `ID: ${articulo.id}, Nombre: ${articulo.nombre}, Stock: ${
            articulo.stock
          }, Precio: ${formatearPrecioARS(articulo.precio)}`
        );
      });
    } else {
      console.log("El inventario está vacío.");
    }
  }
}

class Presupuesto {
  constructor() {
    this.articulos = [];
    this.cliente = "";
  }

  setCliente(nombre) {
    this.cliente = nombre;
  }

  agregarArticuloPresupuesto(inventario) {
    let nombre = prompt(
      "Ingrese el nombre del artículo a agregar al presupuesto:\n" +
        inventario.articulos.map((a) => a.nombre).join(", ")
    );
    let articulo = inventario.articulos.find((a) => a.nombre === nombre);
    if (articulo) {
      let cantidad = parseInt(
        prompt(
          `Ingrese la cantidad de unidades del artículo (disponible: ${articulo.stock}):`
        ),
        10
      );
      if (cantidad > 0 && cantidad <= articulo.stock) {
        this.articulos.push({ articulo, cantidad });
        console.log(
          `Artículo agregado al presupuesto: ${articulo.nombre}, Cantidad: ${cantidad}`
        );
      } else {
        console.log("Cantidad no disponible en stock.");
      }
    } else {
      console.log("Artículo no encontrado en el inventario.");
    }
  }

  eliminarArticuloPresupuesto() {
    let nombre = prompt(
      "Ingrese el nombre del artículo a eliminar del presupuesto:\n" +
        this.articulos.map((p) => p.articulo.nombre).join(", ")
    );
    let index = this.articulos.findIndex((p) => p.articulo.nombre === nombre);
    if (index !== -1) {
      let eliminado = this.articulos.splice(index, 1);
      console.log("Artículo eliminado del presupuesto:", eliminado[0].articulo);
    } else {
      console.log("Artículo no encontrado en el presupuesto.");
    }
  }

  mostrarPresupuesto() {
    if (this.articulos.length > 0) {
      console.log(`----------------`);
      console.log(`PRESUPUESTO PARA: ${this.cliente}`);
      let total = 0;
      this.articulos.forEach((p) => {
        console.log(
          `Nombre: ${p.articulo.nombre}, Cantidad: ${
            p.cantidad
          }, Precio Unitario: ${formatearPrecioARS(
            p.articulo.precio
          )}.-, Subtotal: ${formatearPrecioARS(p.cantidad * p.articulo.precio)}`
        );
        total += p.cantidad * p.articulo.precio;
      });
      console.log("Total del presupuesto:", formatearPrecioARS(total));
    } else {
      console.log("El presupuesto está vacío.");
    }
  }

  confirmarPresupuesto(inventario) {
    if (this.articulos.length > 0) {
      console.log("Presupuesto confirmado:");
      this.mostrarPresupuesto();
      this.articulos.forEach((p) => {
        let articulo = inventario.articulos.find(
          (a) => a.nombre === p.articulo.nombre
        );
        if (articulo) {
          articulo.stock -= p.cantidad;
        }
      });
      this.articulos = [];
    } else {
      console.log("El presupuesto está vacío.");
    }
  }
}

//Funciones de menúes
function menuPrincipal(inventario, presupuesto) {
  let opcion = prompt(
    "\nMenú Principal\n\n1. Inventario\n2. Presupuesto\n3. Salir"
  );
  switch (opcion) {
    case "1":
      menuInventario(inventario);
      break;
    case "2":
      let cliente = prompt("Ingrese el nombre del cliente:");
      presupuesto.setCliente(cliente);
      menuPresupuesto(inventario, presupuesto);
      break;
    case "3":
      console.log("Saliendo del programa");
      return;
    default:
      console.log("La opción no es válida");
      menuPrincipal(inventario, presupuesto);
  }
}

function menuInventario(inventario) {
  let opcion = prompt(
    "\nMenú Inventario\n\n1. Agregar artículo\n2. Modificar artículo\n3. Eliminar artículo\n4. Mostrar inventario\n5. Volver al menú principal"
  );
  let nombre;
  let id;
  let stock;
  let precio;

  switch (opcion) {
    case "1":
      nombre = prompt("Ingrese el nombre del artículo:");
      id = prompt("Ingrese el ID del artículo:");
      stock = prompt("Ingrese el stock del artículo:");
      precio = prompt("Ingrese el precio del artículo:");
      let articulo = new Articulo(nombre, id, stock, parseFloat(precio));
      inventario.agregarArticulo(articulo);
      console.log("Artículo agregado:", articulo);
      break;
    case "2":
      nombre = prompt(
        "Ingrese el nombre del artículo a modificar:\n" +
          inventario.articulos.map((a) => a.nombre).join(", ")
      );
      inventario.modificarArticulo(nombre);
      break;
    case "3":
      nombre = prompt(
        "Ingrese el nombre del artículo a eliminar:\n" +
          inventario.articulos.map((a) => a.nombre).join(", ")
      );
      inventario.eliminarArticulo(nombre);
      break;
    case "4":
      inventario.mostrarInventario();
      break;
    case "5":
      menuPrincipal(inventario, presupuesto);
      return;
    default:
      console.log("La opción no es válida");
  }
  menuInventario(inventario);
}

function menuPresupuesto(inventario, presupuesto) {
  let opcion = prompt(
    "\nMenú Presupuesto\n\n1. Agregar artículo\n2. Eliminar artículo\n3. Mostrar presupuesto\n4. Confirmar presupuesto\n5. Volver al menú principal"
  );
  switch (opcion) {
    case "1":
      presupuesto.agregarArticuloPresupuesto(inventario);
      break;
    case "2":
      presupuesto.eliminarArticuloPresupuesto();
      break;
    case "3":
      presupuesto.mostrarPresupuesto();
      break;
    case "4":
      console.log("-------------------");
      presupuesto.confirmarPresupuesto(inventario);
      break;
    case "5":
      menuPrincipal(inventario, presupuesto);
      return;
    default:
      console.log("La opción no es válida");
  }
  menuPresupuesto(inventario, presupuesto);
}

//Funcion para embellecer los precios
function formatearPrecioARS(precio) {
  return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

//Inicializar inventario y presupuesto
let inventario = new Inventario();
let presupuesto = new Presupuesto();

//Artículos preexistentes en el inventario
inventario.agregarArticulo(new Articulo("Maza", "01123", 200, 255.99));
inventario.agregarArticulo(new Articulo("Sierra", "01121", 300, 200.49));
inventario.agregarArticulo(new Articulo("Martillo", "31163", 250, 1500));
inventario.agregarArticulo(new Articulo("Clavos", "44443", 20000, 4.47));
inventario.agregarArticulo(new Articulo("Madera", "10293", 200, 255.99));

//Ejecutar el programa
menuPrincipal(inventario, presupuesto);
