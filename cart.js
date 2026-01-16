const CART_KEY = "baddies_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart(cart);
  alert("Added to cart");
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  renderCart();
}
