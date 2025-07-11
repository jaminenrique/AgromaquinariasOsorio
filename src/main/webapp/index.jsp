<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Distribuidora Osorio Agromaquinas</title>
    <!-- FUENTE GOOGLE FONTS : Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- ICONS: Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    <!-- ICONS: Line Awesome -->
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
    <!-- Animaciones AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">
    <!-- Mis Estilos -->
    <link rel="stylesheet" href="css/estilos_index.css">
    <link rel="stylesheet" href="css/iniciocss.css">
  </head>
  <body>

    <div class="hm-wrapper">
      <!-- ==========MODAL PARA VERIFICAR LA CUENTA=========== -->
      <div class="modal" id="myModal">
        <div class="modal-content">
          <div class="modal-header">
            Verificar Cuenta
          </div>
          <div class="modal-body">
            <input type="text" id="verificationCode" placeholder="Ingresa tu código de verificación">
            <button class="submit-button" id="submitButton">Enviar</button>
          </div>
          <button class="close-button" id="closeModalButton">Cerrar</button>
        </div>
      </div>
      <!-- ================HEADER MENU==================== -->
      <div class="hm-header">
        <div class="container">
          <div class="header-menu">
            <div class="hm-logo">
              <a href="#">
                <img src="img/logo-sinfondo.png" style="width: 125px; height: auto;">
              </a>
            </div>
            <button class="rounded-warning-button" id="openModalButton">
              <span>Cuenta no verificada</span>
            </button>
            <nav class="hm-menu">
              <ul>
                <li class="dropdown" id="dropdown-productos">
                  <span class="dropdown-toggle">Productos</span>
                  <div class="dropdown-content">
                    <a href="productos/cortadoras.html">Cortadoras</a>
                    <a href="productos/motosierras.html">Motosierras</a>
                    <a href="productos/atomizadores.html">Atomizadores</a>
                    <a href="productos/hidrolavadoras.html">Hidrolavadoras</a>
                    <a href="productos/accesorios.html">Accesorios</a>
                  </div>
                </li>
              </ul>
              <div class="hm-icon-cart">
                <a href="#" id="open-cart">
                  <i class="las la-shopping-cart"></i>
                  <span id="cart-count">0</span>
                </a>
              </div>
              <!-- Iniciar Session -->
              <div class="hm-icon-user" id="divIniciarSesion">
                <a href="login.jsp" id="open-login">
                  <i class="las la-user"></i>
                  <span>Iniciar Sesión</span>
                </a>
              </div>
              <!-- Cerrar Sessión -->           
              <div class="hm-icon-user" id="divCerrarSesion" style="display: none;">
                <span id="nombre-usuario" style="margin-left: 8px;"></span>
                <button type="button" class="hm-btn btn-primary" id="btnCerrarSession">
                  <i class="las la-user"></i>
                  <span> Cerrar Sesión</span>
                </button>
              </div>

              <div class="icon-menu">
                <button type="button"><i class="fas fa-bars"></i></button>
              </div>

            </nav>

          </div>
        </div>

      </div>

      <!-- =================================
         HEADER MENU Movil
      ================================== -->
      <div class="header-menu-movil">
        <button class="cerrar-menu"><i class="fas fa-times"></i></button>
        <ul>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Campañas</a></li>
          <li><a href="#">Nosotros</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>



      <!-- =================================
         BANNER
      ================================== -->
      <div class="hm-banner">
        <div class="img-banner">
          <img src="img/logo-home-master-s-t-o-r-e-4.jpg" alt="">
        </div>
        <a href=""></a>
      </div>


      <!-- =================================
        HOME PRODUCTOS DESTACADOS
     ================================== -->
      <div id="productos" class="hm-page-block bg-fondo">

        <div class="container">

          <div class="header-title" data-aos="fade-up">
            <h1>Productos populares</h1>
          </div>

          <!-- TABS -->
          <ul class="hm-tabs" data-aos="fade-up" id="categoryTabs">
            <!-- Se cargará el contenido de las categorias mediante JavaScript -->
          </ul>

          <!-- Contenido Principal de los Productos -->
          <!-- Este div siempre tendrá la clase 'tab-active' y contendrá el grid de productos o el mensaje -->
          <div class="tabs-content tab-active" data-aos="fade-up" id="productDisplayArea">
            <!-- Contenedor donde se insertarán los productos -->
            <div class="grid-product" id="productGrid">
              <!-- Los productos se cargarán aquí dinámicamente -->
            </div>
            <!-- Mensaje para cuando no hay productos -->
            <div id="noProductsMessage" style="display: none; text-align: center; padding: 20px; color: #555; font-size: 1.2em;">
              No hay productos disponibles en esta categoría.
            </div>
          </div>

          <!-- Carrito Slide -->
          <div id="cart-slide" class="cart-slide">
            <div class="cart-header">
              <h4>🛒 Tu Carrito</h4>
              <button onclick="closeCart()" class="close-cart">✕</button>
            </div>

            <div class="cart-items" id="cart-items">
              <!-- Productos se agregarán aquí dinámicamente -->
              <!--<div class="item" data-idProducto="1" data-price="S/. 100,20">
                <img src="img/atomizadores/atomizadores01.png" alt=""/>
                <div class="details">
                  <strong>MotosierraJesus</strong><br>
                  <span>S/. 150,20</span>
                  <br><input type="number" required="" min="1" max="10" id="cantidad" class="custom-number-input">
                  <div id="advertencia" class="warning">⚠️ Solo puedes ingresar un número del 1 al 10.</div>
                </div>
                <button class="remove-item" onclick="removeItem(this)">🗑️</button>
              </div>-->
            </div>

            <!-- NUEVO: Total + Botones -->
            <div class="cart-footer">
              <div class="cart-total">
                <strong>Total a pagar:</strong> S/ <span id="cart-total">0.00</span>
              </div>
              <div class="cart-actions" style="margin-top: 10px;">
                <button id="btn-comprar" class="hm-btn btn-primary uppercase" style="width: 100%; display: inline-block;">Comprar Ahora</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FORMULARIO DE VERIFICACIÓN -->
      <div id="verificacionDiv" style="display: none; margin-top: 10px;">
        <input type="text" id="codigoVerificacion" placeholder="Introduce tu código de verificación">
        <button onclick="validarCodigo()">Validar</button>
      </div>

      <script>
        // Función para mostrar el formulario de verificación
        function mostrarVerificacion() {
          document.getElementById('verificacionDiv').style.display = 'block';
        }

        // Función para validar el código
        function validarCodigo() {
          const codigo = document.getElementById('codigoVerificacion').value;
          fetch('srvUsuario?action=verificarCorreo&codigo=' + codigo)
                  .then(res => location.reload()); // O mostrar resultado con JS
        }
      </script>

      <!-- =================================
        FOOTER
     ================================== -->
      <footer>
        <div class="container">
          <div class="foo-row">
            <div class="foo-col">
              <ul>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div class="foo-copy">
        <div class="container">
          <p>Distribuidora Osorio Agromaquinas 2025 © Todos los derechos reservados</p>
        </div>
      </div>
    </div>

    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <!-- Ajax -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <!-- Animaciones : AOS-->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <!-- Mi Script -->
    <!--<script src="js/inicio.js" type="text/javascript">></script>-->
    <script src="js/script_index.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  </body>
</html> 