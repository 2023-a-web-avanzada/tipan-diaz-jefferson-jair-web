const fs = require('fs');
const inquirer = require('inquirer');

// Definir la entidad Cine
class Cine {
  constructor(nombre, ubicacion, apertura, enUso, peliculas) {
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.apertura = apertura;
    this.enUso = enUso;
    this.peliculas = peliculas;
  }
}

// Definir la entidad Pelicula
class Pelicula {
  constructor(titulo, genero, duracion, estreno, calificacion) {
    this.titulo = titulo;
    this.genero = genero;
    this.duracion = duracion;
    this.estreno = estreno;
    this.calificacion = calificacion;
  }
}

// Función para guardar los datos en un archivo JSON
function guardarDatos(datos, archivo) {
  fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));
  console.log(`Los datos se han guardado en ${archivo}.`);
}

// Función para cargar los datos desde un archivo JSON
function cargarDatos(archivo) {
  if (fs.existsSync(archivo)) {
    const datos = fs.readFileSync(archivo, 'utf8');
    return JSON.parse(datos);
  }
  return [];
}

// Función para mostrar el menú principal
function mostrarMenuPrincipal() {
  console.log('\n===== MENÚ PRINCIPAL =====');
  console.log('1. Crear Cine');
  console.log('2. Leer Cines');
  console.log('3. Actualizar Cine');
  console.log('4. Eliminar Cine');
  console.log('5. Menú Películas');
  console.log('6. Salir');

  inquirer.prompt([
    {
      type: 'number',
      name: 'opcion',
      message: 'Elige una opción:',
      validate: function (input) {
        if (input >= 1 && input <= 6) {
          return true;
        } else {
          return 'Por favor, ingresa un número válido.';
        }
      }
    }
  ]).then(answer => {
    switch (answer.opcion) {
      case 1:
        crearCine();
        break;
      case 2:
        leerCines();
        break;
      case 3:
        actualizarCine();
        break;
      case 4:
        eliminarCine();
        break;
      case 5:
        mostrarMenuPeliculas();
        break;
      case 6:
        console.log('¡Hasta luego!');
        break;
      default:
        break;
    }
  });
}

// Función para mostrar el menú Películas
function mostrarMenuPeliculas() {
  console.log('\n===== MENÚ PELÍCULAS =====');
  console.log('1. Crear Película');
  console.log('2. Leer Películas');
  console.log('3. Actualizar Película');
  console.log('4. Eliminar Película');
  console.log('5. Regresar al Menú Principal');

  inquirer.prompt([
    {
      type: 'number',
      name: 'opcion',
      message: 'Elige una opción:',
      validate: function (input) {
        if (input >= 1 && input <= 5) {
          return true;
        } else {
          return 'Por favor, ingresa un número válido.';
        }
      }
    }
  ]).then(answer => {
    switch (answer.opcion) {
      case 1:
        crearPelicula();
        break;
      case 2:
        leerPeliculas();
        break;
      case 3:
        actualizarPelicula();
        break;
      case 4:
        eliminarPelicula();
        break;
      case 5:
        mostrarMenuPrincipal();
        break;
      default:
        break;
    }
  });
}

// Función para crear un Cine
function crearCine() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'nombre',
      message: 'Nombre del Cine:'
    },
    {
      type: 'input',
      name: 'ubicacion',
      message: 'Ubicación del Cine:'
    },
    {
      type: 'input',
      name: 'apertura',
      message: 'Fecha de apertura del Cine (YYYY-MM-DD):',
      validate: function (input) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(input)) {
          return true;
        } else {
          return 'Por favor, ingresa una fecha válida en formato YYYY-MM-DD.';
        }
      }
    },
    {
      type: 'confirm',
      name: 'enUso',
      message: '¿El Cine está en uso?'
    }
  ]).then(answers => {
    const cines = cargarDatos('cines.json');
    const cine = new Cine(answers.nombre, answers.ubicacion, answers.apertura, answers.enUso, []);
    cines.push(cine);
    guardarDatos(cines, 'cines.json');
    console.log('Cine creado con éxito.');

    mostrarMenuPrincipal();
  });
}

// Función para crear una Película
function crearPelicula() {
  const cines = cargarDatos('cines.json');
  if (cines.length === 0) {
    console.log('No hay Cines registrados.');
    mostrarMenuPeliculas();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'cine',
        message: 'Selecciona un Cine:',
        choices: cines.map(cine => cine.nombre)
      }
    ]).then(answer => {
      const cine = cines.find(cine => cine.nombre === answer.cine);
      if (cine) {
        inquirer.prompt([
          {
            type: 'input',
            name: 'titulo',
            message: 'Título de la Película:'
          },
          {
            type: 'input',
            name: 'genero',
            message: 'Género de la Película:'
          },
          {
            type: 'input',
            name: 'duracion',
            message: 'Duración de la Película:'
          },
          {
            type: 'input',
            name: 'estreno',
            message: 'Fecha de estreno de la Película (YYYY-MM-DD):',
            validate: function (input) {
              const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
              if (dateRegex.test(input)) {
                return true;
              } else {
                return 'Por favor, ingresa una fecha válida en formato YYYY-MM-DD.';
              }
            }
          },
          {
            type: 'input',
            name: 'calificacion',
            message: 'Calificación de la Película:'
          }
        ]).then(answers => {
          const pelicula = new Pelicula(answers.titulo, answers.genero, answers.duracion, answers.estreno, answers.calificacion);
          cine.peliculas.push(pelicula);
          guardarDatos(cines, 'cines.json');
          console.log('Película creada con éxito.');

          mostrarMenuPeliculas();
        });
      } else {
        console.log('Cine no encontrado.');
        mostrarMenuPeliculas();
      }
    });
  }
}

