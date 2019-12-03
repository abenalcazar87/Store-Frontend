import { TOKEN_NAME } from './../variables/var.constant';
import { Persona } from './../models/persona';
import { Injectable } from '@angular/core';
import { HOST } from '../variables/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  // url: string = HOST + "/api/articulos";
  url: string = `${HOST}/api/personas`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Persona[]> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Persona[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  guardar(persona: Persona): Observable<Persona> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Persona>(this.url, persona, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  actualizar(persona: Persona): Observable<Persona> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put<Persona>(this.url, persona, {
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
