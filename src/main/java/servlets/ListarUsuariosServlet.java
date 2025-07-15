package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import org.json.JSONArray;
import org.json.JSONObject;
import utils.Conexion;

public class ListarUsuariosServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        JSONArray usuariosArray = new JSONArray();

        try (Connection con = Conexion.getConexion();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT NOMBRE, CORREO, ID_ROL FROM USUARIO")) {

            while (rs.next()) {
                JSONObject usuario = new JSONObject();
                usuario.put("nombre", rs.getString("NOMBRE"));
                usuario.put("email", rs.getString("CORREO"));
                usuario.put("rol", rs.getInt("ID_ROL") == 1 ? "Administrador" : "Usuario");
                usuariosArray.put(usuario);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        try (PrintWriter out = response.getWriter()) {
            out.print(usuariosArray.toString());
        }
    }
}
