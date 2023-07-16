const fs = require('fs'); // file system
                          // Importar modulo fs

console.log('PRIMERO');
fs.readFile(
    './06-ejemplo.txt', // Nombre o path del archivo
    'utf-8', // codificacion
    (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => {
        if (errorLecturaPrimerArchivo) {
            console.error(errorLecturaPrimerArchivo);
            throw new Error('Error leyendo primer archivo');
        } else {
            fs.readFile(
                './01-variables.js', // Nombre o path del archivo
                'utf-8', // codificacion
                (errorLecturaSegundoArchivo, contenidoSegundoArchivo) => {
                    if (errorLecturaSegundoArchivo) {
                        console.error(errorLecturaSegundoArchivo);
                        throw new Error('Error leyendo primer archivo');
                    } else {
                        const nuevoContenido = contenidoPrimerArchivo + contenidoSegundoArchivo;
                        fs.writeFile(
                            './06-nuevo-archivo.txt',
                            nuevoContenido,
                            (errorEscritura) => {
                                if (errorEscritura) {
                                    console.error(errorEscritura);
                                    throw new Error('Error escribiendo nuevo archivo');
                                } else {
                                    console.log('Completado');
                                }
                            }
                        );
                    }
                }
            );
        }

    }
);
console.log('TERCERO');


// 06-ejemplo.txt -> Hola

// 1) Leer archivo:06-ejemplo.txt,
// luego imprimir en consola
// 2) Despues del paso 1, Leer archivo:01-variables.js
// , luego imprimir en consola
// 3) Crear un nuevo archivo llamaddo 06-nuevo-archivo.txt
// con el contenido de los otros dos archivos.

fs.writeFile(
        './06-nuevo-archivo.txt',
        nuevoContenido,
        (errorEscritura) => {

        }
    );