import { IsEmail, IsNotEmpty, MaxLength, maxLength } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetalleFactura } from "./DetalleFactura";
import { CatergoriaProducto } from "./CategoriaProducto";

@Entity()
export class Producto {
  @PrimaryColumn()
  id: number;
  @Column({ length: 50 })
  @MaxLength(3, { message: "Debe ser menos de 50 caracteres" })
  @IsNotEmpty()
  nombre: string;
  @Column()
  @IsNotEmpty({ message: "ddd" })
  precio: number;
  @Column()
  @IsNotEmpty()
  stock: number;
  @Column()
  fechaIngreso: Date;
  @Column()
  estado: boolean;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.producto)
  detallesFactura: DetalleFactura[];

  // CategoriaProductos
  @ManyToOne(() => CatergoriaProducto, (categoria) => categoria.productos)
  categoria: CatergoriaProducto;
}
