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
              <h1 class="m-0">Ventas</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="inicio.jsp">Página Principal</a></li>
                <li class="breadcrumb-item active">Ventas</li>
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
                  <h3 class="card-title"> Registrar Venta</h3>
                </div>
                <div class="card-body">
                  <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#registrarVentaModal">Nuevo Registro</button>
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div class="card card-orange card-outline">
                <div class="card-header">
                  <h3 class="card-title">Listado De Ventas</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                  <div class="form-group">
                    <table id="tablaVentas" class="table table-responsive-lg table-bordered table-hover">
                      <thead>
                        <tr class="text-center">
                          <th>Fecha</th>
                          <th>Usuario</th>
                          <th>Productos</th>
                          <th>Total</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Aquí se insertarán las filas de ventas dinámicamente con un script -->
                      </tbody>
                      <tfoot>
                        <tr class="text-center">
                          <th>Fecha</th>
                          <th>Usuario</th>
                          <th>Productos</th>
                          <th>Total</th>
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

  <!-- Modal para registrar nueva venta -->
  <div class="modal fade" id="registrarVentaModal" tabindex="-1" role="dialog" aria-labelledby="registrarVentaModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="registrarVentaModalLabel">Registrar Venta</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="formRegistrarVenta">
            <div class="form-group">
              <label for="productos">Productos</label>
              <input type="text" class="form-control" id="productos" name="productos" required>
            </div>
            <div class="form-group">
              <label for="total">Total</label>
              <input type="number" class="form-control" id="total" name="total" required>
            </div>
            <div class="form-group">
              <label for="usuario">Usuario</label>
              <input type="text" class="form-control" id="usuario" name="usuario" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrar Venta</button>
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

  <!-- Script para manejo de ventas (AJAX o similar) -->
  <script src="../../js/ventas.js"></script>
</body>
</html>
<%
  } else {
    response.sendRedirect("../backend/login.jsp");
  }
%>
