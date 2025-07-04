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
    window.location.href = 'login.html'; // o index.html según tu estructura
  });
});

function cargarTablaVentas() {
  fetch('http://localhost:3000/api/ventas')
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('#dataTable tbody');
      tbody.innerHTML = ''; // Limpiar la tabla

      const ventasAgrupadas = {};

      data.forEach(row => {
        const idVenta = row.ID_VENTA;
        if (!ventasAgrupadas[idVenta]) {
          ventasAgrupadas[idVenta] = {
            fecha: row.FECHA,
            nombre_usuario: row.NOMBRE_USUARIO,
            productos: [],
            total: 0
          };
        }

        ventasAgrupadas[idVenta].productos.push(
          `${row.NOMBRE_PRODUCTO} (x${row.CANTIDAD})`
        );
        ventasAgrupadas[idVenta].total += row.CANTIDAD * row.PRECIO_UNITARIO;
      });

      const ventasTotales = Object.entries(ventasAgrupadas);
      console.log(`Total de ventas distintas: ${ventasTotales.length}`);

      ventasTotales.forEach(([id, venta]) => {
        tbody.innerHTML += `
          <tr data-id="${id}">
            <td>${new Date(venta.fecha).toLocaleDateString()}</td>
            <td>${venta.nombre_usuario}</td>
            <td>${venta.productos.join(', ')}</td>
            <td>S/ ${venta.total.toFixed(2)}</td>
            <td>
              <button class="btn btn-warning btn-sm edit-btn" title="Editar"><i class="fas fa-edit"></i></button>
            </td>
            <td>
              <button class="btn btn-danger btn-sm delete-btn" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        `;
      });
    });
}



  
  // Llamar cuando cargue la página
  document.addEventListener('DOMContentLoaded', cargarTablaVentas);
  
  
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const row = this.closest('tr');
  
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
            row.remove();
  
            Swal.fire(
              'Eliminado',
              'El producto ha sido eliminado.',
              'success'
            )
          }
        });
      });
    });
  
  
    let currentRow = null;
  
    // Evento para abrir el modal y llenar datos
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function () {
        currentRow = this.closest('tr');
        const cells = currentRow.querySelectorAll('td');
  
        // Rellenar formulario con los datos actuales
        document.getElementById('editName').value = cells[0].innerText;
        document.getElementById('editDesc').value = cells[1].innerText;
        document.getElementById('editPrice').value = cells[2].innerText;
  
        $('#editModal').modal('show');
      });
    });
  
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
        if (result.isConfirmed && currentRow) {
          // Actualizar la fila con los nuevos valores
          const cells = currentRow.querySelectorAll('td');
          cells[0].innerText = document.getElementById('editName').value;
          cells[1].innerText = document.getElementById('editDesc').value;
          cells[2].innerText = document.getElementById('editPrice').value;
  
          $('#editModal').modal('hide');
  
          Swal.fire('¡Editado!', 'El producto fue actualizado.', 'success');
        }
      });
    });
  