import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Ingreso } from '../models/ingreso';
import { HOST } from '../variables/var.constant';


@Injectable({
    providedIn: 'root'
})
export class IngresoService {

    url: string = `${HOST}/api/ingreso`;


    constructor(private http: HttpClient) { }

    getIngresos() {
        return this.http.get(this.url);
    }

    guardarIngreso(newIngreso: Ingreso): Observable<any> {
        return this.http.post(`${this.url}`, newIngreso);
    }

    deleteIngreso(idIngreso: number) {
        const urlDelete = `${this.url}/${idIngreso}`;
        return this.http.delete(urlDelete);
    }

}
