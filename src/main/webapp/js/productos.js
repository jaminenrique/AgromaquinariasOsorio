const usuario = JSON.parse(localStorage.getItem('usuario'));

if (!usuario || usuario.ROL !== 'ADMIN') {
    // Si no está logueado o no es cliente, redirigir al login o a otra página
  window.location.href = '../login/login.html';
}

const usuarioadmin = JSON.parse(localStorage.getItem('usuario'));
const nombreSpan = document.getElementById('nombre-admin');

if (usuarioadmin && usuarioadmin.NOMBRE) {
  const primerNombre = usuario.NOMBRE.split(' ')[0];
  nombreSpan.textContent = primerNombre;
} else {
  nombreSpan.textContent = 'Usuario';
}

document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('usuario'); 
  Swal.fire({
    icon: 'success',
    title: 'Sesión cerrada',
    text: 'Hasta pronto',
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    window.location.href = 'login.html'; 
  });
});


// Función para cargar todos los productos en la tabla
function cargarTablaProductos() {
  fetch('http://localhost:3000/api/productos')
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('#dataTable tbody');
      tbody.innerHTML = ''; // Limpiar la tabla

      data.forEach(p => {
        tbody.innerHTML += `
          <tr data-id="${p.ID_PRODUCTO}">
            <td>${p.NOMBRE}</td>
            <td>${p.DESCRIPCION}</td>
            <td>S/ ${p.PRECIO}</td>
            <td>
              <button class="btn btn-warning btn-sm edit-btn" title="Editar"><i class="fas fa-edit"></i></button>
            </td>
            <td>
              <button class="btn btn-danger btn-sm delete-btn" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        `;
      });

      asignarEventosBotones(); // Si tienes funciones de editar o eliminar
    });
}


let idProductoActual = null; // Guardar ID del producto al editar

// Asignar eventos a los botones de Editar y Eliminar
function asignarEventosBotones() {
  // Botones eliminar
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const id = row.getAttribute('data-id');

      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Llamar API para eliminar
          fetch(`http://localhost:3000/api/productos/${id}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (response.ok) {
              Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
              cargarTablaProductos(); // Recargar tabla
            } else {
              throw new Error('Error al eliminar');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al eliminar.', 'error');
          });
        }
      });
    });
  });

  // Botones editar
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      idProductoActual = row.getAttribute('data-id');

      const cells = row.querySelectorAll('td');

      // Rellenar el modal de edición
      document.getElementById('editName').value = cells[0].innerText;
      document.getElementById('editDesc').value = cells[1].innerText;
      document.getElementById('editPrice').value = cells[2].innerText.replace('S/ ', '');

      $('#editModal').modal('show'); // Mostrar modal de edición
    });
  });
}

// Confirmar edición
document.getElementById('confirmEdit').addEventListener('click', () => {
  Swal.fire({
    title: '¿Estás seguro de editar?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, editar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed && idProductoActual) {
      const updatedProduct = {
        nombre: document.getElementById('editName').value,
        descripcion: document.getElementById('editDesc').value,
        precio: parseFloat(document.getElementById('editPrice').value)
      };

      fetch(`http://localhost:3000/api/productos/${idProductoActual}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      })
      .then(response => {
        if (response.ok) {
          Swal.fire('¡Editado!', 'El producto fue actualizado.', 'success');
          $('#editModal').modal('hide');
          cargarTablaProductos();
        } else {
          throw new Error('Error al editar');
        }
      })
      .catch(() => {
        Swal.fire('Error', 'Hubo un problema al editar.', 'error');
      });
    }
  });
});

// Agregar producto
document.getElementById('agregarProducto').addEventListener('click', () => {
  $('#addModal').modal('show');
});

// Confirmar registro de producto nuevo
document.getElementById('registrarProducto').addEventListener('click', () => {
  const nombre = document.getElementById('agregarNombre').value;
  const descripcion = document.getElementById('agregarDescripcion').value;
  const precio = parseFloat(document.getElementById('agregarPrecio').value);

  if (!nombre || !descripcion || isNaN(precio)) {
    Swal.fire('Error', 'Por favor completa todos los campos correctamente.', 'error');
    return;
  }

  fetch('http://localhost:3000/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, descripcion, precio })
  })
  .then(response => {
    if (response.ok) {
      Swal.fire('Registrado', 'El producto fue agregado correctamente.', 'success');
      $('#addModal').modal('hide');
      cargarTablaProductos();
    } else {
      throw new Error('Error al registrar');
    }
  })
  .catch(() => {
    Swal.fire('Error', 'Hubo un problema al registrar.', 'error');
  });
});

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarTablaProductos();
});
