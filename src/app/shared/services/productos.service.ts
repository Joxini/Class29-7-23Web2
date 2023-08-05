import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Productos } from '../models/productos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Productos[]> {
    return this.http.get<Productos[]>("http://localhost:3000/productos").pipe(catchError(this.handleError));
  }

  guardar(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>("http://localhost:3000/productos", producto).pipe(catchError(this.handleError));
  }

  modificar(producto: Productos): Observable<Productos> {
    return this.http.patch<Productos>("http://localhost:3000/productos", producto).pipe(catchError(this.handleError));
  }

  eliminar(id: number): Observable<Productos> {
    return this.http.delete<Productos>("http://localhost:3000/productos/" + id).pipe(catchError(this.handleError));
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
    console.log("Hola")
    return throwError(()=>Error(mensaje));
    
  }
}
