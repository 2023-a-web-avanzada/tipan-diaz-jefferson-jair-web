import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Rutas/inicio/inicio.component';
import { JuegoComponent } from './Rutas/juego/juego.component';
import {SocketIoModule} from "ngx-socket-io";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    JuegoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({
      url: 'ws://localhost:8080',
      options: {}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
