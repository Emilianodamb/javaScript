//Voy a intentar hacer un simulador, por ahora bien sencillo, solo con los conceptos aprendidos hasta el momento, en las próximas preentregas me gustaría implementar objetos, funciones, librerías, etc...

alert('Hola, Bienvenido/a a MecaReg, a continuacion indica si eres mecánico o cliente.');

let answer = Number(prompt('Si eres mecánico ingresa 1, si eres cliente ingresa 2'));

while (answer < 1 || answer > 2) {
  answer = Number(prompt('La opción ingresada no es válida, por favor ingresa una opción válida: (1) si eres mecánico, (2) si eres cliente. *Sin parentesis.'));
};

answer==1 ? console.log("Has ingresado como mecánico") : console.log("Has ingresado como cliente");

const userName = prompt('Ingresa tu nombre');
const userId = prompt('Ingresa tu DNI');

let carId = '';
let carModel = 0;
let carBrand = '';

let fixNum = 0;
let description = '';
let dateService = '';
let kmNum = 0;
let lastService = 0;

let menu;

while (menu != 0) {
  console.log("Elige una opción:");
  console.log("1. Registrar un vehículo");
  console.log("2. Añadir arreglos al historial");
  console.log("3. Consultar proximo service");
  console.log("0. Salir del menú");

  menu = Number(prompt("Si deseas Registrar un vehículo 1, Añadir arreglos al historial 2, Consultar próximo service 3, Salir del menú 0."));

  while (menu < 0 || menu > 3) {
    menu = Number(prompt("La opción ingresada no es válida, por favor ingresa una opción válida: (1) Registrar un vehículo, (2) Añadir arreglos al historial, (3) Consultar próximo service, (0) Salir del menú. *Sin parentesis."));
  };
  switch (menu) {
    case 1: //Registrar un auto
      console.log("REGISTRAR UN AUTO:");
      carId = prompt("Ingresa la patente del auto");
      carBrand = prompt("¿De qué marca es?");
      carModel = Number(prompt("¿En qué año se fabricó?"));
      console.log(`Vehículo ingresado con éxito: ${carBrand} modelo ${carModel}, patente Nº ${carId}`);
      break;
  
    case 2: //Añadir arreglos al historial
      console.log("Añadir arreglos al historial");
      fixNum = Number(prompt("¿Cuantos arreglos deseas añadir?"));
      while(fixNum<0){
        fixNum = Number(prompt("La opción no es válida, debes ingresar un número positivo o cero."));
      }
      for(let i=0; i<fixNum; i++){
        console.log("Arreglo Nº" + (i+1) + ":");
        description = prompt("Describa el arreglo");
        dateService = prompt("Ingrese la fecha del arrelgo en el siguiente formato: DD/MM/AAAA");
        kmNum = Number(prompt("Indique el kilometraje al momento del arreglo"));
        lastService = kmNum;
        console.log("Arreglo añadido exitosamente por " + userName + " DNI Nº" + userId + ":");
        console.log(`${description}, a los ${kmNum} km, el día ${dateService}.`);
        alert("¡Arreglo cargado exitosamente!")
      }
      break;
  
    case 3: //Consultar proximo service
      console.log("Consultar proximo service");
      if(lastService>0){
        lastService += 7000;
        alert(`¡Realizar service antes de los ${lastService} km!`)
      }else{
        alert("No se ha realizado service aún, ¡Realizar service dentro de los próximos 7.000 km!");
      }
      menu = 0;
      break;

    case 0: //Salir
      menu = 0;
      break;

    default:
      console.log("La opción no es válida, debes ingresar una opción válida");
      break;
  };

  console.log("¡Muchas gracias por usar nuestra plataforma, hasta la próxima!");
  
}


