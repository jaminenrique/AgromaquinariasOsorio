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
                <h1 class="m-0">Productos</h1>
              </div><!-- /.col -->
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Página Principal</a></li>
                  <li class="breadcrumb-item active">Productos</li>
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
                    <h3 class="card-title"> Registrar Productos</h3>
                  </div>
                  <div class="card-body">
                    <button type="button" class="btn btn-outline-info"> Nuevo Registro </button>
                  </div>
                </div>
              </div>
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div class="card card-orange card-outline">
                  <div class="card-header">
                    <h3 class="card-title">Listado De Productos</h3>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                    <div class="form-group">
                      <table id="tablaProductos" class="table table-responsive-lg table-bordered table-hover">
                        <thead>
                          <tr class="text-center">
                            <th>Id</th>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoria</th>
                            <th>Estado</th>                                                    
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                          <tr class="text-center">
                            <th>Id</th>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoria</th>
                            <th>Estado</th>                                                    
                            <th>Acciones</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <!-- /.card-body -->
                  </div>
                  <!-- /.card -->
                </div>   
              </div>
              <!-- /.col-md-6 -->
              <div class="col-lg-12">

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

    <!-- REQUIRED SCRIPTS -->

    <!-- jQuery -->
    <script src="../plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../dist/js/adminlte.min.js"></script>
  </body>
</html>
<%
  } else {
    response.sendRedirect("../backend/login.jsp");
  }
%>
