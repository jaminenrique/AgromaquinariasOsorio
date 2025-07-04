// cargaR CARRTO
document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartItems.length;
  }
});


function renderizarTablaCarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('carrito-body');
    let subtotal = 0;
    tbody.innerHTML = '';
  
    carrito.forEach((producto, index) => {
      const cantidad = producto.cantidad || 1;
      const total = cantidad * parseFloat(producto.price);
      subtotal += total;
  
      tbody.innerHTML += `
        <tr>
          <td>
            <img src="${producto.img}" style="width: 80px; margin-right: 10px;">
            ${producto.name}
          </td>
          <td>S/. ${parseFloat(producto.price).toFixed(2)}</td>
          <td>
            <button class="btn btn-light" onclick="cambiarCantidad(${index}, -1)">−</button>
            <input type="text" value="${cantidad}" disabled style="width: 30px; text-align: center;">
            <button class="btn btn-light" onclick="cambiarCantidad(${index}, 1)">+</button>
          </td>
          <td>S/. ${total.toFixed(2)}</td>
          <td><button class="btn btn-light" btn-lg onclick="eliminarProducto(${index})">X</button></td>
        </tr>
      `;
    });
  
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  }
  
  // Cambiar cantidad del producto
  function cambiarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    carrito[index].cantidad = (carrito[index].cantidad || 1) + cambio;
    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
    localStorage.setItem('cart', JSON.stringify(carrito));
    renderizarTablaCarrito();
  }
  
  // Eliminar producto del carrito
  function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(carrito));
    renderizarTablaCarrito();
  }
  
  // Renderizar al cargar
  window.addEventListener('DOMContentLoaded', renderizarTablaCarrito);
  

  // generar venta
  document.getElementById('btn-terminar-pedido').addEventListener('click', function () {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    const usuario = JSON.parse(localStorage.getItem('usuario'));
  
    if (!usuario) {
      Swal.fire('Error', 'Debes iniciar sesión para realizar una compra.', 'error');
      return;
    }
  
    if (items.length === 0) {
      Swal.fire('Carrito vacío', 'No hay productos en tu carrito.', 'warning');
      return;
    }
  
    // Agrupar productos por id
    const productosMap = {};
    items.forEach(({ id, price, cantidad }) => {
      const key = id.toString();
      if (!productosMap[key]) {
        productosMap[key] = {
          producto_id: parseInt(id),
          cantidad: cantidad || 1,
          precio_unitario: parseFloat(price)
        };
      } else {
        productosMap[key].cantidad += cantidad || 1;
      }
    });
  
    const productos = Object.values(productosMap);
    const total = productos.reduce((acc, p) => acc + p.cantidad * p.precio_unitario, 0);
  
    const ventaData = {
      total,
      id_usuario: usuario.ID_USUARIO, // 👈 enviar el usuario logueado
      productos
    };
  
    fetch('http://localhost:3000/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ventaData)
    })
      .then(res => res.json())
      .then(response => {
        if (response.id_venta) {
          Swal.fire({
            title: `¡Gracias por tu compra, ${usuario.NOMBRE}!`,
            html: `
              <p>Tu número de venta es <strong>#${response.id_venta}</strong>.</p>
              <p>Total: <strong>S/ ${total.toFixed(2)}</strong></p>
            `,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
  
          // Limpiar carrito visual y localStorage
          localStorage.removeItem('cart');
          const carritoBody = document.getElementById('carrito-body');
          if (carritoBody) carritoBody.innerHTML = ''; // corregido ID
          const count = document.getElementById('cart-count');
          if (count) count.textContent = '0';
          const totalBox = document.getElementById('cart-total');
          if (totalBox) totalBox.textContent = '0.00';
        } else {
          Swal.fire('Error', 'No se pudo registrar la venta.', 'error');
        }
      })
      .catch(error => {
        console.error('Error al enviar la venta:', error);
        Swal.fire('Error', 'Hubo un problema en el servidor.', 'error');
      });
  });
  
  