/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.agromaquinariasosorio.config;

import com.agromaquinariasosorio.modelo.UsuarioDAO;

/**
 *
 * @author MARY LEONOR
 */
public class Test {

  public static void main(String[] args) throws Exception {
    UsuarioDAO usuarioDAO = new UsuarioDAO();

    try {
      boolean result = usuarioDAO.guardarCodigoVerificacion("alexandertutoriales19@gmail.com", "123");
      System.out.println("Okey:" + result);
    } catch (Exception ex) {
      System.out.println("Error" + ex.getLocalizedMessage());
      
    }
  }
}
