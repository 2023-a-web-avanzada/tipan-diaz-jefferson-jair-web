import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  constructor(private socket: Socket) { }

  ejecutarEventoUnirseSala(apodo: string, salaId: string) : Observable<any>{
    return this.socket.emit('unirseSala', {
      apodo: apodo, salaId: salaId
    })
  }

  escucharRespuestaServidor(){
    return this.socket.fromEvent('RespuestaUnirseSala')
  }

  ejecutarEventoNuevaPalabra(palabra: string, salaId: string): Observable<any>{
    return this.socket.emit('nuevaPalabra',{
      palabra: palabra, salaId: salaId
    })
  }

  escucharRespuestaPalabraNueva(){
    return this.socket.fromEvent('RespuestaPalabraNueva')
  }

  ejecutarEventoEscucharPalabras(salaId: string) : Observable<any> {
    return this.socket.emit('listaDePalabras',{
      salaId: salaId
    })
  }

  escucharRespuestaListaPalabras(){
    return this.socket.fromEvent('RespuestaListaDePalabras')
  }

  ejecutarEventoSalirJuego(salaId: string, apodo: string) : Observable<any> {
    return this.socket.emit('salirJuego',{
      salaId: salaId, apodo: apodo
    })
  }

  escucharRespuestaSalirJuego(){
    return this.socket.fromEvent('RespuestaSalirJuego')
  }

}
