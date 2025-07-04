document.getElementById('open-login').addEventListener('click', (e) => {
  e.preventDefault(); // Evita la redirección automática del <a>

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario) {
    // Usuario logueado → ir a detalles de cuenta
    window.location.href = 'index.jsp';
  } else {
    // Sin sesión → ir al login
    window.location.href = 'login.jsp';
  }
});


const usuario = JSON.parse(localStorage.getItem('usuario'));
const nombreSpan = document.getElementById('nombre-usuario');

if (usuario && usuario.nombre) {
 
  const primerNombre = usuario.nombre.split(' ')[0];
  nombreSpan.textContent = primerNombre;
} else {
  nombreSpan.textContent = 'Iniciar Sesión';
}


//  Guardar carrito en localStorage
function saveCartToLocalStorage() {
  const items = [];
  document.querySelectorAll('.cart-items .item').forEach(item => {
    items.push({
      id: item.dataset.id,  // <-- nuevo
      name: item.querySelector('.details strong').textContent,
      price: parseFloat(item.dataset.price),
      img: item.querySelector('img').src
    });
  });
  localStorage.setItem('cart', JSON.stringify(items));
}



//  Cargar carrito desde localStorage
function loadCartFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem('cart')) || [];
  items.forEach(({ id, name, price, img }) => {
    const itemHTML = `
      <div class="item" data-id="${id}" data-price="${price}">
        <img src="${img}" alt="">
        <div class="details">
          <strong>${name}</strong><br>
          <span>S/ ${price}</span>
        </div>
        <button class="remove-item" onclick="removeItem(this)">🗑️</button>
      </div>
    `;
    document.getElementById('cart-items').insertAdjacentHTML('beforeend', itemHTML);
    cartCount++;
  });
  document.getElementById('cart-count').textContent = cartCount;
  updateTotal();
}


let cartCount = 0;

function updateTotal() {
  let total = 0;
  document.querySelectorAll('.cart-items .item').forEach(item => {
    total += parseFloat(item.dataset.price);
  });
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Delegación para agregar productos
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('add-to-cart')) {
    e.preventDefault();
    
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    const price = e.target.dataset.price;
    const img = e.target.dataset.img;

    const itemHTML = `
      <div class="item" data-id="${id}" data-price="${price}">
        <img src="${img}" alt="">
        <div class="details">
          <strong>${name}</strong><br>
          <span>S/ ${price}</span>
        </div>
        <button class="remove-item" onclick="removeItem(this)">🗑️</button>
      </div>
    `;

    document.getElementById('cart-items').insertAdjacentHTML('beforeend', itemHTML);
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    updateTotal();
    saveCartToLocalStorage(); // Guardar cada vez que se agrega
    document.getElementById('cart-slide').classList.add('open');
  }
});

// Eliminar producto del carrito
function removeItem(button) {
  const item = button.closest('.item');
  item.remove();
  cartCount--;
  document.getElementById('cart-count').textContent = cartCount;
  updateTotal();
  saveCartToLocalStorage(); // actualizar localStorage
}

//  Abrir/cerrar carrito
document.getElementById('open-cart').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('cart-slide').classList.add('open');
});
function closeCart() {
  document.getElementById('cart-slide').classList.remove('open');
}

// Cargar carrito al iniciar
window.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);
