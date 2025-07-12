/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.agromaquinariasosorio.controlador;

import com.agromaquinariasosorio.modelo.Usuario;
import com.agromaquinariasosorio.modelo.UsuarioDAO;
import com.agromaquinariasosorio.utils.AgromaquinariasUtils;
import com.agromaquinariasosorio.utils.CorreoUtils;
import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Random;
import org.mindrot.jbcrypt.BCrypt;

/**
 *
 * @author MARY LEONOR
 */
@WebServlet(name = "srvUsuario", urlPatterns = "/srvUsuario")
public class srvUsuario extends HttpServlet {

  /**
   * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
   * methods.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    response.setContentType("application/json;charset=UTF-8");

    if (request.getParameter("accion") != null) {
      String accion = request.getParameter("accion");
      switch (accion) {
        case "registrarUsuario" ->
          this.registrarUsuario(request, response);
        case "iniciarSesion" ->
          this.iniciarSesion(request, response);
        case "verificarCorreo" ->
          this.verificarCorreo(request, response);
        default ->
          throw new AssertionError();
      }
    } else {
      AgromaquinariasUtils.printError("No se indico la operación a realizar", response);
    }
  }

  // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
  /**
   * Handles the HTTP <code>GET</code> method.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    processRequest(request, response);
  }

  /**
   * Handles the HTTP <code>POST</code> method.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    processRequest(request, response);
  }

  /**
   * Returns a short description of the servlet.
   *
   * @return a String containing servlet description
   */
  @Override
  public String getServletInfo() {
    return "Short description";
  }// </editor-fold>

  private boolean esCorreoValido(String correo) {
    String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    return correo.matches(regex);
  }

  private void registrarUsuario(HttpServletRequest request, HttpServletResponse response) throws IOException {
    if (request.getParameter("usu") != null) {
      final Gson gson = new Gson();
      final Usuario usu = gson.fromJson(request.getParameter("usu"), Usuario.class);

      // Validar el formato del correo
      if (!esCorreoValido(usu.getCorreo())) {
        AgromaquinariasUtils.printMessage("El correo electrónico no es válido", false, response);
        return;
      }
      try {
        // Verificar si el correo ya está registrado
        UsuarioDAO dao = new UsuarioDAO();
        if (dao.verificarCorreoExistente(usu.getCorreo())) {
          AgromaquinariasUtils.printMessage("El correo electrónico ya está registrado", false, response);
          return;
        }
        // Hashear la contraseña antes de almacenarla en la base de datos
        final String contrasenaHash = BCrypt.hashpw(usu.getContrasena(), BCrypt.gensalt());
        // Si todo es correcto, generar el código de verificación
        final String codigoVerificacion = String.format("%06d", new Random().nextInt(999999));
        // Guardar el usuario en la base de datos (incluyendo un campo 'verificado' como 'false')
        boolean exito = dao.registrarUsuario(usu.getNombre(), usu.getCorreo(), contrasenaHash, false, codigoVerificacion, usu.getRol().getId_rol()); // false para verificado
        if (exito) {
          // Enviar el código de verificación por correo
          CorreoUtils.sentEmail(usu.getCorreo(), "Código de verificación", "Tu código es: " + codigoVerificacion);
          // Aquí podrías almacenar el código de verificación en la base de datos
          boolean codigoGuardado = dao.guardarCodigoVerificacion(usu.getCorreo(), codigoVerificacion);
          if (!codigoGuardado) {
            AgromaquinariasUtils.printMessage("Error al guardar el código de verificación", false, response);
          }
          // Mensaje de éxito (pero aún no está verificado)
          AgromaquinariasUtils.printMessage("Usuario registrado exitosamente, revisa tu correo para verificar tu cuenta", true, response);
        } else {
          AgromaquinariasUtils.printMessage("Hubo un error al registrar el usuario", false, response);
        }
      } catch (Exception e) {
        AgromaquinariasUtils.printMessage(e.getMessage(), false, response);
      }
    } else {
      AgromaquinariasUtils.printMessage("Rellene el formulario", false, response);
    }
  }

  private void iniciarSesion(HttpServletRequest request, HttpServletResponse response) throws IOException {
    PrintWriter out = response.getWriter();
    if (request.getParameter("usu") != null) {
      Gson gson = new Gson();
      Usuario usuario = gson.fromJson(request.getParameter("usu"), Usuario.class);
      try {
        UsuarioDAO dao = new UsuarioDAO();
        // Primero verificamos si el usuario y el correo existen
        Usuario usu = dao.verificarUsuarioCorreo(usuario.getCorreo());
        if (usu == null) {
          // Si el usuario es null, significa que el correo no existe
          AgromaquinariasUtils.printMessage("Credenciales incorrectas", false, response);
        } else {
          // Si el usuario existe, verificar la contraseña
          if (!BCrypt.checkpw(usuario.getContrasena(), usu.getContrasena())) {
            AgromaquinariasUtils.printMessage("Credenciales incorrectas", false, response);
          } else {
            request.getSession().setAttribute("usuario", usu);
            String json = gson.toJson(usu);
            out.print(json);
          }
        }
      } catch (Exception e) {
        AgromaquinariasUtils.printError(e.getMessage(), response);
      }
    } else {
      AgromaquinariasUtils.printMessage("Rellene el formulario", false, response);
    }
  }

  private void verificarCorreo(HttpServletRequest request, HttpServletResponse response) throws IOException {
    if (request.getParameter("correo") != null && request.getParameter("codigo") != null) {
      final String correo = request.getParameter("correo");
      final String codigo = request.getParameter("codigo");
      try {
        UsuarioDAO dao = new UsuarioDAO();
        // Verificar si el código coincide
        boolean esValido = dao.verificarCodigo(correo, codigo);
        if (esValido) {
          // Actualizar el estado del usuario a "verificado"
          boolean actualizado = dao.actualizarEstadoVerificado(correo);
          if (actualizado) {
            AgromaquinariasUtils.printMessage("Correo verificado exitosamente", true, response);
          } else {
            AgromaquinariasUtils.printMessage("Error al actualizar el estado del usuario", false, response);
          }
        } else {
          AgromaquinariasUtils.printMessage("El código de verificación no es válido", false, response);
        }
      } catch (Exception e) {
        AgromaquinariasUtils.printError(e.getMessage(), response);
      }
    } else {
      AgromaquinariasUtils.printMessage("Faltan parámetros", false, response);
    }
  }
}
