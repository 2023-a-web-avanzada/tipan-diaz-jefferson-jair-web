// 09-inquirer.js
// npm init -> package.jso -> dependencias -> script
// npm install inquirer -> npm i inquirer
// node_modules -> estan las dependencias

import inquirer from "inquirer"; 

async function main(){
    try{
        const respuesta = await inquirer.prompt([
            {
                type: 'input',
                name: 'apellido',
                message: 'Ingresa Tu Nombre'
            },
            {
                type: 'input',
                name: 'edad',
                message: 'Ingresa Tu Edad'
            }
        ]);
        console.log('Respuesta', respuesta);
    } catch (e) { console.error(e);}
}
main();