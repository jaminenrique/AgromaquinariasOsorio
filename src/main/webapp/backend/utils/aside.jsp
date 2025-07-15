<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->
  <a href="index3.html" class="brand-link">
    <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
    <span class="brand-text font-weight-light">Agromaquinarias Osorio Admin</span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img src="../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
      </div>
      <div class="info">
        <a href="#" class="d-block">${usuario.nombre}</a>
      </div>
    </div>

    <!-- SidebarSearch Form -->
    <div class="form-inline">
      <div class="input-group" data-widget="sidebar-search">
        <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-sidebar">
            <i class="fas fa-search fa-fw"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library -->
        <li class="nav-item menu-open">
          <a href="#" class="nav-link <% if (request.getRequestURI().contains("inicio.jsp")) { %>active<% } %>"> <!-- CAMBIO AQUI -->
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>
              Página Principal
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="inicio.jsp" class="nav-link <% if (request.getRequestURI().contains("inicio.jsp")) { %>active<% } %>"> <!-- CAMBIO AQUI -->
                <i class="far fa-circle nav-icon"></i>
                <p>Inicio</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="../backend/productos.jsp" class="nav-link <% if (request.getRequestURI().contains("productos.jsp")) { %>active<% } %>"> <!-- CAMBIO AQUI -->
                <i class="far fa-circle nav-icon"></i>
                <p>Productos</p>
              </a>
            </li> 
            <!-- Agregar opción para Ventas -->
            <li class="nav-item">
              <a href="../backend/ventas.jsp" class="nav-link <% if (request.getRequestURI().contains("ventas.jsp")) { %>active<% } %>">
                <i class="far fa-circle nav-icon"></i>
                <p>Ventas</p>
              </a>
            </li>
            <!-- Agregar opción para Usuarios -->
            <li class="nav-item">
              <a href="../backend/usuarios.jsp" class="nav-link <% if (request.getRequestURI().contains("usuarios.jsp")) { %>active<% } %>">
                <i class="far fa-circle nav-icon"></i>
                <p>Usuarios</p>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="../index.jsp" class="nav-link <% if (request.getRequestURI().contains("index.jsp")) { %>active<% }%>"> <!-- CAMBIO AQUI -->
            <i class="nav-icon fas fa-th"></i>
            <p>
              Ir a la Tienda
              <span class="right badge badge-danger">Nuevo</span>
            </p>
          </a>
        </li>

        <!-- Cerrar Sesión -->
        <li class="nav-item">
          <a href="logout.jsp" class="nav-link">
            <i class="nav-icon fas fa-sign-out-alt"></i>
            <p>Cerrar Sesión</p>
          </a>
        </li>

        
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>
