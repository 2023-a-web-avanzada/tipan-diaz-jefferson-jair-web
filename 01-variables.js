// Mutables e Inmutables
//Mutables (re asignadas)

var numeroUno = 1;
let numeroDos = 2;

numeroUno = 12;
numeroDos = 8;

numeroUno = false;
numeroDos = true;

//Inmutables
const configuracionArchivo = 'PDF'

// configuracionArchivos = 'XML';
//vamos a preferir CONST > LET > VAR (mejor no usar)

//Tipos de variables (primitivas)
const numero = 1; // number
const sueldo = 1.2 // number
const texto = 'Jefferson' //String
const apellido = "Tipan" //String
const casado = false // boolean
const hijos = null // object
const zapato = undefined // undefined

console.log(typeof numero);
console.log(typeof sueldo);
console.log(typeof texto);
console.log(typeof apellido);
console.log(typeof casado);
console.log(typeof hijos);
console.log(typeof zapato);

// Truty y Falsy
if(true){
    console.log('Es verdadero');
} else {
    console.log('Es falso'); //TRUTY
}

if(""){ // string vacio
    console.log('Es verdadero');
} else {
    console.log('Es falso'); // FALSY
}

if("Jefferson"){
    console.log('Es verdadero');
} else {
    console.log('Es falso'); // TRUTY
}

// Truty y Falsy con Numeros
if(-1){
    console.log('Es verdadero');
} else {
    console.log('Es falso'); // TRUTY
}

if(0){
    console.log('Es verdadero');
} else {
    console.log('Es falso'); // FALSY
}

if(1){
    console.log('Es verdadero');
} else {
    console.log('Es falso'); // TRUTY
}

// Los números cualesquiera son verdaderos
// El cero es cero porque representa el vacio

const jefferson = {
    "nombre": "Jefferson",
    'apellido': 'Tipan',
    edad: 32,
    hijos: null,
    casado: false,
    zapatos: undefined,
    ropa: {
        color: 'plomo',
        talla: 40,
    },
    mascota: ['Cache', 'Pequi', 'Pandi'],
};
console.log(jefferson);

// Acceder a las propiedades
jefferson.nombre // "Jefferson"
jefferson.apellido // "Tipan"
jefferson["nombre"] // "Jefferson"

// Modificar valores
jefferson.nombre = "Jair";
jefferson["nombre"] = "Jefferson"

// Crear atributos
jefferson.sueldo; //undefined
console.log(jefferson.sueldo); // undefined
jefferson.sueldo = 1.2;
console.log(jefferson.sueldo); // 1.2
jefferson["gastos"] = 0.8;
console.log(jefferson.gastos);
console.log(jefferson);

// Eliminar propiedades
jefferson.nombre = undefined;
console.log(jefferson);
console.log(Object.keys(jefferson));
console.log(Object.values(jefferson));
delete jefferson.nombre;
console.log(Object.keys(jefferson));
console.log(jefferson);