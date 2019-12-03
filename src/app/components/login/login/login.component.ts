import { TOKEN_NAME, USER } from './../../../variables/var.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { LoginService } from '../../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as decode from 'jwt-decode';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

    email: string;
    password: string;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    /*this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });*/
  }

  login(): void {
    /*let username = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;*/

    let username = this.email;
    let password = this.password;

    this.loginService.login(username, password).subscribe(resp => {
      let token = JSON.stringify(resp);
      sessionStorage.setItem(TOKEN_NAME, token);

      let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
      const decodedToken = decode(tk.access_token);

      this.loginService.obtenerUsuarioActual(decodedToken.user_name).subscribe(resp => {
        if (resp) {
          sessionStorage.setItem(USER, JSON.stringify(resp));
          let usert = JSON.parse(sessionStorage.getItem(USER));
          console.log("------==========----------=====",usert);
          this.loginService.usuarioDto.next(resp);
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigate(["/home"]);
          }
        }
      }, error => {
        console.log(error);
        this.openSnackBar("Ingrese credenciales válidas!", "OK", );
      });
    }, error => {
      this.openSnackBar("Ingrese credenciales válidas!", "OK", );
    });
  }


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
