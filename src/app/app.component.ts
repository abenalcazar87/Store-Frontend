import { TOKEN_NAME } from './variables/var.constant';
import { MenuDto } from './models/menu-dto';
import { UsuarioDto } from './models/usuario-dto';
import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

import * as decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  usuarioActual: UsuarioDto;
  moduloActual: MenuDto;

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.usuarioDto.subscribe(data => {
      this.usuarioActual = data;
    });

    this.loginService.menuDto.subscribe(data => {
      this.moduloActual = data;
    });
  }

  home() {
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = decode(tk.access_token);

    this.loginService.obtenerUsuarioActual(decodedToken.user_name).subscribe(resp => {
      if (resp) {
        this.loginService.usuarioDto.next(resp);
        this.moduloActual = null;
      }
    }, error => {
      console.log(error);
    });
  }

  logout(): void {
    this.loginService.usuarioDto.next(null);
    this.loginService.cerrarSesion();
  }
}
