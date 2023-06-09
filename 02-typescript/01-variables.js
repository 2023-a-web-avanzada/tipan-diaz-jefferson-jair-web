// 01-variables.ts
// npm install -g typescript    
// tsc
var nombre = 'Jefferson'; //primitivo
var nombre2 = 'Jefferson2'; // Clase String
// tsc 01-variables.ts --target es3
// tsc 01-variables.ts --target es6
// nombre = 1;
var edad = 32;
var casado = false;
var fecha = new Date();
var sueldo;
sueldo = 12.4;
//Duck Typing
var apellido = 'Tipan'; // String ->
// apellido = 1; // Error, no es un string
apellido = 'Diaz';
apellido.toUpperCase();
var marihuana = 2;
marihuana = '2';
marihuana = true;
marihuana = function () { return '2'; };
var edadMultiple = '2'; // 2 / new Date()
edadMultiple = '2';
edadMultiple = 'dos';
edadMultiple = new Date();
edadMultiple = 2222;
var numeroUnico = 1; // para igualar a otros se castea
numeroUnico = numeroUnico + Math.pow(edadMultiple, 2);
