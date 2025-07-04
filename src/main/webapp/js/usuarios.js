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

// Cargar todos los usuarios
function cargarTablaUsuarios() {
    fetch('http://localhost:3000/api/usuarios')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('#userTable tbody');
        tbody.innerHTML = ''; // Limpiar la tabla
  
        data.forEach(u => {
          tbody.innerHTML += `
            <tr data-id="${u.ID_USUARIO}">
              <td>${u.NOMBRE}</td>
              <td>${u.CORREO}</td>
              <td>${u.ROL}</td>
              <td>
                <button class="btn btn-danger btn-sm delete-btn" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          `;
        });
  
        asignarEventosUsuario();
      });
  }
  
  let idUsuarioActual = null;
  
  // Asignar eventos de edición y eliminación
  function asignarEventosUsuario() {
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const row = this.closest('tr');
        const id = row.getAttribute('data-id');
  
        Swal.fire({
          title: '¿Eliminar usuario?',
          text: "Esta acción no se puede deshacer.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result.isConfirmed) {
            fetch(`http://localhost:3000/api/usuarios/${id}`, {
              method: 'DELETE'
            })
            .then(res => {
              if (res.ok) {
                Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success');
                cargarTablaUsuarios();
              } else {
                throw new Error('Error al eliminar');
              }
            })
            .catch(() => Swal.fire('Error', 'No se pudo eliminar.', 'error'));
          }
        });
      });
    });
  
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function () {
        const row = this.closest('tr');
        idUsuarioActual = row.getAttribute('data-id');
        const cells = row.querySelectorAll('td');
  
        document.getElementById('editUserName').value = cells[0].innerText;
        document.getElementById('editUserEmail').value = cells[1].innerText;
  
        $('#editUserModal').modal('show');
      });
    });
  }
  
  // Confirmar edición de usuario
  document.getElementById('confirmEditUser').addEventListener('click', () => {
    Swal.fire({
      title: '¿Guardar cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed && idUsuarioActual) {
        const updatedUser = {
          nombre: document.getElementById('editUserName').value,
          correo: document.getElementById('editUserEmail').value
        };
  
        fetch(`http://localhost:3000/api/usuarios/${idUsuarioActual}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
        })
        .then(res => {
          if (res.ok) {
            Swal.fire('Actualizado', 'Usuario actualizado.', 'success');
            $('#editUserModal').modal('hide');
            cargarTablaUsuarios();
          } else {
            throw new Error('Error al actualizar');
          }
        })
        .catch(() => Swal.fire('Error', 'No se pudo actualizar.', 'error'));
      }
    });
  });
  
  // Mostrar modal para nuevo usuario
  document.getElementById('agregarUsuario').addEventListener('click', () => {
    $('#addUserModal').modal('show');
  });
  
  // Confirmar registro de nuevo usuario
  document.getElementById('registrarUsuario').addEventListener('click', () => {
    const nombre = document.getElementById('nuevoNombre').value.trim();
    const correo = document.getElementById('nuevoCorreo').value.trim();
    const clave = document.getElementById('nuevaContrasena').value.trim();
    const rol = document.getElementById('nuevoRol').value.trim(); 
  
    if (!nombre || !correo || !clave || !rol) {
      Swal.fire('Error', 'Completa todos los campos.', 'error');
      return;
    }
  
    fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, correo, clave, rol })
    })
    .then(res => {
      if (res.ok) {
        Swal.fire('Registrado', 'Usuario creado exitosamente.', 'success');
        $('#addUserModal').modal('hide');
        cargarTablaUsuarios();
      } else {
        throw new Error('Error al registrar');
      }
    })
    .catch(() => Swal.fire('Error', 'No se pudo registrar.', 'error'));
  });
  
  
  // Cargar al iniciar
  document.addEventListener('DOMContentLoaded', cargarTablaUsuarios);
  