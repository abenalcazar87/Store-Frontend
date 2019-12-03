import { Articulo } from './../../../models/articulo';
import { ArticuloService } from '../../../services/articulo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddArticleComponent } from '../add-article/add-article.component';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'cantidad', 'acciones'];
  dataSource: MatTableDataSource<Articulo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  cantidad: number;
  itemsPage: number;

  constructor(private articuloService: ArticuloService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
   

    this.listarArticulos(0, 10);
    this.itemsPage = 10;
  }


  private listarArticulos(page: number, size: number) {
    this.articuloService.listarPageable(page, size).subscribe(data => {
      let respuesta: any = data;
      this.cantidad = respuesta.totalElements;
      this.dataSource = new MatTableDataSource(respuesta.content);
      if (page === 0) {
        this.paginator.firstPage();
      }
    });

  }
  editar(articulo: Articulo): void {
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '650px',
      data: { articulo: articulo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("Articulo editado exitosamente!", "OK")
        this.listarArticulos(0, 10);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '650px',
      data: { articulo: new Articulo() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.error && result.error.status === 409) {
          this.openSnackBar(result.error.detalle, "OK");
        } else {
          this.openSnackBar("Articulo agregado exitosamente!", "OK");
          this.listarArticulos(0, 10);
        }
      }
    });
  }

  eliminar(articulo: Articulo): void {
    this.articuloService.eliminar(articulo.id).subscribe(resp => {
      this.openSnackBar("Articulo elimanado exitosamente!", "OK");
      this.listarArticulos(0, 10);  
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

  mostrarMas(e: any) {
    this.itemsPage = e.pageSize;
    this.listarArticulos(e.pageIndex, e.pageSize);
  }


  imprimirItem():void{
    this.articuloService.imprimir().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'listaProductos.pdf';
      a.click();
      return url;
    });
  }
}
