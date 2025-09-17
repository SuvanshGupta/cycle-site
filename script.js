// Products data
const products = [
  {
    id: "prod1",
    name: "Steel Sprocket",
    image: "images/sprocket.jpg",
    short: "Durable heavy-duty steel sprocket.",
  },
  {
    id: "prod2",
    name: "Anti-Rust Chain",
    image: "images/chain.jpg",
    short: "High-strength chain with corrosion resistance.",
  },
  {
    id: "prod3",
    name: "Aluminium Pedal",
    image: "images/pedal.jpg",
    short: "Lightweight CNC alloy pedal.",
  },
];

// Render product cards
const grid = document.getElementById("productGrid");
products.forEach((p) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <div class="card-body">
      <h3>${p.name}</h3>
      <p>${p.short}</p>
    </div>`;
  grid.appendChild(card);
});

// Contact form
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.textContent = "Thank you! We'll get back to you soon.";
  form.reset();
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
