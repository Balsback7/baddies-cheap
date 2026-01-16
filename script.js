// Add to your existing script.js file:

// Cart functionality
let cart = JSON.parse(localStorage.getItem('baddies_cart')) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  localStorage.setItem('baddies_cart', JSON.stringify(cart));
  updateCartCount();
  return false; // Prevent default link behavior
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('baddies_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Add cart icon to header in index.html
function addCartIcon() {
  const header = document.querySelector('.topbar h1');
  if (header && !document.getElementById('cart-link')) {
    header.insertAdjacentHTML('afterend', `
      <a href="checkout.html" id="cart-link" style="position: relative; margin-left: 20px;">
        🛒
        <span id="cart-count" style="
          position: absolute;
          top: -8px;
          right: -8px;
          background: #00D632;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        ">0</span>
      </a>
    `);
    updateCartCount();
  }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  addCartIcon();
});

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
