import { LoginComponent } from './components/login/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
// import { ListArticlesComponent } from './components/article/list-articles/list-articles.component';
//import { AdminPersonaComponent } from './components/administration/persona/admin-persona/admin-persona.component';
//import { AdminCargosComponent } from './components/administration/persona/cargos/admin-cargos/admin-cargos.component';
import { ListUsuarioComponent } from './components/administration/usuario/list-usuario/list-usuario.component';
import { ListProductoComponent } from './components/administration/producto/list-producto/list-producto.component';
import { CarritoComprasComponent } from './components/carrito/carrito-compras/carrito-compras.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin-usuarios', component: ListUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'admin-productos', component: ListProductoComponent, canActivate: [AuthGuard] },
  { path: 'admin-carrito', component: CarritoComprasComponent, canActivate: [AuthGuard] },
  //{ path: 'admin-rutas', component: AdminRutasComponent, canActivate: [AuthGuard] },
  //{ path: 'admin-cargos', component: AdminCargosComponent, canActivate: [AuthGuard] },
  //{ path: 'venta-boletos', component: VentaBoletosComponent, canActivate: [AuthGuard] },
  //{ path: 'gestionar-reservas', component: GestionarReservasComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
