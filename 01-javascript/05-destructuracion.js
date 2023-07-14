// 05-destructuracion.js
const jefferson = {
    nombre: "Jefferson",
};
const josselyn = {
    nombre: "Josselyn",
    apellido: "Velastegui",
};
const jeffersonJosselyn = { // Crea una nueva REFERENCIA (VALOR)
    ...josselyn, // 1 el orden es importante para propiedades que se repiten
    ...jefferson, // El ultimo reemplaza a los anteriores
};
console.log('jeffersonJosselyn', jeffersonJosselyn);

// Destructuracion de arreglos 
const arregloUno = [1, 2, 3, 4, 5];
const arregloDos = [6, 7, 8, 9, 10];
const superArreglo = [
    ...arregloUno, // El orden importa
    ...arregloDos,
]; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('superArreglo', superArreglo);

const fs = require('fs');


