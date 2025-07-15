/* global Swal */

document.getElementById('formLogin').addEventListener('submit', (e) => {
  e.preventDefault();

  const correo = document.querySelector('input[name="correo"]').value.trim();
  const clave = document.querySelector('input[name="password"]').value.trim();
  const errorBox = document.querySelector('.error-text');

  if (!correo || !clave) {
    errorBox.innerHTML = '<p>Todos los campos son obligatorios.</p>';
    errorBox.style.display = 'block';
    return;
  }
  console.log({correo, clave});
  const usuario = {
    nombre: null,
    correo: correo,
    contrasena: clave,
    rol: {id_rol: 2}
  };
  $.ajax({
    url: "srvUsuario?accion=iniciarSesion",
    type: 'POST',
    dataType: 'json',
    data: {usu: JSON.stringify(usuario)},
    success: function (data, textStatus, jqXHR) {
      if (data.rpt || data.nombre) {
        localStorage.setItem('usuario', JSON.stringify(data));
        Swal.fire({
          title: 'Mensaje del sistema',
          text: 'Bienvenido(a), ' + data.nombre,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.href = "index.jsp";
        });
      } else {
        errorBox.innerHTML = '<p>Credenciales incorrectas</p>';
        errorBox.style.display = 'block';
      }
    }, error: function (jqXHR, textStatus, errorThrown) {
      errorBox.innerHTML = '<p>Error en el servidor.</p>';
      errorBox.style.display = 'block';
    }
  });
});

if (document.getElementById('btnRegistro')) {
  const btnRegistro = document.getElementById('btnRegistro');

  btnRegistro.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.getElementById('formRegistro');
    const errorBox = document.querySelector('#formRegistro .error-text');
    errorBox.innerHTML = '';
    errorBox.classList.remove('active');

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const clave = form.password.value.trim();
    const aceptaTerminos = form.cbx_terminos.checked;

    if (!nombre || !correo || !clave) {
      errorBox.innerHTML = '<p>Todos los campos son obligatorios.</p>';
      errorBox.classList.add('active');
      return;
    }

    if (!aceptaTerminos) {
      errorBox.innerHTML = '<p>Debes aceptar los Términos y Condiciones.</p>';
      errorBox.classList.add('active');
      return;
    }

    const usuario = {
      nombre: nombre,
      correo: correo,
      contrasena: clave,
      rol: {id_rol: 2}
    };

    $.ajax({
      url: "srvUsuario?accion=registrarUsuario",
      type: 'POST',
      dataType: 'json',
      data: {usu: JSON.stringify(usuario)},
      success: function (data, textStatus, jqXHR) {
        if (data) {
          console.log(data);
          Swal.fire('Registro exitoso', '¡Tu cuenta ha sido creada!', 'success');
          form.reset();
        } else {
          Swal.fire('Error', 'No se pudo registrar', 'error');
        }
      }, error: function (jqXHR, textStatus, errorThrown) {
        Swal.fire('Error', 'Hubo un problema con el servidor.', 'error');
      }
    });
  });
}

 