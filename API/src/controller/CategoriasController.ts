import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CatergoriaProducto } from "../entity/CategoriaProducto";

class CategoriasController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const CatRepo = AppDataSource.getRepository(CatergoriaProducto);
      let lista;
      try {
        lista = await CatRepo.find({
          where: { estado: true },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontraron datos." });
      }

      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontraron datos." });
      }

      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error al cargar datos." });
    }
  };

}

export default CategoriasController;
