import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Productos } from 'src/app/shared/models/productos';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { Categoria } from 'src/app/shared/models/categoria';


// const ELEMENT_DATA: Productos[] = [];
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class ProductosComponent {

  displayedColumns: string[] = ['id', 'nombre', 'precio','categoria','acciones'];
  dataSource = new MatTableDataSource();

  //Para poder de jalar los datos, lo hacemos por inyeccion de dependencia.
  constructor(private srvProductos: ProductosService, public dialog: MatDialog,
    private mensajeria: ToastrService){

  }
  ngOnInit(){
    this.srvProductos.getAll().subscribe((datos) => {
      this.dataSource.data = datos;
    },(error)=>{
      // Mostrar el mensaje(error)
      this.mensajeria.error(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  modificar():void{
    alert("Modificar")
  }

  eliminar(id:number):void{
    this.srvProductos.eliminar(id).subscribe((dato) =>{
      alert("SE ELEMINO EL PRODUCTO")
    },(error)=>{
      alert("ERROR AL ELIMINAR")
    })
  }

  detalle(dato:Productos):void{

    alert(dato.nombre)
  }

  // ? eso es para decir que va a recibir un producto opcional(que llegue o que no llegue)
  abrirDialog(producto?:Productos):void{
    if(producto){
      this.dialog.open(AdminProductosComponent, {width:'700px', height:'700px', data:{producto}});
    }else{
      this.dialog.open(AdminProductosComponent, {width:'700px', height:'700px'});
    }
  }
  
}
