/* ================================
   SAKURA IZAKAYA ONLINE SHOP
   Frontend script.js
   ================================ */

// ---------- DATA ----------
const storeName = "SAKURA IZAKAYA ONLINE SHOP";

const izakayaMenuData = {
  "Classic Takoyaki": {
    price: 90,
    desc: "Osaka’s legendary street food. Crispy outside, fluffy inside 🍡"
  },
  "Cheese Takoyaki": {
    price: 120,
    desc: "Gooey cheese meets octopus 🧀🐙"
  },
  "Spicy Takoyaki": {
    price: 110,
    desc: "Chili flakes + spicy mayo 🔥"
  },
  "Okonomiyaki": {
    price: 1100,
    desc: "Savory Osaka pancake with pork & cabbage 🥢"
  },
  "Ramen": {
    price: 900,
    desc: "Rich pork broth, chashu, egg 🍜"
  }
};

const drinkMenu = [
  { name: "Sapporo Beer", price: 600, alcoholic: true },
  { name: "Ramune", price: 350, alcoholic: false },
  { name: "Oolong Tea", price: 300, alcoholic: false }
];

// ---------- STATE ----------
let cart = [];
let currentUser = {
  name: "Guest",
  age: 18,
  loggedIn: false
};

// ---------- HELPERS ----------
function formatYen(amount) {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ---------- CART ----------
function addToCart(name, price, qty = 1) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// ---------- RENDERING ----------
function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  Object.entries(izakayaMenuData).forEach(([name, data]) => {
    const item = document.createElement("div");
    item.className = "menu-item";

    item.innerHTML = `
      <h3>${name}</h3>
      <p>${data.desc}</p>
      <strong>${formatYen(data.price)}</strong>
      <button>Add</button>
    `;

    item.querySelector("button").onclick = () =>
      addToCart(name, data.price);

    menuDiv.appendChild(item);
  });
}

function renderDrinks() {
  const drinkDiv = document.getElementById("drinks");
  drinkDiv.innerHTML = "";

  drinkMenu.forEach(d => {
    const item = document.createElement("div");
    item.className = "menu-item";

    const disabled =
      d.alcoholic && currentUser.age < 20 ? "disabled" : "";

    item.innerHTML = `
      <h3>${d.name}</h3>
      <p>${d.alcoholic ? "Alcoholic 🍺" : "Non-alcoholic 🥤"}</p>
      <strong>${formatYen(d.price)}</strong>
      <button ${disabled}>Add</button>
    `;

    if (!disabled) {
      item.querySelector("button").onclick = () =>
        addToCart(d.name, d.price);
    }

    drinkDiv.appendChild(item);
  });
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>🛒 Cart is empty</p>";
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <span>${item.qty} × ${item.name}</span>
      <span>${formatYen(item.qty * item.price)}</span>
      <button>✕</button>
    `;

    row.querySelector("button").onclick = () =>
      removeFromCart(index);

    cartDiv.appendChild(row);
  });

  const total = document.createElement("div");
  total.className = "cart-total";
  total.innerHTML = `<strong>Total: ${formatYen(cartSubtotal())}</strong>`;
  cartDiv.appendChild(total);
}

// ---------- CHECKOUT ----------
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert(
    `Thank you for your order!\nTotal: ${formatYen(cartSubtotal())}\n\nありがとうございました 🌸`
  );

  cart = [];
  renderCart();
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("store-name").textContent = storeName;
  renderMenu();
  renderDrinks();
  renderCart();
});
