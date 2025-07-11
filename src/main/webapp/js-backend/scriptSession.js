$(document).ready(function () {
  var DOM = {
    frmLogin: $("#frmLogin"),
    txtCorreo: $("input#txtCorreo"),
    txtPassword: $("input#txtPassword"),
    alert: $("a#contenedor")
  };

  DOM.frmLogin.on("submit", function (e) {
    e.preventDefault();
    iniciarSession();
  });

  function iniciarSession() {
    const usuario = {
      correo: DOM.txtCorreo.val(),
      contrasena: DOM.txtPassword.val(),
      rol: {id_rol: 1}
    };
    $.ajax({
      url: "../srvUsuario?accion=iniciarSesion",
      type: 'POST',
      dataType: 'json',
      data: {usu: JSON.stringify(usuario)},
      success: function (data) {
        if (data.rpt || data.nombre) {
          DOM.alert[0].textContent = data.msj;
          setTimeout(function () {
            window.location.href = "inicio.jsp";
          }, 2500);
        } else {
          DOM.alert[0].textContent = data.msj;
        }
      }, error: function (jqXHR, textStatus, errorThrown) {
        DOM.alert[0].textContent = 'Error en el servidor';
      }
    });
  }
  ;
});

