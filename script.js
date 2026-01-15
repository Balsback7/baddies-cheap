const container = document.getElementById("products");

function render(list) {
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <a class="card" href="product.html?id=${p.id}">
        <div class="stock">In Stock</div>

        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price} <span>$${p.oldPrice}</span></p>
      </a>
    `;
  });
}

render(products);
