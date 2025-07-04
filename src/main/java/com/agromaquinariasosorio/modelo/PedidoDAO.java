package com.agromaquinariasosorio.modelo;

import com.agromaquinariasosorio.config.Conexion;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.util.Date;
import java.sql.Timestamp;

public class PedidoDAO extends Conexion {

  /**
   * Guarda un pedido completo (pago, pedido y detalles del pedido) de forma
   * transaccional. Si alguna operación falla, todas se deshacen (rollback).
   * Incluye el descuento de stock de los productos.
   *
   * @param carrito El objeto Carrito que contiene la información del pedido.
   * @return El ID del pedido guardado si la operación fue exitosa.
   * @throws Exception Si el carrito está vacío o si ocurre un error durante la
   * transacción.
   */
  public int guardarPedido(final Carrito carrito) throws Exception {
    if (carrito == null || carrito.estaVacio()) {
      throw new Exception("El carrito está vacío. No se puede guardar un pedido sin items.");
    }

    int idPedidoGenerado = -1; // Para almacenar el ID del pedido generado
    boolean transaccionExitosa = false;

    try {
      super.conectar(true); // Inicia la transacción.
      // --- 1. Insertar en la tabla PAGO ---
      String sqlInsertPago = "BEGIN INSERT INTO Pago (monto) VALUES (?) RETURNING id_pago INTO ?; END;";
      int idPagoGenerado = -1;
      // CallableStatement porque tenemos un parámetro OUT
      try (CallableStatement csPago = this.con.prepareCall(sqlInsertPago)) {
        csPago.setBigDecimal(1, carrito.getTotal());
        csPago.registerOutParameter(2, java.sql.Types.NUMERIC);
        csPago.execute();
        idPagoGenerado = csPago.getInt(2); // ← Aquí ya tienes tu ID real
        System.out.println("DEBUG: ID de pago generado correctamente: " + idPagoGenerado);
      }

      // --- 2. Insertar en la tabla PEDIDO ---
      String sqlInsertPedido = "BEGIN INSERT INTO Pedido (id_usuario, id_pago, id_estadoPedido, fecha) VALUES (?, ?, ?, ?) RETURNING id_pedido INTO ?; END;";
      // id_estadoPedido por defecto es 1 (puedes definir una constante para esto)
      int idEstadoPedidoDefault = 1;
      try (CallableStatement psPedido = this.con.prepareCall(sqlInsertPedido)) {
        psPedido.setInt(1, carrito.getIdUsuario());
        psPedido.setLong(2, idPagoGenerado);
        psPedido.setInt(3, idEstadoPedidoDefault);
        psPedido.setTimestamp(4, new Timestamp(new Date().getTime()));
        psPedido.registerOutParameter(5, java.sql.Types.NUMERIC);
        psPedido.execute();
        idPedidoGenerado = psPedido.getInt(5); // Obtiene el valor registrado de base de datos.
      }

      // --- 3. Insertar en la tabla DETALLE_PEDIDO para cada item del carrito ---
      String sqlInsertDetalle = "INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)";
      // ¡CORRECCIÓN AQUÍ! Llama a prepareStatement sobre 'this.con'
      try (PreparedStatement psDetalle = this.con.prepareStatement(sqlInsertDetalle)) {
        for (ItemCarrito item : carrito.getItems()) {
          psDetalle.setInt(1, idPedidoGenerado);
          psDetalle.setInt(2, item.getProducto().getIdProducto());
          psDetalle.setInt(3, item.getCantidad());
          psDetalle.setBigDecimal(4, item.getProducto().getPrecio()); // Precio del producto en el momento de la compra
          psDetalle.addBatch();// Añadir la operación al lote
        }
        psDetalle.executeBatch();
      }

      // --- 4. Actualizar el stock de los productos ---
      String sqlUpdateStock = "UPDATE Producto SET stock = stock - ? WHERE id_producto = ?";
      try (PreparedStatement psUpdateStock = this.con.prepareStatement(sqlUpdateStock)) {
        for (ItemCarrito item : carrito.getItems()) {
          psUpdateStock.setInt(1, item.getCantidad()); // Cantidad a descontar
          psUpdateStock.setInt(2, item.getProducto().getIdProducto()); // ID del producto
          psUpdateStock.addBatch(); // Añadir la operación al lote
        }
        psUpdateStock.executeBatch();
      }
      transaccionExitosa = true; // Marcar como exitosa si llegamos hasta aquí
      System.out.println("Pedido con ID " + idPedidoGenerado + " guardado exitosamente (Pago, Pedido, Detalles y Stock descontado).");
      return idPedidoGenerado;

    } catch (Exception e) { // Capturamos Exception genérica para el rollback
      System.err.println("Error al guardar el pedido completo. Se intentará revertir la transacción: " + e.getMessage());
      throw new Exception("Error al guardar el pedido completo en la base de datos.", e);
    } finally {
      // Cerrar la conexión y manejar commit/rollback usando el método heredado de Conexion
      try {
        super.cerrar(transaccionExitosa); // wEstado = true si fue exitosa, false si hubo error
      } catch (Exception e) {
        System.err.println("Error al cerrar la conexión o al hacer commit/rollback: " + e.getMessage());
      }
    }
  }

}
