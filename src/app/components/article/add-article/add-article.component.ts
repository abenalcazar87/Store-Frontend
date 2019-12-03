import { ArticuloService } from '../../../services/articulo.service';
import { Articulo } from './../../../models/articulo';
import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit, AfterContentInit {

  articuloForm: FormGroup;
  articulo: Articulo = {};

  categorias: any[] = [
    {
      "id": "CAT_ZAPATOS",
      "nombre": "Categoria De Zapatos"
    },
    {
      "id": "CAT_ROPA",
      "nombre": "Categoria De Ropa"
    }
  ]
  constructor(
    public dialogRef: MatDialogRef<AddArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private articuloService: ArticuloService) { }

  ngOnInit() {
    this.articuloForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: [''],
      url: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoria: [''],
      descuento: ['']
    });
  }

  ngAfterContentInit() {
    this.articulo = this.data.articulo;
    if (this.articulo.id) {
      this.articuloForm = this.formBuilder.group({
        nombre: [this.articulo.nombre, [Validators.required, Validators.minLength(5)]],
        descripcion: [this.articulo.descripcion],
        url: [this.articulo.url, Validators.required],
        precio: [this.articulo.precio, Validators.required],
        cantidad: [this.articulo.cantidad, Validators.required],
        categoria: [this.articulo.categoria.id],
        descuento: [this.articulo.descuento]
      });
    }
  }

  guardar(): void {
    let articulo: Articulo = {
      nombre: this.articuloForm.get('nombre').value,
      descripcion: this.articuloForm.get('descripcion').value,
      url: this.articuloForm.get('url').value,
      precio: this.articuloForm.get('precio').value,
      cantidad: this.articuloForm.get('cantidad').value,
      descuento: this.articuloForm.get('descuento').value,
      categoria: {
        id: this.articuloForm.get('categoria').value
      }
    };

    if (this.articulo.id) {
      articulo.id = this.articulo.id;
      this.articuloService.actualizar(articulo).subscribe(resp => {
        this.dialogRef.close(resp);
      }, error => {
        console.log(error);
        this.dialogRef.close(error);
      });
    } else {
      this.articuloService.guardar(articulo).subscribe(resp => {
        this.dialogRef.close(resp);
      }, error => {
        console.log(error);
        this.dialogRef.close(error);
      });
    }



  }
}
