import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HOST, TOKEN_NAME } from '../variables/var.constant';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //url: string = `${HOST}/producto`;
  url: string = `${HOST}/api/producto`;

  constructor(private http: HttpClient) { }

  guardar(producto: Producto): Observable<Producto> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Producto>(this.url, producto, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  actualizar(producto: Producto): Observable<Producto> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put<Producto>(this.url, producto, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listar() {
    return this.http.get<Producto[]>(this.url);
  }

}
