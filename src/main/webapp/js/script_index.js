/* global Swal, AOS */

let cartItems = {};
$(document).ready(function () {
  AOS.init({
    duration: 1200
  });
  listarCategorias();
  initializeEvents();
  document.getElementById('open-login').addEventListener('click', (e) => {
    e.preventDefault(); // Evita la redirección automática del <a>
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    verifyUser(usuario);
  });
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const nombreSpan = document.getElementById('nombre-usuario');
  if (usuario && usuario.nombre) {
    const primerNombre = usuario.nombre.split(' ')[0];
    nombreSpan.textContent = 'Bienvenido, ' + primerNombre;
    document.getElementById('divIniciarSesion').style.display = 'none';
    document.getElementById('divCerrarSesion').style.display = 'block';
    if (usuario.verificado) {
      document.getElementById('openModalButton').style.display = 'none';
    } else {
      document.getElementById('openModalButton').style.display = 'block';
    }
  } else {
    nombreSpan.textContent = 'Iniciar Sesión';
    document.getElementById('divIniciarSesion').style.display = 'block';
    document.getElementById('divCerrarSesion').style.display = 'none';
  }

  document.getElementById('btnCerrarSession').addEventListener('click', (e) => {
    // Eliminar el usuario del localStorage
    localStorage.removeItem('usuario');
    Swal.fire({
      title: 'Sesión Cerrada',
      text: 'Haz cerrado sesión correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      window.location.href = "index.jsp";
    });
  });
  // Puedes agregar aquí la lógica para manejar el clic en las pestañas
  // Por ejemplo, para cambiar la clase 'active' y filtrar productos
  $(document).on('click', '.hm-tab-link', function () {
    $('.hm-tab-link').removeClass('active');
    $(this).addClass('active');
    var tipoCategoria = $(this).data('tipo');
    var idCategoria = $(this).data('id'); // Obtener el ID de la categoría
    console.log("Categoría seleccionada:", tipoCategoria, "ID:", idCategoria);
    console.log("Categoría seleccionada:", tipoCategoria);
    listarProductosPorIdCategoria(idCategoria);
  });
  //  Abrir/cerrar carrito
  document.getElementById('open-cart').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('cart-slide').classList.add('open');
  });
  // Agregar productos al carrito
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('add-to-cart')) {
      e.preventDefault();

      const id = e.target.dataset.id;
      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);
      const img = e.target.dataset.img;

      // Si el producto ya está en el carrito
      if (cartItems[id]) {
        // Si ya tiene menos de 10, incrementa
        if (cartItems[id].cantidad < 10) {
          cartItems[id].cantidad++;
        } else {
          alert("No puedes agregar más de 10 unidades de este producto.");
          return;
        }
      } else {
        // Nuevo producto
        cartItems[id] = {
          producto: {
            idProducto: parseInt(id),
            nombre: name,
            precio: price,
            img: img
          },
          cantidad: 1
        };
      }
      document.getElementById('cart-slide').classList.add('open');
      renderCart();
    }
  });
  // Escuchar cambios de cantidad manualmente
  document.addEventListener('input', function (e) {
    if (e.target && e.target.classList.contains('custom-number-input')) {
      const boton = document.getElementById('btn-comprar');
      const input = e.target;
      const advertencia = input.parentElement.querySelector('.advertencia'); // busca advertencia relativa
      const id = e.target.dataset.id;

      let valor = input.value;

      // Limita el número de caracteres a 2 (máximo 99 por seguridad)
      if (valor.length > 2) {
        valor = valor.slice(0, 2);
        input.value = valor;
      }

      let value = parseInt(valor, 10);

      // Validación de cantidad
      const esValido = !isNaN(value) && value >= 1 && value <= 10;

      if (!esValido) {
        advertencia.style.display = 'block';
        boton.disabled = true;
      } else {
        advertencia.style.display = 'none';
        boton.disabled = false;

        // Si es válido, actualiza cantidad en memoria
        cartItems[id].cantidad = value;

        renderCart(); // actualiza subtotal y total
      }
    }
  });
  // Guardar pedido y enviar los datos al servlet
  document.getElementById('btn-comprar').addEventListener('click', function () {
    guardarPedido(); // Aquí llamamos tu función
  });
});

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = ''; // limpiar carrito visual

  let total = 0;
  let count = 0;

  Object.values(cartItems).forEach(item => {
    const subtotal = item.producto.precio * item.cantidad;
    total += subtotal;
    count++;

    const itemHTML = `
      <div class="item" data-id="${item.producto.idProducto}">
        <img src="${item.producto.img}" alt="">
        <div class="details">
          <strong>${item.producto.nombre}</strong><br>
          <span>S/ ${item.producto.precio.toFixed(2)}</span><br>
          <input type="number" required min="1" max="10" value="${item.cantidad}" 
                 class="custom-number-input" data-id="${item.producto.idProducto}">
          <div class="advertencia warning">⚠️ Solo puedes ingresar un número del 1 al 10.</div>
        </div>
        <button class="remove-item" onclick="removeItem(${item.producto.idProducto})">🗑️</button>
      </div>
    `;

    cartContainer.insertAdjacentHTML('beforeend', itemHTML);
  });

  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = `S/ ${total.toFixed(2)}`;
}

