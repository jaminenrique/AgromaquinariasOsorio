package com.agromaquinariasosorio.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Conexion {

  protected Connection con; // CAMBIADO DE PRIVATE A PROTECTED
  private boolean transaccionIniciada;

  // Cambia estos valores según tu configuración de Oracle XE
  private final String url = "jdbc:oracle:thin:@localhost:1521:xe"; // Formato de conexión para Oracle
  private final String user = "SYSTEM"; // Usuario de Oracle
  private final String pass = "2502Mamboll2801"; // Contraseña de Oracle

  public Connection getConnection() {
    try {
      // Cargar el driver de Oracle
      Class.forName("oracle.jdbc.OracleDriver");
      con = DriverManager.getConnection(url, user, pass); // Asigna a this.con
    } catch (ClassNotFoundException | SQLException e) {
      // Manejo de errores
        System.out.println("Error al conectar con Oracle " + e.getMessage());
    }
    return con;
  }

  public void conectar() throws SQLException, ClassNotFoundException {
    Class.forName("oracle.jdbc.OracleDriver");
    con = DriverManager.getConnection(url, user, pass); // Asigna a this.con
  }

  public void desconectar() throws SQLException {
    if (con != null) {
      con.close();
    }
  }

  protected void conectar(boolean wTransaccion) throws Exception {
    Class.forName("oracle.jdbc.OracleDriver");
    con = DriverManager.getConnection(url, user, pass); // Asigna a this.con

    if (wTransaccion) {
      this.con.setAutoCommit(false);
      this.transaccionIniciada = true;
    } else {
      this.con.setAutoCommit(true);
      this.transaccionIniciada = false;
    }
  }

  protected void cerrar(boolean wEstado) throws Exception {
    if (this.con != null) {
      if (this.transaccionIniciada) {
        try {
          if (wEstado) {
            this.con.commit();
          } else {
            this.con.rollback();
          }
        } catch (SQLException e) {
          throw e; // Relanza la excepción para que el DAO la maneje
        }
      }
      try {
        this.con.close();
      } catch (SQLException e) {
        // Imprime error si no se puede cerrar la conexión
        
      }
    }
    this.con = null;
  }

  protected void ejecutarOrden(String wSQL) throws Exception {
    Statement st = null; // Declarar aquí para el try-finally

    if (this.con != null) {
      try {
        st = this.con.createStatement();
        st.executeUpdate(wSQL);
      } finally {
        if (st != null) {
          st.close(); // Asegura que el Statement se cierre
        }
      }
    }
  }

  protected ResultSet ejecutarOrdenDatos(String wSQL) throws Exception {
    Statement st = null;
    ResultSet rs = null;

    if (this.con != null) {
      try {
        st = this.con.createStatement();
        rs = st.executeQuery(wSQL);
      } catch (SQLException e) {
        // No cerrar 'st' aquí si 'rs' será devuelto y necesita 'st' abierto
        throw e; // Relanzar la excepción
      }
    }
    return rs; // El Statement asociado a este ResultSet debe cerrarse externamente
  }
}
