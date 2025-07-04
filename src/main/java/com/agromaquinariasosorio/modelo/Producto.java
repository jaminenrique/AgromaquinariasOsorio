/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.agromaquinariasosorio.modelo;

import java.math.BigDecimal;

/**
 *
 * @author MARY LEONOR
 */
public class Producto {

  public Producto() {
  }

  public Producto(Integer idProducto, Categoria idCategoria, String nombre, String descripcion, BigDecimal precio, Integer stock, String imagen) {
    this.idProducto = idProducto;
    this.idCategoria = idCategoria;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
  }

  public Integer idProducto;
  public Categoria idCategoria;
  public String nombre;
  public String descripcion;
  public BigDecimal precio;
  public Integer stock;
  public String imagen;

  public Integer getIdProducto() {
    return idProducto;
  }

  public void setIdProducto(Integer idProducto) {
    this.idProducto = idProducto;
  }

  public Categoria getIdCategoria() {
    return idCategoria;
  }

  public void setIdCategoria(Categoria idCategoria) {
    this.idCategoria = idCategoria;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }

  public Integer getStock() {
    return stock;
  }

  public void setStock(Integer stock) {
    this.stock = stock;
  }

  public String getImagen() {
    return imagen;
  }

  public void setImagen(String imagen) {
    this.imagen = imagen;
  }

  public BigDecimal getPrecio() {
    return precio;
  }

  public void setPrecio(BigDecimal precio) {
    this.precio = precio;
  }

  @Override
  public String toString() {
    return "Producto{"
            + "idProducto=" + idProducto
            + ", idCategoria=" + idCategoria
            + ", nombre='" + nombre + '\''
            + ", descripcion='" + descripcion + '\''
            + ", precio=" + precio
            + ", stock=" + stock
            + ", imagen='" + imagen + '\''
            + ", categoria=" + (idCategoria != null ? idCategoria.getNombre() : "N/A")
            + // Muestra el nombre de la categoría
            '}';
  }
}
