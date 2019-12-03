import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HOST } from '../variables/var.constant';



@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url: string = `${HOST}/api/venta`;

  constructor(private http: HttpClient) { }

  guardar(venta: any): Observable<any> {
    return this.http.post(`${this.url}`, venta);
  }

  actualizar(venta: any): Observable<any> {
    return this.http.put(`${this.url}`, venta);
  }

  listar() {
    return this.http.get<any[]>(this.url);
  }

}
