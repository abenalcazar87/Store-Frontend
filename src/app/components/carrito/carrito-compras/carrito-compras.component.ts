import { Component, OnInit, ViewChild } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Producto } from '../../../models/producto';
import { Usuario } from '../../../models/usuario';
import { USER } from '../../../variables/var.constant';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.scss']
})
export class CarritoComprasComponent implements OnInit {

  constructor(private ventaService: VentaService, 
    private snackBar: MatSnackBar, private router: Router) { }

  displayedColumns: string[] = ['nombre', 'cantidad', 'subtotal', 'iva', 'total'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  productos: Producto[];
  usuario: Usuario;
  contadorProductos;

  ngOnInit() {
    debugger;
    this.usuario = JSON.parse(sessionStorage.getItem(USER));
    console.log("carritod e compras user", this.usuario);
    this.productos = this.usuario.itemsCarrito;
    this.contadorProductos = this.usuario.itemsCarrito.length;
    this.productos.forEach(p => {
      p.subtotal = p.precio;
      p.iva = p.precio * 0.12;
      p.total = p.subtotal + p.iva;
    });


    this.dataSource = new MatTableDataSource(this.productos);
    this.dataSource.paginator = this.paginator;
  }

  comprar() {
    console.log("carrito de compras user", this.usuario);
    let subtotal: number = 0;
    let iva: number = 0;
    let total: number = 0;
    let detalleList: any[] = new Array();


    this.productos.forEach(p => {
      subtotal = subtotal + p.subtotal;

      detalleList.push({
        producto: {
          id: p.id
        },
        cantidad: 1,
        subtotal: p.subtotal,
        total: p.total
      })
    });
    let compra: any = {
      subtotal: subtotal,
      iva: subtotal * 0.12,
      total: subtotal + iva,
      usuario: {
        id: this.usuario.id,
        email: this.usuario.email
      },
      detalleList: detalleList
    }
    debugger;
    console.log("compra----------->",compra);
    this.ventaService.guardar(compra).subscribe(resp => {
      if(resp){
        this.usuario.itemsCarrito = new Array();
        //sessionStorage.setItem(USER, JSON.stringify(this.usuario));
        this.openSnackBar("La compra se realizó exitosamente!", "OK", );
        this.router.navigate(["/home"]);
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}


