/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.agromaquinariasosorio.controlador;

import com.agromaquinariasosorio.modelo.Carrito;
import com.agromaquinariasosorio.modelo.PedidoDAO;
import com.agromaquinariasosorio.utils.AgromaquinariasUtils;
import com.agromaquinariasosorio.utils.CorreoUtils;
import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 *
 * @author MARY LEONOR
 */
@WebServlet(name = "srvPedido", urlPatterns = "/srvPedido")
public class srvPedido extends HttpServlet {

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
                case "retrievePedido" ->
                    this.retrievePedido(response);
                case "createPedido" ->
                    this.createPedido(request, response);
                case "retrievePedidoById" ->
                    this.retrievePedidoById(request, response);
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

    private void retrievePedido(HttpServletResponse response) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    private void createPedido(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        if (request.getParameter("carrito") != null) {
            final Gson gson = new Gson();
            final Carrito carrito = gson.fromJson(request.getParameter("carrito"), Carrito.class);
            try {
                final PedidoDAO dao = new PedidoDAO();
                final int idPedido = dao.guardarPedido(carrito);
                if (idPedido > 0) {
                    AgromaquinariasUtils.printMessage("Pedido registrado exitosamente", true, response);
                    //Implementar metodo para enviar por correo electronico
                    try {
                        CorreoUtils.sentEmail("jaminenrique@outlook.com", "Boleta de Compra Agromaquinarias Osorio", "Gracias por tu compra, próximamente estaremos implementando el PDF.");
                    } catch (Exception e) {
                        AgromaquinariasUtils.printMessage("Pedido registrado exitosamente, pero no se envio correo", true, response);
                    }
                } else {
                    AgromaquinariasUtils.printMessage("Ocurrio un error al registrar el pedido", true, response);
                }
            } catch (final Exception e) {
                AgromaquinariasUtils.printMessage(e.getMessage(), false, response);
            }
        } else {
            AgromaquinariasUtils.printMessage("No llegaron los datos del carrito", false, response);
        }
    }

    private void retrievePedidoById(HttpServletRequest request, HttpServletResponse response) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
