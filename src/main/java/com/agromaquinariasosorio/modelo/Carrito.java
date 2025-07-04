package com.agromaquinariasosorio.modelo;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Carrito {

  private Integer idUsuario;
  private List<ItemCarrito> items;

    public Carrito() {
        this.items = new ArrayList<>();
    }

    public Carrito(int idUsuario) {
        this.idUsuario = idUsuario;
        this.items = new ArrayList<>();
    }

  public Integer getIdUsuario() {
    return idUsuario;
  }

  public void setIdUsuario(Integer idUsuario) {
    this.idUsuario = idUsuario;
  }

  public List<ItemCarrito> getItems() {
    return items;
  }

  public void setItems(List<ItemCarrito> items) {
    this.items = items;
  }

    /**
     * Calcula el monto total del carrito sumando los subtotales de cada item.
     * @return El monto total del carrito.
     */
    public BigDecimal getTotal() {
        BigDecimal total = BigDecimal.ZERO;
        for (ItemCarrito item : items) {
            total = total.add(item.getSubtotal());
        }
        return total;
    }

    /**
     * Verifica si el carrito está vacío.
     * @return true si el carrito no tiene items, false en caso contrario.
     */
    public boolean estaVacio() {
        return items.isEmpty();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Carrito para Usuario ID: ").append(idUsuario).append("\n");
        if (items.isEmpty()) {
            sb.append("  El carrito está vacío.\n");
        } else {
            for (ItemCarrito item : items) {
                sb.append("  - ").append(item.getProducto().getNombre())
                  .append(" x ").append(item.getCantidad())
                  .append(" (Subtotal: S/.").append(item.getSubtotal()).append(")\n");
            }
        }
        sb.append("Total del Carrito: S/.").append(getTotal()).append("\n");
        return sb.toString();
    }
}
