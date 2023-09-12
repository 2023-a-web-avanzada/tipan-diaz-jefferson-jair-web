import {Component, OnInit} from '@angular/core';
import {WebsocketsService} from "../../Servicios/websockets.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  constructor(
    private readonly websocketsService:WebsocketsService,
    private readonly formBuilder:FormBuilder,
    private readonly router:Router
  ) { }

  //Datos globales

  listaSuscripcion: Subscription[] = []
  formGroup?: FormGroup

  //Preparar el formulario reactivo

  prepararFormulario(){
    this.formGroup = this.formBuilder.group({
      apodo: new FormControl({
        value: '',
        disabled: false,
      },[
          Validators.required
      ]),
      salaId: new FormControl({
        value: '',
        disabled: false,
      }, [
          Validators.required
        ]),
    })
  }

  //Métodos que permite moverse a la sala

  unirseSala(){
    if (this.formGroup){
      this.websocketsService.ejecutarEventoUnirseSala(this.formGroup.get('apodo')?.value, this.formGroup.get('salaId')?.value);
    }
  }

  respuesta(){
    const suscripcion = this.websocketsService.escucharRespuestaServidor()
      .subscribe({
        next: (datos: any) =>{
          //Mensaje de bienvenida
          Swal.fire({
            title: '¡Excelente!',
            text: datos.message + ' ' + datos.apodo,
            icon: 'success',
            confirmButtonText: 'Continuar'
          })
          this.router.navigate(['/juego',this.formGroup?.get('salaId')?.value, this.formGroup?.get('apodo')?.value])
        }
      })
      this.listaSuscripcion.push(suscripcion)
  }

  //El servidor desde el inicio prepara el formulario y esta escuchando al servidor

  ngOnInit(): void {
    this.prepararFormulario()
    this.respuesta()
  }

}
