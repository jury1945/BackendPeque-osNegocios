import ProductosService from '../services/productos.service.js';

const service = new ProductosService();

class ProductosController {
  async getProductos(req, res) {
    try {
      const productos = await service.findAll();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error });
    }
  }

  async getProducto(req, res) {
    const { id } = req.params;
    try {
      const producto = await service.findById(id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
  }

  async createProducto(req, res) {
    const data = req.body;
    try {
      const newProducto = await service.create(data);
      res.status(201).json({ message: 'Producto creado exitosamente', producto: newProducto });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  }

  async updateProducto(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const producto = await service.update(id, data);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  }

  async deleteProducto(req, res) {
    const { id } = req.params;
    try {
      const result = await service.delete(id);
      if (!result) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }
}

export default new ProductosController();