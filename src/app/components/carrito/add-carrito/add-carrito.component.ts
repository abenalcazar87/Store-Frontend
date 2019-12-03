import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-add-carrito',
  templateUrl: './add-carrito.component.html',
  styleUrls: ['./add-carrito.component.scss']
})
export class AddCarritoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddCarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto) { }

  ngOnInit() {
  }

  save() {   
    debugger;
      this.data.cantidad = this.data.cantidad -1;
      console.log(this.data.cantidad);
      this.dialogRef.close("resultado"); 
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
