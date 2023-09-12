"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let EventosGateway = class EventosGateway {
    constructor() {
        this.arregloSalasJugadores = [];
    }
    unirJugadorSala(message, socket) {
        socket.join(message.salaId);
        const salaExiste = this.getSala(message.salaId);
        if (salaExiste) {
            salaExiste.listaJugadores.push(message.apodo);
            this.server.to(message.salaId).emit('RespuestaUnirseSala', { message: 'Un nuevo jugador ingresó -', apodo: message.apodo });
        }
        else {
            const salaNueva = { salaId: message.salaId, listaJugadores: [message.apodo], jugadorTurno: message.apodo, listaPalabras: ['Mundo'] };
            this.arregloSalasJugadores.push(salaNueva);
            socket.emit('RespuestaUnirseSala', { message: 'Bienvenido al Juego', apodo: message.apodo });
        }
    }
    getSala(salaId) {
        let salaEncontrada;
        this.arregloSalasJugadores.forEach(sala => {
            if (sala.salaId === salaId) {
                salaEncontrada = sala;
            }
        });
        return salaEncontrada;
    }
    nuevaPalabra(message, socket) {
        const salaExiste = this.getSala(message.salaId);
        if (salaExiste) {
            salaExiste.listaPalabras.push(message.palabra);
            let siguienteJugadorIndex = salaExiste.listaJugadores.indexOf(salaExiste.jugadorTurno) + 1;
            if (siguienteJugadorIndex >= salaExiste.listaJugadores.length) {
                siguienteJugadorIndex = 0;
            }
            const siguienteJugador = salaExiste.listaJugadores[siguienteJugadorIndex];
            salaExiste.jugadorTurno = siguienteJugador;
            this.server.to(message.salaId).emit('RespuestaPalabraNueva', { mensaje: 'Palabra Añadida', turno: siguienteJugador });
        }
    }
    listaDePalabras(message, socket) {
        const salaExiste = this.getSala(message.salaId);
        if (salaExiste) {
            socket.emit('RespuestaListaDePalabras', { listaPalabras: salaExiste.listaPalabras, turno: salaExiste.jugadorTurno });
        }
    }
    salirJuego(message, socket) {
        let salaExiste = this.getSala(message.salaId);
        if (salaExiste) {
            socket.leave(message.salaId);
            if (salaExiste.listaJugadores.length <= 1) {
                this.arregloSalasJugadores.splice(this.arregloSalasJugadores.indexOf(salaExiste));
            }
            else {
                if (salaExiste.jugadorTurno === message.apodo) {
                    let siguienteJugadorIndex = salaExiste.listaJugadores.indexOf(salaExiste.jugadorTurno) + 1;
                    if (siguienteJugadorIndex >= salaExiste.listaJugadores.length) {
                        siguienteJugadorIndex = 0;
                    }
                    salaExiste.jugadorTurno = salaExiste.listaJugadores[siguienteJugadorIndex];
                }
                socket.to(message.salaId).emit('RespuestaSalirJuego', { message: message.apodo + ' ha salido del juego', turno: salaExiste.jugadorTurno });
            }
            salaExiste.listaJugadores.splice(salaExiste.listaJugadores.indexOf(message.apodo));
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventosGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('unirseSala'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventosGateway.prototype, "unirJugadorSala", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('nuevaPalabra'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventosGateway.prototype, "nuevaPalabra", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('listaDePalabras'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventosGateway.prototype, "listaDePalabras", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('salirJuego'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventosGateway.prototype, "salirJuego", null);
EventosGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(8080, {
        cors: {
            origin: '*'
        }
    })
], EventosGateway);
exports.EventosGateway = EventosGateway;
//# sourceMappingURL=eventos.gateway.js.map