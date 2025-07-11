package com.agromaquinariasosorio.modelo;

import com.agromaquinariasosorio.config.Conexion;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioDAO extends Conexion {

  public boolean registrarUsuario(String nombre, String correo, String contrasena, boolean verificado, String codigoVerificacion, Integer id_Rol) throws Exception {
    String sql = "INSERT INTO Usuario (nombre, correo, contrasena, verificado, codigo_verificacion, id_rol) VALUES (?, ?, ?, ?, ?, ?)";

    try {
      this.conectar(false);
      try (PreparedStatement stmt = this.getConnection().prepareStatement(sql)) {
        stmt.setString(1, nombre);
        stmt.setString(2, correo);
        stmt.setString(3, contrasena);  // Guarda la contraseña hasheada
        stmt.setBoolean(4, verificado);  // false porque aún no está verificado
        stmt.setString(5, codigoVerificacion); // <-- Agregar el código de verificación
        stmt.setInt(6, id_Rol);
        int filasAfectadas = stmt.executeUpdate();

        return filasAfectadas > 0; // Si se insertaron filas, el registro fue exitoso
      }
    } catch (Exception e) {
      throw new Exception("Error al registrar el usuario: " + e.getMessage());
    } finally {
      this.cerrar(false);
    }
  }
  private String generarCodigoVerificacion() {
    int codigo = (int)(Math.random() * 9000) + 1000;
    return String.valueOf(codigo);
}

  public Usuario verificarUsuarioCorreo(String correo) throws Exception {
    Usuario usu = null;
    ResultSet rs;
    String sql = "SELECT id_usuario, nombre, correo, contrasena, verificado, codigo_verificacion, id_Rol FROM Usuario WHERE correo = ?";  // Consultamos por correo

    try {
      this.conectar(false);  // Conexión a la base de datos
      try (PreparedStatement stmt = this.getConnection().prepareStatement(sql)) { 
        stmt.setString(1, correo);  // Establecemos el correo en la consulta
        rs = stmt.executeQuery();  // Ejecutamos la consulta

        if (rs.next()) {
          usu = new Usuario();
          usu.setIdUsuario(rs.getInt("id_usuario"));
          usu.setNombre(rs.getString("nombre"));
          usu.setCorreo(rs.getString("correo"));
          usu.setContrasena(rs.getString("contrasena"));
          usu.setVerificado(rs.getBoolean("verificado"));  // Obtén el valor de la columna "verificado"
          usu.setCodigoVerificacion(rs.getString("codigo_verificacion"));
          
        }
      }
    } catch (Exception e) {
      throw new Exception("Error al verificar el correo: " + e.getMessage());
    } finally {
      this.cerrar(false);  // Cerrar la conexión
    }
    return usu;  // Retorna el usuario si el correo existe
  }

  public boolean verificarCorreoExistente(String correo) throws Exception {
    boolean existe = false;
    ResultSet rs;
    String sql = "SELECT COUNT(*) FROM Usuario WHERE correo = ?";

    try {
      this.conectar(false); // Conexión a la base de datos
      try (PreparedStatement stmt = this.getConnection().prepareStatement(sql)) {
        stmt.setString(1, correo); // Establecemos el correo en la consulta
        rs = stmt.executeQuery(); // Ejecutamos la consulta
        if (rs.next()) {
          existe = rs.getInt(1) > 0; // Si el conteo es mayor que 0, el correo existe
        }
      }
    } catch (Exception e) {
      throw new Exception("Error al verificar el correo: " + e.getMessage());
    } finally {
      this.cerrar(false); // Cerramos la conexión
    }

    return existe; // Retorna true si el correo ya existe, de lo contrario false
  }

  public boolean guardarCodigoVerificacion(String correo, String codigoVerificacion) throws Exception {
    String sql = "UPDATE Usuario SET Codigo_Verificacion = ? Where correo = ?";
    try {
      this.conectar(false);
      PreparedStatement stmt = this.getConnection().prepareStatement(sql);
      stmt.setString(1, codigoVerificacion);
      stmt.setString(2, correo);
      return stmt.executeUpdate() > 0;
    } catch (SQLException e) {
      System.out.println("Error al actualizar el código de verficacion: " + e.getMessage());
      return false;
    }
  }

  public boolean verificarCodigo(final String correo, final String codigo) throws Exception {
    String sql = "SELECT 1 FROM Usuario WHERE correo = ? AND codigo_verificacion = ?";
    try {
      this.conectar(false);
      PreparedStatement stmt = this.getConnection().prepareStatement(sql);
      stmt.setString(1, correo);
      stmt.setString(2, codigo);
      ResultSet rs = stmt.executeQuery();
      return rs.next();
    } catch (SQLException e) {
      System.out.println("Error al actualizar el código de verficacion: " + e.getMessage());
      return false;
    }
  }

  public boolean actualizarEstadoVerificado(String correo) throws Exception {
    String sql = "UPDATE Usuario SET verificado = 1 WHERE correo = ?";
    try {
      this.conectar(false);
      PreparedStatement stmt = this.getConnection().prepareStatement(sql);
      stmt.setString(1, correo);
      return stmt.executeUpdate() > 0;
    } catch (SQLException e) {
      System.out.println("Error al actualizar");
      return false;
    }
  }
    public boolean verificarCodigoPorId(final int idUsuario, final String codigoIngresado) throws Exception {
    String sql = "UPDATE Usuario SET verificado = 1 WHERE id_usuario = ? AND codigo_verificacion = ?";
    try {
      this.conectar(false);
      PreparedStatement stmt = this.getConnection().prepareStatement(sql);
      stmt.setInt(1, idUsuario);
      stmt.setString(2, codigoIngresado);
      return stmt.executeUpdate() > 0;
    } catch (SQLException e) {
      System.out.println("Error al verificar el código de verificación por ID: " + e.getMessage());
      return false;
    }
  }
}
