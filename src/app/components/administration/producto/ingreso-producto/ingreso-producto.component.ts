import { Component, OnInit, Inject } from '@angular/core';
import { Ingreso } from '../../../../models/ingreso';
import { USER } from '../../../../variables/var.constant';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Producto } from '../../../../models/producto';
import { Router } from '@angular/router';
import { IngresoService } from '../../../../services/insertarService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.scss']
})
export class IngresoProductoComponent implements OnInit {

  insertProductoForm: FormGroup;
  producto: Producto = new Producto();
  ingresoObj: Ingreso = new Ingreso();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ingresoService: IngresoService,
    public dialogRef: MatDialogRef<IngresoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {    
    this.insertProductoForm = this.formBuilder.group({    
      cantidad: ['', Validators.required]
    });
  }
  
  insertarProducto(): void {
    debugger;
    this.producto = this.data.producto;
    //let usuario: any = JSON.parse(sessionStorage.getItem(USER));
    
    let ingreso: Ingreso = {
      cantidad: this.insertProductoForm.get('cantidad').value,
      producto: {
        id: this.producto.id
      },
      usuario: {
        id: 1
        /*total: this.insertProductoForm.get('total').value*/
      },
    }
    /*ingreso=this.producto*/
    this.ingresoService.guardarIngreso(ingreso).subscribe(resp => {
      if (resp) {
        this.dialogRef.close();
      }
    })

  }

}
