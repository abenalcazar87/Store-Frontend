import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss']
})
export class AddProductoComponent implements OnInit {

  productoForm: FormGroup;
  producto: Producto = {};

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<AddProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  ngAfterContentInit() {
    debugger;
    this.producto = this.data.producto;
    if (this.producto && this.producto.id) {
      this.productoForm = this.formBuilder.group({
        nombre: [this.producto.nombre, [Validators.required, Validators.minLength(5)]],
        descripcion: [this.producto.descripcion],
        url: [this.producto.url, Validators.required],
        precio: [this.producto.precio, Validators.required],
        cantidad: [this.producto.cantidad, Validators.required],
        categoria: [this.producto.categoria.id]
      });
    }
  }


  guardarProducto(): void {
    debugger;
    let producto: Producto = {
      descripcion: this.productoForm.get('descripcion').value,
      nombre: this.productoForm.get('nombre').value,
      precio: this.productoForm.get('precio').value,
      cantidad: this.productoForm.get('cantidad').value,
      url: this.productoForm.get('url').value,
      categoria: {
        codigo: '1'
      }
    };
    if (this.producto.id) {
      producto.id = this.producto.id;
      this.productoService.actualizar(producto).subscribe(resp => {
        this.dialogRef.close(resp);
      }, error => {
        console.log(error);
        this.dialogRef.close(error);
      });
    } else {
      debugger;
      this.productoService.guardar(producto).subscribe(resp => {
        this.dialogRef.close(resp);
      }, error => {
        console.log(error);
        this.dialogRef.close(error);
      });
    }
  }

}
