
import ClientesService from "../services/clientes.service.js";
const service = new ClientesService();

class ClientesController {
  async getClientes(req, res) {
    try {
      const clientes = await service.findAll();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los clientes', error });
    }
  }

  async getCliente(req, res) {
    const { id } = req.params;
    try {
      const cliente = await service.findById(id);
      if (!cliente) {
        return res.status(404).json({ message: 'cliente no encontrado' });
      }
      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el cliente', error });
    }
  }

  async createCliente(req, res) {
    const data = req.body;
    try {
      const newCliente = await service.create(data);
      res.status(201).json({
        message:'Cliente creado exitosamente',
        Cliente: newCliente
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el cliente', error });
    }
  }

  async updateCliente(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const cliente = await service.update(id, data);
      if (!cliente) {
        return res.status(404).json({ message: 'cliente no encontrado' });
      }
      res.status(200).json({
        message: 'Cliente actualizado correctamente',
        Cliente: cliente
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
  }

  async deleteCliente(req, res) {
    const { id } = req.params;
    try {
      const result = await service.delete(id);
      if (!result) {
        return res.status(404).json({ message: 'cliente no encontrado' });
      }
      res.status(204).json({
        message: 'Cliente eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el cliente', error });
    }
  }
}

export default new ClientesController();