[file name]: script.js
[file content begin]
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById("products");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");
  
  // Check if products are loaded
  if (typeof products === 'undefined') {
    console.error('products.js not loaded');
    container.innerHTML = '<p style="text-align: center; padding: 40px;">Products loading failed. Please refresh the page.</p>';
    return;
  }
  
  console.log('Products loaded:', products); // Debug log
  
  let current = [...products];

  function render(list) {
    if (list.length === 0) {
      container.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">No products found.</p>';
      return;
    }
    
    container.innerHTML = "";
    list.forEach(p => {
      const bestDeal = p.price < p.oldPrice * 0.6;

      const productCard = document.createElement('a');
      productCard.className = 'card';
      productCard.href = `product.html?id=${p.id}`;
      
      productCard.innerHTML = `
        <div class="stock">In Stock</div>
        ${bestDeal ? `<div class="deal">BEST DEAL</div>` : ""}
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Product+Image'">
        <h3>${p.name}</h3>
        <p class="price">$${p.price} ${p.oldPrice ? `<span>$${p.oldPrice}</span>` : ''}</p>
      `;
      
      container.appendChild(productCard);
    });
  }

  function apply() {
    let list = [...products];

    const q = searchInput.value.toLowerCase();
    if (q) {
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    if (sortSelect.value === "price") {
      list.sort((a, b) => a.price - b.price);
    } else {
      list.sort((a, b) => a.relevance - b.relevance);
    }

    render(list);
  }

  searchInput.addEventListener("input", apply);
  sortSelect.addEventListener("change", apply);

  // Initial render
  apply();
});
[file content end]
