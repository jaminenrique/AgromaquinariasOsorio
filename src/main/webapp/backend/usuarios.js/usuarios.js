$(document).ready(function () {
  $.ajax({
    url: '../../ListarUsuarios',
    method: 'GET',
    success: function (data) {
      let tbody = $('#tablaUsuarios tbody');
      tbody.empty();

      data.forEach(function (usuario) {
        let row = `<tr class="text-center">
                     <td>${usuario.nombre}</td>
                     <td>${usuario.email}</td>
                     <td>${usuario.rol}</td>
                     <td><button class="btn btn-sm btn-warning">Editar</button></td>
                   </tr>`;
        tbody.append(row);
      });
    },
    error: function () {
      alert("Error al cargar usuarios");
    }
  });
});
