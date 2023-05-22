const arreglo = [
    { id: 1, nombre: "Adrian", nota: 5 },
    { id: 2, nombre: "Vicente", nota: 8 },
    {
        id: 3,
        nombre: "Carolina",
        nota: 14,
    },
    { id: 4, nombre: "Wendy", nota: 16 },
    { id: 5, nombre: "Andrea", nota: 19 },
    { id: 6, nombre: "Pamela", nota: 19 },
    {
        id: 7,
        nombre: "Cristian",
        nota: 20,
    },
    { id: 8, nombre: "Daniel", nota: 19 },
    { id: 9, nombre: "Lilly", nota: 14 },
    { id: 10, nombre: "Ramiro", nota: 12 },
];

// Funcion como parametro
// E suna fucnion que recibe otra funcion como parametro

//FIND
// Enviarmos una expresión --> Truty or falsy
// Devuelve el primero que cumpra esta funcion
const repuestaFind = arreglo.find(function (
    valorActual,
    indiceActual,
    arregloCompleto
) {
    console.log("valorActual", valorActual);
    console.log("indiceActual", indiceActual);
    console.log("arregloCompleto", arregloCompleto);
    return valorActual.nota < -1;
});

// FINDINDEX
// Enviamos una expresion -> truty falsy
// devolver el indice del primer elemento que cumpla esa condicion

const respuestaFindIndex = arreglo.findIndex((valorActual) => {
    return valorActual.nota < 5;
});

console.log('respuestaFindIndex', respuestaFindIndex); // Si encuentra indice, sino-1

//FOREACH
//ITERAR EL ARREGLO
const respuestaForEach = arreglo
    .forEach(
        function (valorActual) {
            console.log(valorActual);
        }
    );
console.log('respuestaForEach', respuestaForEach); // undefined

// MAP (Modificar a Iterar en un NUEVO arreglo)
// enviamos los datos del nuevo arreglo
//devuelve el nuevo arreglo
const respuestaMap = arreglo
    .map(
        function (valorActual) {
            const nuevaNota = {
                id: valorActual.id,
                nombre: valorActual.nombre,
                nota: valorActual.nota + 1,
                estaAprobado: (valorActual.nota + 1) > 14,
                registrado: true,
            }
            return nuevaNota
        }
    );
console.log('respuestaMap', respuestaMap); // [....] nuevo arreglo
console.log('arreglo', arreglo); // [....] arreglo

// Filter (Filtra arreglo)
// enviamos expresion
// devuelve los elementos que cumplen esa condicion en un nuevo arreglo

const respuestaFilter = arreglo
    .filter(
        function (valorActual) {
            return valorActual.nota > 10;
        }
    );
console.log('respuestaFilter', respuestaFilter); // [....] nuevo arreglo
console.log('arreglo', arreglo); // [....] arreglo

// SOME -> expresion
// devuelve un boolean
// Hay algun X que cumple con está condición ?
// OR
const respuestaSome = arreglo
    .some(
        function (valorActual) {
            return valorActual.nota < 9;
        }
    );
console.log('respuestaSome', respuestaSome); // true 

// EVERY -> expresion
// devuelve un boolean
// Todos los X cumple esta condición ?
// AND
const respuestaEvery = arreglo
    .every(
        function (valorActual) {
            return valorActual.nota <= 20;
        }
    );
console.log('respuestaEvery', respuestaEvery); // true 

// REDUCE                   izq -> Der
// REDUCE RIGHT             Der -> izq
// 1) [1,2,3,4,5,6,2,4,5,6,7,8,3,1,2]
// 2) 0 -> devolvemos la Operación
// Ej: variable inicial en 100
// 1.- 100 - 1 = 99
// 2.- 97 - 2 = 97
// 3.- 97 - 5 = 92
// ...

//REDUCE
const respuestaReduce = arreglo
    .reduce(
        function (valorAcumulado, valorActual, indice, arreglo ) {
            return valorActual.nota + valorAcumulado;
        },
        0 // acumulador
    );
console.log('respuestaReduce', respuestaReduce); 
console.log(respuestaReduce / arreglo.length);

// CONCATENAR OPERADORES
// new* 
arreglo.filter((a) => a.nota < 14) //({...})[]
    .map((a) => a.nota + 1) // unknown
    .some((a) => a < 14);