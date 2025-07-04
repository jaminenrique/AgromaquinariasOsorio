package com.agromaquinariasosorio.modelo;

import com.agromaquinariasosorio.config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CategoriaDAO extends Conexion {

  Connection con;
  Conexion cn = new Conexion();
  PreparedStatement ps;
  ResultSet rs;

  public List listar() {
    List lista = new ArrayList();
    String sql = "SELECT * FROM Categoria";
    try {
      ps = getConnection().prepareStatement(sql);
      rs = ps.executeQuery();
      while (rs.next()) {
        Categoria c = new Categoria();
        c.setIdCategoria(rs.getInt(1));
        c.setNombre(rs.getString(2));
        lista.add(c);
      }
    } catch (SQLException e) {
    }
    return lista;
  }

  public void registrar(Categoria categoria) throws Exception {
    Conexion conex;
    Connection connec = null;
    Statement st = null;
    String sql;

    sql = "INSERT INTO Categoria (nombre) "
            + "VALUES('" + categoria.getNombre() + "')";

    conex = new Conexion();
    try {
      connec = conex.getConnection();
      st = connec.createStatement();
      st.executeUpdate(sql);
    } catch (SQLException e) {
      throw e;
    } finally {
      this.cerrar(false);
    }
  }

  public Categoria leer(Categoria categoria) throws Exception {
    Categoria cate = null;
    ResultSet rs = null;
    String sql = "SELECT C.id_categoria, C.nombre "
            + "FROM Categoria C WHERE C.id_categoria = " + categoria.getIdCategoria();
    try {
      this.conectar(false);
      rs = this.ejecutarOrdenDatos(sql);
      if (rs.next() == true) {
        cate = new Categoria();
        cate.setIdCategoria(categoria.getIdCategoria());
        cate.setNombre(rs.getString("nombre"));
      }
    } catch (Exception e) {
      throw e;
    } finally {
      this.cerrar(false);
    }
    return cate;
  }

  public void actualizar(Categoria categoria) throws Exception {
    String sql;
    sql = "UPDATE Categoria SET nombre = '" + categoria.getNombre()
            + "' WHERE id_categoria = " + categoria.getIdCategoria();

    try {
      this.conectar(false);
      this.ejecutarOrden(sql);
    } catch (Exception e) {
      throw e;
    } finally {
      this.cerrar(false);
    }
  }

  public boolean validacion(Categoria cat) throws Exception {
    boolean repetido = false;
    ResultSet rs = null;
    String sql = "SELECT COUNT(id_categoria) FROM Categoria "
            + "WHERE nombre = '" + cat.getNombre().trim() + "' AND id_categoria <> " + cat.getIdCategoria();
    try {
      this.conectar(false);
      rs = this.ejecutarOrdenDatos(sql);
      rs.next();
      repetido = rs.getBoolean(1);
    } catch (Exception e) {
      throw e;
    } finally {
      this.cerrar(false);
    }
    return repetido;
  }

}
