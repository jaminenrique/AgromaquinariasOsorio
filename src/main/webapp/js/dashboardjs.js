const usuario = JSON.parse(localStorage.getItem('usuario'));

if (!usuario || usuario.ROL !== 'ADMIN') {
    // Si no está logueado o no es cliente, redirigir al login o a otra página
  window.location.href = '../login/login.html';
}

