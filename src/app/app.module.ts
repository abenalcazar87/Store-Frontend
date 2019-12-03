// import { ListArticlesComponent } from './components/article/list-articles/list-articles.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule,
  MatCardModule, MatDividerModule, MatTableModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule,
  MatPaginatorModule,MatSidenavModule,MatGridListModule,MatListModule,
  MatSortModule,MatCheckboxModule,MatTabsModule,MatDatepickerModule, MatNativeDateModule,
  MatAutocompleteModule
} from '@angular/material';

import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
//import { AdminPersonaComponent } from './components/administration/persona/admin-persona/admin-persona.component';
//import { AddPersonaComponent } from './components/administration/persona/add-persona/add-persona.component';
//import { CargosComponent } from './components/administration/persona/cargos/cargos.component';
//import { AdminCargosComponent } from './components/administration/persona/cargos/admin-cargos/admin-cargos.component';
//import { AddCargosComponent } from './components/administration/persona/cargos/add-cargos/add-cargos.component';
// Import PdfJsViewerModule module
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
//import { PdfViewerModule } from './pdf-viewer/pdf-viewer.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ShowPdfComponent } from './components/pdf/show-pdf/show-pdf.component';
import { AddUsuarioComponent } from './components/administration/usuario/add-usuario/add-usuario.component';
import { ListUsuarioComponent } from './components/administration/usuario/list-usuario/list-usuario.component';
import { AddProductoComponent } from './components/administration/producto/add-producto/add-producto.component';
import { ListProductoComponent } from './components/administration/producto/list-producto/list-producto.component';
import { IngresoProductoComponent } from './components/administration/producto/ingreso-producto/ingreso-producto.component';
import { CarritoComprasComponent } from './components/carrito/carrito-compras/carrito-compras.component';
import { AddCarritoComponent } from './components/carrito/add-carrito/add-carrito.component';
import { ItemCarritoComponent } from './components/carrito/item-carrito/item-carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    // ListArticlesComponent,
    //AdminPersonaComponent,
    //AddPersonaComponent,
    //CargosComponent,
    //AdminCargosComponent,
    //AddCargosComponent,
    ShowPdfComponent,
    AddUsuarioComponent,
    ListUsuarioComponent,
    AddProductoComponent,
    ListProductoComponent,
    IngresoProductoComponent,
    CarritoComprasComponent,
    AddCarritoComponent,
    ItemCarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatAutocompleteModule,
    PdfJsViewerModule,
    PdfViewerModule
  ],
  entryComponents: [
    //AddPersonaComponent,
    AddUsuarioComponent,
    AddProductoComponent,
    //CargosComponent,
    //AddCargosComponent,
    IngresoProductoComponent,
    ShowPdfComponent,
    AddCarritoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
