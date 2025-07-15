<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
  <head>
    <%@include file="utils/head.jsp" %>
  </head>
  <body class="hold-transition login-page">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="../index2.html" class="h1"><b>Agromaquinarias</b>Osorio</a>
        </div>
        <div class="card-body">

          <!-- Aquí comienza la modificación -->
          <%
            // Verificar si el parámetro "message" existe en la URL y contiene el valor "sessionClosed"
            String message = request.getParameter("message");
            if ("sessionClosed".equals(message)) {
          %>
          <div class="alert alert-success">
            Has cerrado sesión exitosamente.
          </div>
          <% }%>
          <!-- Fin de la modificación -->
          
          <p class="login-box-msg">Ingresa tus credenciales</p>

          <form id="frmLogin">
            <div class="input-group mb-3">
              <input type="email" class="form-control" id="txtCorreo" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" id="txtPassword" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember">
                  <label for="remember">
                    Recuérdame
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-6">
                <button type="submit" class="btn btn-primary btn-block">Iniciar Sesión <span class="fas fa-sign-in-alt"></span></button>
              </div>
              <!-- /.col -->
            </div>
            <div class="social-auth-links text-center mb-3">
              <a id="contenedor" href="#" class="btn btn-block" style="background-color: #336b87; color: white">
                <i class="fas fa-bell mr-2"></i> Verificación de credenciales
              </a>
            </div>
          </form>
          <p class="mb-1">
            <a href="forgot-password.html">Olvidé mi contraseña</a>
          </p>
          <p class="mb-0">
            <a href="register.html" class="text-center">Registrar un nuevo usuario</a>
          </p>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="../plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../dist/js/adminlte.min.js"></script>
    <script src="../js-backend/scriptSession.js" type="text/javascript"></script>
  </body>
</html>

