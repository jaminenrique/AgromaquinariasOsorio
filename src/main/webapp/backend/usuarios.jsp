<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true" %>
<%
  if (request.getSession().getAttribute("usuario") != null) {
%>
<!DOCTYPE html>
<html lang="es">
<head>
  <%@include file="utils/head.jsp" %>
</head>
<body class="hold-transition sidebar-mini">
  <div class="wrapper">
    <!-- Navbar -->
    <%@include file="utils/navbar.jsp" %>
    <!-- /.navbar -->

    <!-- Aside -->
    <%@include file="utils/aside.jsp" %>
    <!-- /.aside -->

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Usuarios</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="inicio.jsp">Página Principal</a></li>
                <li class="breadcrumb-item active">Usuarios</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="card card-yellow card-outline">
                <div class="card-header">
                  <h3 class="card-title"> Registrar Usuario</h3>
                </div>
                <div class="card-body">
                  <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#registrarUsuarioModal">Nuevo Registro</button>
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div class="card card-orange card-outline">
                <div class="card-header">
                  <h3 class="card-title">Listado De Usuarios</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                  <div class="form-group">
                    <table id="tablaUsuarios" class="table table-responsive-lg table-bordered table-hover">
                      <thead>
                        <tr class="text-center">
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Rol</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Aquí se insertarán las filas de usuarios dinámicamente con un script -->
                      </tbody>
                      <tfoot>
                        <tr class="text-center">
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Rol</th>
                          <th>Acciones</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.col-md-6 -->
          </div>
          <!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->
    <%@include file="utils/controlAside.jsp" %>
    <!-- /.control-sidebar -->

    <!-- Main Footer -->
    <%@include file="utils/footer.jsp" %>
    <!-- /.main-footer -->
  </div>
  <!-- ./wrapper -->

  <!-- Modal para registrar nuevo usuario -->
  <div class="modal fade" id="registrarUsuarioModal" tabindex="-1" role="dialog" aria-labelledby="registrarUsuarioModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="registrarUsuarioModalLabel">Registrar Usuario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="formRegistrarUsuario">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="rol">Rol</label>
              <select class="form-control" id="rol" name="rol" required>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Registrar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- REQUIRED SCRIPTS -->

  <!-- jQuery -->
  <script src="../plugins/jquery/jquery.min.js"></script>
  <!-- Bootstrap 4 -->
  <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- AdminLTE App -->
  <script src="../dist/js/adminlte.min.js"></script>

  <!-- Script para manejo de usuarios (AJAX o similar) -->
  <script src="../../js/usuarios.js"></script>
</body>
</html>
<%
  } else {
    response.sendRedirect("../backend/login.jsp");
  }
%>
