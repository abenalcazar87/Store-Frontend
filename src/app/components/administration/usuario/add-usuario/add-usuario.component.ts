import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from '../../../../models/persona';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const CEDULA_REGEX = /^[0-9]+$/;
const PHONE_REGEXP = /^[0-9]+$/;
@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit, AfterContentInit {

  usuarioForm: FormGroup;
  usuario: Usuario = {};

  roles: Rol[] = [
    {value: '1', viewValue: 'Administrador'},
    {value: '2', viewValue: 'Ventas'}
  ];

  tiposSangre: TipoSangre[] = [
    {value: 'O+', viewValue: 'O Positivo'},
    {value: 'O-', viewValue: 'O Negativo'}
  ];

  constructor(
    public dialogRef: MatDialogRef<AddUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    debugger;
    this.usuarioForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      cedula: ['', [Validators.required, Validators.pattern(CEDULA_REGEX)]],
      password: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(PHONE_REGEXP)]],
      rol: ['']
    });
  }

  ngAfterContentInit() {
    //date = new FormControl(new Date());
    debugger;    
    this.usuario = this.data.usuario;
    if (this.usuario.id) {
      this.usuarioForm = this.formBuilder.group({
        nombres: [this.usuario.nombres, [Validators.required, Validators.minLength(5)]],
        apellidos: [this.usuario.apellidos],
        email: [this.usuario.email, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        cedula: [this.usuario.cedula, [Validators.required, Validators.pattern(CEDULA_REGEX)]],
        password: [this.usuario.direccion, Validators.required],
        direccion: [this.usuario.direccion, Validators.required],
        telefono: [this.usuario.telefono,[Validators.required, Validators.pattern(PHONE_REGEXP)]],
        rol: [this.usuario.rol]
      });
    }
  }

  guardar(): void {
    debugger;
    let usuario: Usuario = {
      nombres: this.usuarioForm.get('nombres').value,
      apellidos: this.usuarioForm.get('apellidos').value,
      email: this.usuarioForm.get('email').value,
      cedula: this.usuarioForm.get('cedula').value,
      password: this.usuarioForm.get('password').value,      
      direccion: this.usuarioForm.get('direccion').value,
      telefono: this.usuarioForm.get('telefono').value,
      rol: this.usuarioForm.get('rol').value
    };
    
    if (this.usuario.id) {
      usuario.id = this.usuario.id;
      this.usuarioService.actualizar(usuario).subscribe(resp => {
        this.dialogRef.close(resp);
      }, error => {
        console.log(error);
        this.dialogRef.close(error);
      });
    } else {
      this.usuarioService.guardar(usuario).subscribe(resp => {
        this.dialogRef.close(resp);
      }, error => {
        console.log(error);
        this.dialogRef.close(error);
      });
    }

  }
}

export interface Rol {
  value: string;
  viewValue: string;
}

export interface TipoSangre {
  value: string;
  viewValue: string;
}
