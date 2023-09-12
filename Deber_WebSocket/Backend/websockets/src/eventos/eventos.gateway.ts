import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import {SalasInterface} from "../Interfaces/salas.interface";

@WebSocketGateway(
    8080,
    {
        cors:{
            origin: '*'
        }
    }
)

export class EventosGateway{

    //Almacenar la información las salas y los jugadores
    arregloSalasJugadores : SalasInterface [] = []
    @WebSocketServer()
        server: Server

    @SubscribeMessage('unirseSala')
    unirJugadorSala(
        @MessageBody()
        message,
        @ConnectedSocket()
        socket: Socket
    ){
        socket.join(message.salaId)
        const salaExiste = this.getSala(message.salaId)

        if(salaExiste){
            salaExiste.listaJugadores.push(message.apodo)
            this.server.to(message.salaId).emit('RespuestaUnirseSala', {message:'Un nuevo jugador ingresó -', apodo: message.apodo} )
        } else {
            const salaNueva :SalasInterface = {salaId: message.salaId, listaJugadores: [message.apodo], jugadorTurno: message.apodo, listaPalabras: ['Mundo']}
            this.arregloSalasJugadores.push(salaNueva)
            socket.emit('RespuestaUnirseSala', {message:'Bienvenido al Juego', apodo: message.apodo})
        }

    }

    getSala(salaId: string){
        let salaEncontrada: SalasInterface
        this.arregloSalasJugadores.forEach(
            sala => {
                if(sala.salaId === salaId){
                    salaEncontrada = sala
                }
            }
        )
        return salaEncontrada
    }

    @SubscribeMessage('nuevaPalabra')
    nuevaPalabra(
        @MessageBody()
            message,
        @ConnectedSocket()
            socket: Socket
    ){
        const salaExiste = this.getSala(message.salaId)
        if(salaExiste) {
            salaExiste.listaPalabras.push(message.palabra)
            let siguienteJugadorIndex = salaExiste.listaJugadores.indexOf(salaExiste.jugadorTurno) + 1
            if(siguienteJugadorIndex >= salaExiste.listaJugadores.length){
                siguienteJugadorIndex = 0
            }
            const siguienteJugador = salaExiste.listaJugadores[siguienteJugadorIndex]
            salaExiste.jugadorTurno = siguienteJugador
            this.server.to(message.salaId).emit('RespuestaPalabraNueva', {mensaje:'Palabra Añadida', turno: siguienteJugador})
        }
    }

    @SubscribeMessage('listaDePalabras')
    listaDePalabras(
        @MessageBody()
            message,
        @ConnectedSocket()
            socket: Socket
    ){
        const salaExiste = this.getSala(message.salaId)
        if(salaExiste){
            socket.emit('RespuestaListaDePalabras', {listaPalabras: salaExiste.listaPalabras, turno: salaExiste.jugadorTurno})
        }
    }

    @SubscribeMessage('salirJuego')
    salirJuego(
        @MessageBody()
            message,
        @ConnectedSocket()
            socket: Socket
    ){
        let salaExiste = this.getSala(message.salaId)
        if(salaExiste){
            socket.leave(message.salaId)
            if (salaExiste.listaJugadores.length <= 1){
                this.arregloSalasJugadores.splice(this.arregloSalasJugadores.indexOf(salaExiste))
            } else{
                if (salaExiste.jugadorTurno === message.apodo){
                    let siguienteJugadorIndex = salaExiste.listaJugadores.indexOf(salaExiste.jugadorTurno) + 1
                    if(siguienteJugadorIndex >= salaExiste.listaJugadores.length){
                        siguienteJugadorIndex = 0
                    }
                    salaExiste.jugadorTurno = salaExiste.listaJugadores[siguienteJugadorIndex]
                }
                socket.to(message.salaId).emit('RespuestaSalirJuego', {message: message.apodo + ' ha salido del juego', turno: salaExiste.jugadorTurno})
            }
            salaExiste.listaJugadores.splice(salaExiste.listaJugadores.indexOf(message.apodo));
        }
    }

}