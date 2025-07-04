package com.agromaquinariasosorio.modelo;

import java.math.BigDecimal;

public class ItemCarrito {
  private Producto producto;
  private int cantidad;
  
  public ItemCarrito() {
  }

  public ItemCarrito(Producto producto, int cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  public Producto getProducto() {
    return producto;
  }

  public void setProducto(Producto producto) {
    this.producto = producto;
  }

  public int getCantidad() {
    return cantidad;
  }

  public void setCantidad(int cantidad) {
    this.cantidad = cantidad;
  }

  /**
   * Calcula el subtotal para este item (precio del producto * cantidad).
   *
   * @return El subtotal de este item del carrito.
   */
  public BigDecimal getSubtotal() {
    if (producto != null && producto.getPrecio() != null) {
      return producto.getPrecio().multiply(new BigDecimal(cantidad));
    }
    return BigDecimal.ZERO; // Devuelve cero si no hay producto o precio
  }

  @Override
  public String toString() {
    return "ItemCarrito{"
            + "producto=" + (producto != null ? producto.getNombre() : "N/A")
            + ", cantidad=" + cantidad
            + ", subtotal=" + getSubtotal()
            + '}';
  }

}
