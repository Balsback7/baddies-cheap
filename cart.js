[file name]: cart.js
[file content begin]
// Cart System for Baddies Cheap
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('baddiesCart')) || [];
    this.updateCartCount();
  }

  add(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    this.save();
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`);
  }

  remove(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    this.updateCartCount();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.remove(productId);
      } else {
        item.quantity = quantity;
        this.save();
        this.updateCartCount();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.save();
    this.updateCartCount();
  }

  save() {
    localStorage.setItem('baddiesCart', JSON.stringify(this.items));
  }

  updateCartCount() {
    const count = this.getItemCount();
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
      element.textContent = count;
      element.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <span>${message}</span>
      <a href="cart.html" class="view-cart-btn">View Cart</a>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #000;
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 15px;
      animation: slideIn 0.3s ease;
      font-size: 14px;
    `;

    // Add button styles
    notification.querySelector('.view-cart-btn').style.cssText = `
      background: white;
      color: #000;
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  }
}

// Initialize cart globally
window.cart = new Cart();

// Add CSS animations
if (!document.querySelector('#cart-styles')) {
  const style = document.createElement('style');
  style.id = 'cart-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ff4444;
      color: white;
      font-size: 11px;
      font-weight: 600;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
    }
  `;
  document.head.appendChild(style);
}
[file content end]
