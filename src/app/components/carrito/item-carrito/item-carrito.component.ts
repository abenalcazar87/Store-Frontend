import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Producto } from '../../../models/producto';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { USER } from '../../../variables/var.constant';
import { AddCarritoComponent } from '../add-carrito/add-carrito.component';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.scss']
})
export class ItemCarritoComponent implements OnInit {

  usuario: Usuario;
  @Input() producto: Producto;
  @Input() isVisibleFooter: boolean;
  @Input() isVisibleCarrito: boolean;

  constructor(private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem(USER));

  }


  agregarcarritoCompras(producto: Producto): void {
    debugger;
    let dialogRef = this.dialog.open(AddCarritoComponent, {
      width: '350px',
      data: { producto: this.producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed ", result);

      if (this.usuario) {
        if (result) {
          debugger;
          if (!this.usuario.itemsCarrito) {
            this.usuario.itemsCarrito = new Array();
          }
          this.openSnackBar("Producto Agregado al Carrito de Compras", "OK");
          this.usuario.itemsCarrito.push(producto);
          sessionStorage.setItem(USER, JSON.stringify(this.usuario));
        }
      } else {
        this.openSnackBar("Debe Autenticarse para realizar una compra.", "OK");
        this.router.navigate(["/login"]);
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
