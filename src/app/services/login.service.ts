import { MenuDto } from './../models/menu-dto';
import { UsuarioDto } from './../models/usuario-dto';
import { HOST, TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME } from './../variables/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = `${HOST}/oauth/token`;
  usuarioDto = new Subject<UsuarioDto>();

  menuDto = new Subject<MenuDto>();

  constructor(private http: HttpClient, 
    private router: Router) { }

  login(username:string, password:string){
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    });
  }


  obtenerUsuarioActual(username: string) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<UsuarioDto>(`${HOST}/api/usuarios/usuario/${username}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
  
  obtenerPorCedula(cedula: string) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<UsuarioDto>(`${HOST}/api/usuarios/cedula/${cedula}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }


  cerrarSesion(): void {
    let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    if (token) {
      this.http.get(`${HOST}/api/usuarios/anular/${token.access_token}`).subscribe(data => {
      });
    }
    sessionStorage.clear();
    this.usuarioDto.next(new UsuarioDto());
    this.menuDto.next(new MenuDto());
    this.router.navigate(['/login']);

  }
}
