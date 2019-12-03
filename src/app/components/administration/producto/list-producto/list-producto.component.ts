import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatDialog, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Usuario } from '../../../../models/usuario';
import { ProductoService } from '../../../../services/producto.service';
import { USER } from '../../../../variables/var.constant';
import { AddProductoComponent } from '../add-producto/add-producto.component';
import { IngresoProductoComponent } from '../ingreso-producto/ingreso-producto.component';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.scss']
})
export class ListProductoComponent implements OnInit {

  displayedColumns = ['nombre', 'precio', 'cantidad', 'acciones', 'ingresar'];
  dataSource: MatTableDataSource<Producto>;
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  producto: Producto = new Producto();

  constructor(private productoService: ProductoService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    let usuario: Usuario = JSON.parse(sessionStorage.getItem(USER));
    this.listarProductos();

  }

  listarProductos() {
    debugger;
    this.productoService.listar().subscribe(data => {
      let respuesta: any = data;
      this.dataSource = new MatTableDataSource(respuesta.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  nuevoProducto(): void {
    const dialogRef = this.dialog.open(AddProductoComponent, {
      width: '500px',
      data: { producto: new Producto() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.error && result.error.status === 409) {
          this.openSnackBar(result.error.detalle, "OK");
        } else {
          this.openSnackBar("Producto agregado exitosamente!", "OK");
          debugger;
          this.listarProductos();
        }
      }
    });
  }

  editarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(AddProductoComponent, {
      width: '650px',
      data: { producto: producto }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("Producto guardado exitosamente!", "OK")
        this.listarProductos();
      }
    });
  }

  insertProducto(producto: Producto) {
    const dialogRef = this.dialog.open(IngresoProductoComponent, {
      width: '500px',
      data: { producto: producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Se ha cerrado el dialogo');
      this.listarProductos();
      this.openSnackBar("Se ha realizado una insercion del producto!", "OK");
    });
  }




  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  displayProducto(val: Producto) {
    return val ? val.nombre : val;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

