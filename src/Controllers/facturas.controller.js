import FacturasService from '../services/facturas.service.js';
import PDFDocument from 'pdfkit';

const service = new FacturasService();

class FacturasController {
  async getFacturas(req, res) {
    try {
      const facturas = await service.findAll();
      res.status(200).json(facturas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las facturas', error: error.message });
    }
  }

  async getFactura(req, res) {
    const { id } = req.params;
    try {
      const factura = await service.findById(id);
      if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }
      res.status(200).json(factura);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
    }
  }

  async createFactura(req, res) {
    const data = req.body;
    try {
      const newFactura = await service.create(data);
      res.status(201).json({ message: 'Factura creada exitosamente', factura: newFactura });
    } catch (error) {
      res.status(400).json({ message: 'Error al crear la factura', error: error.message });
    }
  }

  async updateFactura(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedFactura = await service.update(id, data);
      res.status(200).json({ message: 'Factura actualizada exitosamente', factura: updatedFactura });
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la factura', error: error.message });
    }
  }

  async deleteFactura(req, res) {
    const { id } = req.params;
    try {
      const result = await service.delete(id);
      if (!result) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la factura', error: error.message });
    }
  }

  async printFactura(req, res) {
    const { id } = req.params;

    try {
      const factura = await service.findById(id);

      if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }

      // Crear un nuevo documento PDF
      const doc = new PDFDocument({ margin: 30 });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=factura_${id}.pdf`);

      // Enviar el PDF a la respuesta HTTP
      doc.pipe(res);

      // Encabezado de la Factura
      doc
        .fontSize(20)
        .text('Factura', { align: 'center' })
        .moveDown();

      doc
        .fontSize(12)
        .text(`Número de Factura: ${factura.id_factura}`)
        .text(`Fecha: ${new Date(factura.fecha).toLocaleDateString()}`)
        .text(`Cliente: ${factura.cliente.nombre} ${factura.cliente.apellidos}`)
        .text(`Dirección: ${factura.cliente.direccion}`)
        .text(`Teléfono: ${factura.cliente.telefono}`)
        .moveDown();

      // Tabla de Detalles de Factura
      doc.text('Detalles de la Factura:', { underline: true }).moveDown();

      factura.detalles.forEach((detalle, index) => {
        const { producto, cantidad, precio_unitario, subtotal } = detalle;
        doc
          .fontSize(10)
          .text(`${index + 1}. Producto: ${producto.nombre}`, { continued: true })
          .text(` | Cantidad: ${cantidad}`, { continued: true })
          .text(` | Precio Unitario: $${precio_unitario.toFixed(2)}`, { continued: true })
          .text(` | Subtotal: $${subtotal.toFixed(2)}`)
          .moveDown(0.5);
      });

      doc.moveDown();
      doc.fontSize(12).text(`Total: $${factura.total.toFixed(2)}`, { align: 'right' });

      // Finalizar el PDF
      doc.end();
    } catch (error) {
      res.status(500).json({ message: 'Error al generar la factura', error: error.message });
    }
  }
}

export default new FacturasController();