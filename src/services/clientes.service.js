import { Clientes } from "../Models/clientes.modelo.js";

class ClientesService{
    async findAll() {
        return await Clientes.findAll();
      }
    
      async findById(id) {
        return await Clientes.findByPk(id);
      }
    
      async create(data) {
        return await Clientes.create(data);
      }
    
      async update(id, data) {
        const cliente = await Clientes.findByPk(id);
        if (!cliente) {
          return null;
        }
        return await cliente.update(data);
      }
    
      async delete(id) {
        const cliente = await Clientes.findByPk(id);
        if (!cliente) {
          return null;
        }
        await cliente.destroy();
        return true;
      }
}
export default ClientesService