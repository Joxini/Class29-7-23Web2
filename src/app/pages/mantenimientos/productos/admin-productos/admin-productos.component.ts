import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductosForm } from 'src/app/shared/formsModels/productosForms';
import { Categoria } from 'src/app/shared/models/categoria';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss']
})
export class AdminProductosComponent {
  
  titulo = 'Crear Producto';
  isCreate = true
  listaCategorias:Categoria[]=[];
  constructor(public productoForm:ProductosForm, 
    private srvProductos: ProductosService,
    @Inject(MAT_DIALOG_DATA) public data: {producto: any},
    private mensajeria: ToastrService, private srvCategorias: CategoriasService){}

  ngOnInit(){
    // Si tiene datos, cambia el titulo
    if(this.data?.producto){
      // Si es modificar pongo el create false
      this.isCreate = false;
      this.titulo = "Modificar Producto";
      this.cargarDatosForm();
    }else{
      // Si es crear pongo el create false
      this.isCreate = true;
      this.titulo = "Crear Producto";
    }

    this.cargarCombos();
  }

  cargarCombos(): void{

    this.srvCategorias.getAll().subscribe((lista) => {
      this.listaCategorias = lista;
    })
    console.log(this.listaCategorias)

  }
  cargarDatosForm(){

    //El patchValue me a pintar en el formulario los datos que actualmente tengo en la base de datos,
    //pero puedo modificarlo.
    this.productoForm.baseForm.patchValue({
      id: this.data.producto.id,
      nombre: this.data.producto.nombre,
      precio: this.data.producto.precio,
      stock: this.data.producto.stock,
      fechaIngreso: this.data.producto.fechaIngreso,
      estado: true,
      categoria:this.data.producto.categoria.id
    });
  }

  guardar(){
    //El valid, me va a devolver un true o un false
    if(this.productoForm.baseForm.valid){

      if(this.isCreate){
        this.srvProductos.guardar(this.productoForm.baseForm.value).subscribe((dato) =>{
          this.productoForm.baseForm.reset();
          this.mensajeria.success("SE GUARDO CORRECTAMENTE");
        },(error) =>{
          this.mensajeria.error('Se produjo un error. ${error}');
        });
      }else{
        this.srvProductos.modificar(this.productoForm.baseForm.value).subscribe((dato) =>{
          this.productoForm.baseForm.reset();
          this.mensajeria.success("SE MODIFICO CORRECTAMENTE");
        },(error) =>{
          this.mensajeria.error('Se produjo un error. ${error}');
        });
      }

      
    }
  }
}
