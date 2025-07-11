/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.agromaquinariasosorio.modelo;

/**
 *
 * @author Codesoft by Alexander Tutoriales
 */
public class Usuario {

  private Integer idUsuario;
  private String nombre;
  private String correo;
  private String contrasena;
  private boolean verificado;
  private String codigoVerificacion;
  private Rol rol;

  public Integer getIdUsuario() {
    return idUsuario;
  }

  public void setIdUsuario(Integer idUsuario) {
    this.idUsuario = idUsuario;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getCorreo() {
    return correo;
  }

  public void setCorreo(String correo) {
    this.correo = correo;
  }

  public String getContrasena() {
    return contrasena;
  }

  public void setContrasena(String contrasena) {
    this.contrasena = contrasena;
  }

  public boolean isVerificado() {
    return verificado;
  }

  public void setVerificado(boolean verificado) {
    this.verificado = verificado;
  }

  public String getCodigoVerificacion() {
    return codigoVerificacion;
  }

  public void setCodigoVerificacion(String codigoVerificacion) {
    this.codigoVerificacion = codigoVerificacion;
  }

  public Rol getRol() {
    return rol;
  }

  public void setRol(Rol rol) {
    this.rol = rol;
  }

}
