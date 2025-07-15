<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
  // Invalidar la sesión del usuario
  session.invalidate();

  // Redirigir al login con un mensaje de "Sesión cerrada"
  response.sendRedirect("login.jsp?message=sessionClosed");
%>