function guardarPedido() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    verifyUser(usuario);
  } else if (!usuario.verificado) {
    Swal.fire({
      title: 'Error',
      text: 'Estimado, ' + usuario.nombre + ' su cuenta no ha sido verificada, no se puede procesar la compra.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  } else {
    const carrito = {
      idUsuario: usuario.idUsuario, // cambiar según sesión real
      items: Object.values(cartItems)
    };
    $.ajax({
      url: "srvPedido?accion=createPedido",
      type: 'POST',
      dataType: 'json',
      data: {carrito: JSON.stringify(carrito)},
      success: function (data) {
        limpiarCarrito(); // 💥 Limpia el carrito sólo si el pedido fue exitoso
        document.getElementById('cart-slide').classList.remove('open');
        if (data.rpt) {
          Swal.fire({
            icon: 'success',
            title: 'Mensaje del sistema',
            text: data.msj,
            timer: 2500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = 'index.jsp'; // o index.html según tu estructura
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Mensaje del sistema',
            text: data.msj,
            timer: 2500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = 'index.jsp'; // o index.html según tu estructura
          });
        }
      },
      error: function () {
        alert("Error al enviar el pedido.");
        Swal.fire({
          icon: 'warning',
          title: 'Mensaje del sistema',
          text: "Ocurrio un error en el servidor",
          timer: 2500,
          showConfirmButton: false
        }).then(() => {
          window.location.href = 'index.jsp'; // o index.html según tu estructura
        });
      }
    });
  }
}

function listarCategorias() {
  $.ajax({
    url: "srvCategoria?accion=listCategory",
    type: 'GET',
    dataType: 'JSON',
    success: function (data) {
      var tpl = "";
      for (var i = 0; i < data.length; i++) {
        tpl += "<li class=\"hm-tab-link\" data-tipo=\"" + data[i].nombre + "\" data-id=\"" + data[i].idCategoria + "\">" + data[i].nombre + "</li>";
      }
      // Insertamos los <li> generados dentro del <ul> con id="categoryTabs"
      $("#categoryTabs").append(tpl); // Usamos append para añadir después del "Todas"
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error al cargar categorías: " + textStatus, errorThrown);
      // Si tu servlet devuelve un JSON de error con "msj", puedes mostrarlo:
      try {
        var errorResponse = JSON.parse(jqXHR.responseText);
        console.error("Mensaje de error del servidor: " + errorResponse.msj);
      } catch (e) {
        console.error("No se pudo parsear el error del servidor.");
      }
    }
  });
}
;

function listarProductosPorIdCategoria(idCategoria) {
  var productGrid = $("#productGrid");
  var noProductsMessage = $("#noProductsMessage");
  // Limpiar el contenido actual del grid de productos y ocultar el mensaje
  productGrid.empty();
  noProductsMessage.hide();
  $.ajax({
    url: "srvProductos?accion=retrieveProductByIdCategoria",
    type: 'GET',
    dataType: 'JSON',
    data: {idCategoria: idCategoria},
    success: function (data) {
      if (data.length === 0) {
        // Si no hay productos, mostrar el mensaje y ocultar el grid
        noProductsMessage.show();
        productGrid.hide();
      } else {
        // Si hay productos, ocultar el mensaje y mostrar el grid
        noProductsMessage.hide();
        productGrid.show();
        var tpl = "";
        for (var i = 0; i < data.length; i++) {
          var producto = data[i];
          // Formatear el precio a 2 decimales para la visualización
          // Asegúrate de que el precio venga como un número en el JSON (ej. 1200.30)
          var precioFormateado = parseFloat(producto.precio).toFixed(2).replace('.', ','); // Cambiar punto por coma para formato español

          tpl += '<div data-id="' + producto.idProducto + '" class="product-item">' +
                  '<div class="p-portada">' +
                  '<img src="' + producto.imagen + '" alt="' + producto.nombre + '"/>' +
                  '</div>' +
                  '<div class="p-info">' +
                  '<h3>' + producto.nombre + '</h3>' +
                  '<div class="precio">' +
                  '<span>S/. ' + precioFormateado + '</span>' +
                  '</div>' +
                  // Datos para el carrito de compras (asegúrate de que coincidan con tus necesidades)
                  '<a href="#" class="hm-btn btn-primary uppercase add-to-cart"' +
                  ' data-id="' + producto.idProducto + '"' +
                  ' data-name="' + producto.nombre + '"' +
                  ' data-price="' + producto.precio + '"' + // Mantener el precio con punto para lógica interna si es necesario
                  ' data-img="' + producto.imagen + '">' +
                  'AGREGAR AL CARRITO' +
                  '</a>' +
                  '</div>' +
                  '</div>';
        }
        // Insertar los productos en el grid
        productGrid.html(tpl);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error al cargar categorías: " + textStatus, errorThrown);
      // Si tu servlet devuelve un JSON de error con "msj", puedes mostrarlo:
      try {
        var errorResponse = JSON.parse(jqXHR.responseText);
        console.error("Mensaje de error del servidor: " + errorResponse.msj);
      } catch (e) {
        console.error("No se pudo parsear el error del servidor.");
      }
    }
  });
}
;
function closeCart() {
  document.getElementById('cart-slide').classList.remove('open');
}

// Eliminar Productos del carrito
function removeItem(idProducto) {
  delete cartItems[idProducto];
  renderCart();
}

function limpiarCarrito() {
  // Vaciar el objeto de productos
  cartItems = {};

  // Vaciar el HTML de los ítems
  document.getElementById('cart-items').innerHTML = '';

  // Reiniciar contador del ícono
  document.getElementById('cart-count').textContent = '0';

  // Reiniciar total
  document.getElementById('cart-total').textContent = '0.00';
}

function verifyUser(usuario) {
  if (usuario) {
    // Usuario logueado → ir a la página principal
    window.location.href = 'index.jsp';
  } else {
    // Sin sesión → ir al login
    window.location.href = 'login.jsp';
  }
}

function initializeEvents() {
  const openModalButton = document.getElementById('openModalButton');
  const closeModalButton = document.getElementById('closeModalButton');
  const myModal = document.getElementById('myModal');
  const submitButton = document.getElementById('submitButton');

  // Abrir el modal (registrar el evento una sola vez)
  openModalButton.addEventListener('click', () => {
    console.log("Abriendo modal...");
    myModal.style.display = 'flex'; // Mostrar el modal
  });

  // Cerrar el modal (registrar el evento una sola vez)
  closeModalButton.addEventListener('click', () => {
    console.log("Cerrando modal...");
    myModal.style.display = 'none'; // Ocultar el modal
  });

  // Acción del botón "Enviar" (registrar el evento una sola vez)
  submitButton.addEventListener('click', () => {
    const verificationCodeInput = document.getElementById('verificationCode').value.trim();

    // Validar el código de verificación
    if (!verificationCodeInput) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa el código de verificación',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Obtener datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || !usuario.correo) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró información del usuario en el almacenamiento local',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Enviar datos al servlet mediante AJAX
    $.ajax({
      url: "srvUsuario?accion=verificarCorreo",
      type: 'POST',
      dataType: 'json',
      data: {codigo: verificationCodeInput, correo: usuario.correo},
      success: function (data) {
        if (data.rpt) {
          let usuario = JSON.parse(localStorage.getItem('usuario'));
          if (usuario) {
            usuario.verificado = true;
            localStorage.setItem('usuario', JSON.stringify(usuario));
          } else {
            console.error('No se encontro el objeto usuario en localStorage');
          }
          console.log(data);
          Swal.fire({
            title: 'Mensaje del sistema',
            text: data.msj,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.href = "index.jsp";
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: data.msj,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('Error en el servidor:', textStatus, errorThrown);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  });
}

//const headerMenu = document.querySelector('.hm-header');
//
//console.log(headerMenu.offsetTop);
//
//window.addEventListener('scroll', () => {
//  if (window.pageYOffset > 80) {
//    headerMenu.classList.add('header-fixed');
//  } else {
//    headerMenu.classList.remove('header-fixed');
//  }
//})
//
///*=========================================
// Tabs
// ==========================================*/
//document.addEventListener('DOMContentLoaded', () => {
//  cargarProductos();
//
//  // Agregar click a cada tab para filtrar
//  const tabLinks = document.querySelectorAll('.hm-tab-link');
//  const tabsContent = document.querySelectorAll('.tabs-content');
//
//  tabLinks.forEach((tab, i) => {
//    tab.addEventListener('click', () => {
//      // Activar visual del tab
//      tabLinks.forEach(t => t.classList.remove('active'));
//      tab.classList.add('active');
//
//      // Activar contenido del tab (mostrar el grid correcto)
//      tabsContent.forEach(tc => tc.classList.remove('tab-active'));
//      if (tabsContent[i])
//        tabsContent[i].classList.add('tab-active');
//
//      // Filtrar productos
//      const tipo = tab.dataset.tipo;
//      mostrarProductosFiltrados(tipo);
//    });
//  });
//
//  // Activar primero por defecto
//  if (tabLinks[0])
//    tabLinks[0].classList.add('active');
//  if (tabsContent[0])
//    tabsContent[0].classList.add('tab-active');
//});
//
//
//
//
///*=========================================
// MENU
// ==========================================*/
//
//const menu = document.querySelector('.icon-menu');
//const menuClose = document.querySelector('.cerrar-menu');
//
//menu.addEventListener('click', () => {
//  document.querySelector('.header-menu-movil').classList.add('active');
//})
//
//menuClose.addEventListener('click', () => {
//  document.querySelector('.header-menu-movil').classList.remove('active');
//})
//
//// productos despliegue
//
//const dropdown = document.getElementById('dropdown-productos');
//const toggle = dropdown.querySelector('.dropdown-toggle');
//
//// Abrir/cerrar con click
//toggle.addEventListener('click', function (e) {
//  e.stopPropagation(); // No cierra de inmediato
//  dropdown.classList.toggle('show');
//});
//
//// Cerrar al hacer clic fuera del menú
//document.addEventListener('click', function (e) {
//  if (!dropdown.contains(e.target)) {
//    dropdown.classList.remove('show');
//  }
//});
//
//// Mantener abierto mientras se pasa el mouse (para PC)
//dropdown.addEventListener('mouseenter', () => dropdown.classList.add('show'));
//dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('show'));


