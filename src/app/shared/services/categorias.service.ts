import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>("http://localhost:3000/categorias").pipe(catchError(this.handleError));
  }

   // Capturar error que nos mande el api
   handleError(error:HttpErrorResponse){
    let mensaje = 'Error desconocido, reporte al administrador';
    // console.log(error);
    // const values = Object.values(error.error);
    // values.map((error) =>{
    //   mensaje+= error
    // });
    if(error?.error){
      mensaje = error?.error?.mensaje;
    }
    return throwError(()=>Error(mensaje));
    
  }



}
