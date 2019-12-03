import { UsuarioDto } from './../models/usuario-dto';
import { TOKEN_NAME } from './../variables/var.constant';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';

import * as decode from 'jwt-decode';
import { LoginService } from '../services/login.service';

import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    sucursalSelected: number;
    constructor(private router: Router,
        private loginService: LoginService) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        this.loginService.usuarioDto.next(new UsuarioDto());
        let usuarioAuth = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        if (usuarioAuth && usuarioAuth.access_token) {
            const decodedToken = decode(usuarioAuth.access_token);
            if (decodedToken && decodedToken.user_name) {
                this.loginService.obtenerUsuarioActual(decodedToken.user_name).subscribe(resp => {
                    if (resp) {
                        this.loginService.usuarioDto.next(resp);
                    }
                });
                return true;
            } else {
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        } else {
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
