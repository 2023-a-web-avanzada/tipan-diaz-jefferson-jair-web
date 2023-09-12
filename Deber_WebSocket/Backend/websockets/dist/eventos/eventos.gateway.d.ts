import { Server, Socket } from 'socket.io';
import { SalasInterface } from "../Interfaces/salas.interface";
export declare class EventosGateway {
    arregloSalasJugadores: SalasInterface[];
    server: Server;
    unirJugadorSala(message: any, socket: Socket): void;
    getSala(salaId: string): SalasInterface;
    nuevaPalabra(message: any, socket: Socket): void;
    listaDePalabras(message: any, socket: Socket): void;
    salirJuego(message: any, socket: Socket): void;
}