// Función para leer los Cines
function leerCines() {
  const cines = cargarDatos('cines.json');
  if (cines.length === 0) {
    console.log('No hay Cines registrados.');
  } else {
    console.log('\n--- Cines ---');
    cines.forEach(cine => {
      console.log('Nombre:', cine.nombre);
      console.log('Ubicación:', cine.ubicacion);
      console.log('Fecha de apertura:', cine.apertura);
      console.log('En uso:', cine.enUso);
      console.log('Películas:', cine.peliculas.length);
      console.log('----------------------------------');
    });
  }

  mostrarMenuPrincipal();
}

// Función para leer las Películas
function leerPeliculas() {
  const cines = cargarDatos('cines.json');
  if (cines.length === 0) {
    console.log('No hay Cines registrados.');
    mostrarMenuPeliculas();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'cine',
        message: 'Selecciona un Cine:',
        choices: cines.map(cine => cine.nombre)
      }
    ]).then(answer => {
      const cine = cines.find(cine => cine.nombre === answer.cine);
      if (cine) {
        const peliculas = cine.peliculas;
        if (peliculas.length === 0) {
          console.log('No hay Películas registradas en este Cine.');
        } else {
          console.log(`--- Películas del Cine ${cine.nombre} ---`);
          peliculas.forEach(pelicula => {
            console.log('Título:', pelicula.titulo);
            console.log('Género:', pelicula.genero);
            console.log('Duración:', pelicula.duracion);
            console.log('Fecha de estreno:', pelicula.estreno);
            console.log('Calificación:', pelicula.calificacion);
            console.log('----------------------------------');
          });
        }
      } else {
        console.log('Cine no encontrado.');
      }
      mostrarMenuPeliculas();
    });
  }
}

// Función para actualizar una Película
function actualizarPelicula() {
  const cines = cargarDatos('cines.json');
  if (cines.length === 0) {
    console.log('No hay Cines registrados.');
    mostrarMenuPeliculas();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'cine',
        message: 'Selecciona un Cine:',
        choices: cines.map(cine => cine.nombre)
      }
    ]).then(answer => {
      const cine = cines.find(cine => cine.nombre === answer.cine);
      if (cine) {
        const peliculas = cine.peliculas;
        if (peliculas.length === 0) {
          console.log('No hay Películas registradas en este Cine.');
          mostrarMenuPeliculas();
        } else {
          inquirer.prompt([
            {
              type: 'input',
              name: 'titulo',
              message: 'Ingresa el título de la Película que deseas actualizar:'
            }
          ]).then(answer => {
            const pelicula = peliculas.find(pelicula => pelicula.titulo === answer.titulo);
            if (pelicula) {
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'genero',
                  message: 'Nuevo valor para el género:'
                },
                {
                  type: 'input',
                  name: 'duracion',
                  message: 'Nueva duración:'
                },
                {
                  type: 'input',
                  name: 'estreno',
                  message: 'Nueva fecha de estreno (YYYY-MM-DD):',
                  validate: function (input) {
                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                    if (dateRegex.test(input)) {
                      return true;
                    } else {
                      return 'Por favor, ingresa una fecha válida en formato YYYY-MM-DD.';
                    }
                  }
                },
                {
                  type: 'input',
                  name: 'calificacion',
                  message: 'Nueva calificación:'
                }
              ]).then(answers => {
                pelicula.genero = answers.genero;
                pelicula.duracion = answers.duracion;
                pelicula.estreno = answers.estreno;
                pelicula.calificacion = answers.calificacion;

                guardarDatos(cines, 'cines.json');
                console.log('Película actualizada con éxito.');
                mostrarMenuPeliculas();
              });
            } else {
              console.log('Película no encontrada.');
              mostrarMenuPeliculas();
            }
          });
        }
      } else {
        console.log('Cine no encontrado.');
        mostrarMenuPeliculas();
      }
    });
  }
}

// Función para eliminar una Película
function eliminarPelicula() {
  const cines = cargarDatos('cines.json');
  if (cines.length === 0) {
    console.log('No hay Cines registrados.');
    mostrarMenuPeliculas();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'cine',
        message: 'Selecciona un Cine:',
        choices: cines.map(cine => cine.nombre)
      }
    ]).then(answer => {
      const cine = cines.find(cine => cine.nombre === answer.cine);
      if (cine) {
        const peliculas = cine.peliculas;
        if (peliculas.length === 0) {
          console.log('No hay Películas registradas en este Cine.');
          mostrarMenuPeliculas();
        } else {
          inquirer.prompt([
            {
              type: 'input',
              name: 'titulo',
              message: 'Ingresa el título de la Película que deseas eliminar:'
            }
          ]).then(answer => {
            const peliculaIndex = peliculas.findIndex(pelicula => pelicula.titulo === answer.titulo);
            if (peliculaIndex !== -1) {
              peliculas.splice(peliculaIndex, 1);
              guardarDatos(cines, 'cines.json');
              console.log('Película eliminada con éxito.');
            } else {
              console.log('Película no encontrada.');
            }
            mostrarMenuPeliculas();
          });
        }
      } else {
        console.log('Cine no encontrado.');
        mostrarMenuPeliculas();
      }
    });
  }
}

// Función principal
function iniciarPrograma() {
  console.log('Bienvenido al programa de Cines y Películas.');
  mostrarMenuPrincipal();
}

// Iniciar el programa
iniciarPrograma();
