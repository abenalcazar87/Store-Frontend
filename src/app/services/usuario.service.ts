import { TOKEN_NAME } from './../variables/var.constant';
import { Injectable } from '@angular/core';
import { HOST } from '../variables/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 // url: string = HOST + "/api/articulos";
 url: string = `${HOST}/api/usuarios`;

 constructor(private http: HttpClient) { }

 listar(): Observable<Usuario[]> {
   let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
   return this.http.get<Usuario[]>(this.url, {
     headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
   });
 }

 guardar(usuario: Usuario): Observable<Usuario> {
   let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
   return this.http.post<Usuario>(this.url, usuario, {
     headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
   });
 }

 actualizar(usuario: Usuario): Observable<Usuario> {
   let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
   return this.http.put<Usuario>(this.url, usuario, {
     headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
   });
 }

 eliminar(id: number): Observable<any> {
   let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
   return this.http.delete<any>(`${this.url}/${id}`, {
     headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
   });
 }
 

 imprimir() {    
   let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
     return this.http.get(`${this.url}/imprimir`, {
       headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json'),
       responseType: 'blob'
     });
   }
}
