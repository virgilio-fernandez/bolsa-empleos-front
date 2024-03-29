import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ocupacion } from '../../../../../models/ocupacion/ocupacion.model';
import { OcupacionService } from '../../../../../services/administrador/ocupacion.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../../services/login.service';
import { OcupacionSolicitanteService } from '../../../../../services/solicitante/ocupacion-solicitante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-ocupacion-solicitante',
  templateUrl: './formulario-ocupacion-solicitante.component.html',
  styleUrls: ['./formulario-ocupacion-solicitante.component.css']
})
export class FormularioOcupacionSolicitanteComponent implements OnInit {
  @Input() visible: boolean;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter();
  ocupaciones: Ocupacion[];
  formSubmitted = false;
  cargandoModal = true;
  cargando = false;
  constructor(private ocupacionService: OcupacionService,
              private ocupacionSolicitanteService: OcupacionSolicitanteService,
              private fb: FormBuilder,
              private loginService: LoginService) { }
  public ocupacionForm = this.fb.group({
    ocupacion: [ null , [ Validators.required]],
    solicitante: [ this.loginService.solicitante, [Validators.required]]
  });
  ngOnInit() {
    this.cargarOcupaciones();
  }

  cargarOcupaciones(): void {
    this.ocupacionService.listarNoAsignadasSolicitante(this.loginService.solicitante.id)
    .subscribe( (resp: Ocupacion[]) => {
      this.ocupaciones = resp;
      this.cargandoModal = false;
    }, (err) => {
      console.log(err);
    });
  }
  select2NoValido(campo: string): boolean {
    const valor = this.ocupacionForm.get(campo).value;
    if ( valor === '' && this.formSubmitted) {
      return true;
  }
    if ( valor === 0 && this.formSubmitted) {
        return true;
    }
    if ( valor === null && this.formSubmitted) {
      return true;
    }
    if ( valor !== 0 && this.formSubmitted) {
      return false;
    }
  }

  guardar(): void {
    this.formSubmitted = true;
    if (this.ocupacionForm.invalid) {
      return;
    }
    this.cargando = true;
    this.ocupacionSolicitanteService.adicionar(this.ocupacionForm.value)
        .subscribe( (resp: any) => {
          console.log('Ocupacion Asignada');
          Swal.fire(resp.mensaje, '', 'success');
          this.cargando = false;
          this.cerrarModal();
        }, (err) => {
          console.log(err);
          this.cargando = false;
          Swal.fire('Error al asignar Ocupacion', err.error.mensaje, 'error');
        });
  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  cancelarModal() {
    this.cancelar.emit(false);
  }
}
