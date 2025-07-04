/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.agromaquinariasosorio.controlador;

import com.agromaquinariasosorio.modelo.Categoria;
import com.agromaquinariasosorio.modelo.CategoriaDAO;
import com.agromaquinariasosorio.utils.AgromaquinariasUtils;
import com.google.gson.Gson;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "srvCategoria", urlPatterns = "/srvCategoria")
public class srvCategoria extends HttpServlet {

  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("application/json;charset=UTF-8");

    if (request.getParameter("accion") != null) {
      String accion = request.getParameter("accion");
      switch (accion) {
        case "listCategory" ->
          this.listCategory(response);
        case "createCategory" ->
          this.createCategory(request, response);
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

  private void listCategory(HttpServletResponse response) throws IOException {
    PrintWriter out = response.getWriter();
    try {
      CategoriaDAO dao = new CategoriaDAO();
      List<Categoria> emp = dao.listar();
      Gson gson = new Gson();
      String json = gson.toJson(emp);
      out.print(json);
    } catch (Exception e) {
      AgromaquinariasUtils.printError(e.getMessage(), response);
    }
  }

  private void createCategory(HttpServletRequest request, HttpServletResponse response) throws IOException {
    if (request.getParameter("cate") != null) {
      Gson gson = new Gson();
      Categoria cat = gson.fromJson(request.getParameter("cate"), Categoria.class);
      String rpt;
      try {
        CategoriaDAO dao = new CategoriaDAO();
        if (!dao.validacion(cat)) {
          dao.registrar(cat);
          rpt = "Registrada";
          AgromaquinariasUtils.printMessage("Categoria " + rpt + " correctamente", true, response);
        } else {
          AgromaquinariasUtils.printMessage("Categoría ya registrada", false, response);
        }
      } catch (Exception e) {
        AgromaquinariasUtils.printMessage(e.getMessage(), false, response);
      }
    } else {
      AgromaquinariasUtils.printMessage("Rellene el formulario", false, response);
    }
  }

}
