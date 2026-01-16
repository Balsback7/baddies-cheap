const container = document.getElementById("products");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let current = [...products];

function render(list) {
  container.innerHTML = "";
  list.forEach(p => {
    const bestDeal = p.price < p.oldPrice * 0.6;

    container.innerHTML += `
      <a class="card" href="product.html?id=${p.id}">
        <div class="stock">In Stock</div>
        ${bestDeal ? `<div class="deal">BEST DEAL</div>` : ""}

        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price} <span>$${p.oldPrice}</span></p>
      </a>
    `;
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

apply();
