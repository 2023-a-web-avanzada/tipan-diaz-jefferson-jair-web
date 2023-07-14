// Stringify y Parse

const { log } = require("console");

const arregloUsuario = [
    {
        id: 1, 
        nombre: 'Jefferson',
    }
];

const arregloGuardado = JSON.stringify(arregloUsuario) // Arreglo, Objeto
const usuario = {
    id: 1,
    nombre: 'Adrian',
};
const objetoGuardado = JSON.stringify(usuario) // Arreglos, Objetos
console.log('arregloGuardado', arregloGuardado);
console.log('objetoGuardado', objetoGuardado);
console.log(typeof arregloGuardado);
const arregloRestaurado = JSON.parse(arregloGuardado);
const objetoRestaurado = JSON.parse(arregloGuardado);
console.log('arregloRestaurado', arregloRestaurado);
console.log('objetoRestaurado', objetoRestaurado);
console.log(typeof arregloRestaurado);


