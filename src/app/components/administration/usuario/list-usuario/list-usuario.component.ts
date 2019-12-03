import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSnackBar, MatDialog , MatSort} from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaService } from '../../../../services/persona.service';
import { ShowPdfComponent } from '../../../pdf/show-pdf/show-pdf.component';
import { Usuario } from '../../../../models/usuario';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent implements OnInit {

  pdfSrc: String = "";

  displayedColumns: string[] = ['nombres', 'apellidos', 'cedula', 'direccion', 'telefono', 
                                //'fechaNacimiento',
                                //'sexo', 
                                //'tipoSangre', 
                                'rol', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //direccion: number;
  //itemsPage: number;

  constructor(private usuarioService: UsuarioService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    debugger;
    this.listarUsuarios();
  }

  private listarUsuarios() {
    this.usuarioService.listar().subscribe(data => {
      let respuesta: any = data;
      //ordenar data
      console.log(data)
      this.dataSource = new MatTableDataSource(respuesta);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editar(usuario: Usuario): void {
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '650px',
      data: { usuario: usuario }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("Usuario editado exitosamente!", "OK")
        this.listarUsuarios();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '650px',
      data: { usuario: new Usuario() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.error && result.error.status === 409) {
          this.openSnackBar(result.error.detalle, "OK");
        } else {
          this.openSnackBar("Usuario agregado exitosamente!", "OK");
          this.listarUsuarios();
        }
      }
    });
  }

  eliminar(usuario: Usuario): void {
    this.usuarioService.eliminar(usuario.id).subscribe(resp => {
      this.openSnackBar("Usuario eliminado exitosamente!", "OK");
      this.listarUsuarios();
    }, error => {
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: 6000
    });
  }  


  imprimirItem():void{
    debugger;
    this.usuarioService.imprimir().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'listaPersonas.pdf';
      a.click();
      return url;
    });
  }

  openPdf(url: String): void {
    const dialogRef = this.dialog.open(ShowPdfComponent, {
      width: '900px', 
      height: '500px',
      data: { url: url }
    });
  }

  displayUsuario(val: Usuario) {
    return val ? val.cedula : val;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}