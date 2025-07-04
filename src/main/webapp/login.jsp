<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Iniciar sesión</title>

    <!--========================================
        Fuentes - Tipo de letra - Iconografia 
    ==========================================-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">

    <!--========================================
       Mis estilos
    ==========================================-->
    <link rel="stylesheet" href="css/estilo-login.css">
  </head>
  <body>

    <!--========================================
       contenido
    ==========================================-->

    <div class="contenedor-login">
      
      <!-- Alerta de correo verificado -->

      <% if (session.getAttribute("verificado") != null && (Boolean) session.getAttribute("verificado")) { %>
        <div style="background-color: lightgreen; padding: 10px; border-radius: 5px;">
          Correo verificado
        </div>
      <% } %>
      
      <!-- Alerta de correo no verificado -->

      <% if (session.getAttribute("verificado") != null && !(Boolean) session.getAttribute("verificado")) { %>
        <div style="background-color: yellow; padding: 10px; border-radius: 5px;">
          Correo no verificado. <a href="#" onclick="mostrarVerificacion()">Verificar</a>
        </div>
      <% } %>

      <!--========================================
          Slider
      ==========================================-->
      <div class="contenedor-slider">

        <div class="slider">

          <!-- Slide 1 -->
          <div class="slide fade ">
            <img src="img/login/img-slider-login.jpg" alt="">

            <div class="contenido-slider">

              <div class="logo">
                <img src="img/login/logo-tienda-house-1.svg" alt="">
              </div>

            </div>

          </div>

          <!-- Slide 2 -->
          <div class="slide fade">
            <img src="img/login/img-slider-login-2.jpg" alt="">

            <div class="contenido-slider">

              <div class="logo">
                <img src="img/login/logo-tienda-house-1.svg" alt="">
              </div>

            </div>

          </div>

        </div>

        <!-- Botones next y prev -->
        <a href="#" class="prev"><i class="fas fa-chevron-left"></i></a>
        <a href="#" class="next"><i class="fas fa-chevron-right"></i></a>

        <!-- dots -->
        <div class="dots">

          <!-- <span class="dot active"></span> -->

        </div>

      </div>

      <!--========================================
          Formularios
      ==========================================-->
      <div class="contenedor-texto">

        <div class="contenedor-form">

          <h1 class="titulo">Bienvenido </h1>
          <p class="descripcion">Ingresa a tu cuenta para disfrutar de tus beneficios y de las mejores promociones que tenemos para ti.</p>

          <!-- Tabs -->
          <ul class="tabs-links">
            <li class="tab-link active">Iniciar Sesión</li>
            <li class="tab-link ">Registrate</li>
          </ul>

          <!--========================================
              Formulario logue
          ==========================================-->
          <form id="formLogin" class="formulario active">

            <div class="error-text">
              <p>aqui los errores del formualrio</p>
            </div>

            <input type="text" placeholder="Correo electrónico" class="input-text" name="correo" autocomplete="off"> 
            <div class="grupo-input">

              <input type="password" placeholder="Contraseña" name="password" class="input-text clave">
              <button type="button" class="icono fas fa-eye mostrarClave"></button>

            </div>

            <a href="#" class="link">¿Ovidaste tu contraseña?</a>
            <button class="btn" id="btnLogin" type="submit">Iniciar Sesión</button>
          </form>

          <!--========================================
             Formulario de Registro
         ==========================================-->
          <form action="" method="POST" id="formRegistro" class="formulario ">

            <div class="error-text ">

            </div>

            <input type="text" placeholder="Nombre y Apellidos" class="input-text" name="nombre" autocomplete="off"> 
            <input type="text" placeholder="Correo electrónico" class="input-text" name="correo" autocomplete="off"> 

            <div class="grupo-input">

              <input type="password" placeholder="Contraseña" name="password" class="input-text clave">
              <button type="button" class="icono fas fa-eye mostrarClave"></button>

            </div>

            <label class="contenedor-cbx animate">
              He leído y acepto los
              <a href="#" class="link">Términos y Condiciones</a>
              <a href="#" class="link">y Política de privacidad de mi Tienda</a>
              <input type="checkbox" name="cbx_terminos" >
              <span class="cbx-marca"></span>
            </label>
            <button class="btn" id="btnRegistro" type="button">Crear Cuenta</button>
          </form>
        </div>
      </div>
    </div>
    <!--========================================
       Mis Scripts
    ==========================================-->
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="js/script-login.js"></script>
    <script src="js/login.js"></script>
  </body>
</html>
