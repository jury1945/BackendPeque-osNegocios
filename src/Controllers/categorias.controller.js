import CategoriasService from "../services/categorias.service.js";


const service = new CategoriasService();

class CategoriasController {
  async getCategorias(req, res) {
    try {
      const roles = await service.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las categorias de los productos', error });
    }
  }

  async getCategoria(req, res) {
    const { id } = req.params;
    try {
      const role = await service.findById(id);
      if (!role) {
        return res.status(404).json({ message: 'Categoria no encontrada' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la categoria', error });
    }
  }

  async createCategoria(req, res) {
    const data = req.body;
    try {
      const newCategoria = await service.create(data);
      res.status(201).json({
        message: 'Categoria creado exitosamente',
        categoria: newCategoria
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la categoria', error });
    }
  }

  async updateCategoria(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const cat = await service.update(id, data);
      if (!cat) {
        return res.status(404).json({ message: 'Categoria no encontrada' });
      }
      res.status(200).json({
        message: 'Categoria actualizada exitosamente',
        categoria: cat
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el rol', error });
    }
  }

  async deleteCategoria(req, res) {
    const { id } = req.params;
    try {
      const result = await service.delete(id);
      if (!result) {
        return res.status(404).json({ message: 'Categoria no encontrada' });
      }
      res.status(204).json({
        message:'Categoria eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar categoria', error });
    }
  }
}

export default new CategoriasController();