import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../models/usuario-dto';
import { LoginService } from '../../services/login.service';
import { MenuDto } from '../../models/menu-dto';
import { Producto } from '../../models/producto';
import { Usuario } from '../../models/usuario';
import { ProductoService } from '../../services/producto.service';
import { USER } from '../../variables/var.constant';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuarioActual1: UsuarioDto;
  moduloActual: MenuDto;
  productos: Producto[] = new Array();
  usuario: Usuario;
  isVisibleCarrito: boolean;
  usuarioActual;
  usert;

  constructor(private loginService: LoginService, 
    private productoService: ProductoService) {

  }

  ngOnInit() {
    debugger;
    this.loginService.usuarioDto.subscribe(data => {
      this.usuarioActual = data;
      console.log("usuario actual---",this.usuarioActual);
      this.moduloActual = null;
    });

    this.loginService.menuDto.subscribe(data => {
      debugger;
      this.moduloActual = data;
      console.log("modulo actual---",this.usuarioActual);
      this.usuarioActual = null;
    });

    //this.usuario = JSON.parse(sessionStorage.getItem(USER));
    this.usert = JSON.parse(sessionStorage.getItem(USER));
    if (this.usert && this.usert.rol == 'Administrador') {
      this.isVisibleCarrito = false;
    }
    this.productoService.listar().subscribe(resp => {
      debugger;
      let respuesta: any = resp;
      this.productos = respuesta.data;
    });
  }

  clickModule(modulo: MenuDto) {
    this.loginService.menuDto.next(modulo);
  }

  
}
