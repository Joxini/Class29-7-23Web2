import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog'
import {MatSelectModule} from '@angular/material/select';



const lista = [MatButtonModule, MatCardModule,
  MatTableModule,MatInputModule,MatFormFieldModule,
  MatDialogModule,MatSelectModule

]
@NgModule({
    //los ... es para meter los elementos de la lista
    exports: [...lista],
    imports: [...lista],
  })
  export class MaterialModule {}