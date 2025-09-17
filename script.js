// ====== PRODUCTS: edit this array to add / remove products ======
const products = [
  {
    id: "prod1",
    name: "Sprocket — Heavy Duty (Steel)",
    image: "images/product1.jpg",
    short: "Hard-wearing steel sprocket for heavy-duty bikes.",
    desc: "Precision-cut 104mm sprocket made from heat-treated steel. MOQ: 100 pcs."
  },
  {
    id: "prod2",
    name: "Chain — 1/2 x 1/8 (Rust Resistant)",
    image: "images/product2.jpg",
    short: "Durable chain with anti-corrosion coating.",
    desc: "High fatigue life chain. Available in 1m lengths or custom bundles."
  },
  // add more products here...
];

// render product cards
const grid = document.getElementById('productGrid');
products.forEach(p=>{
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" />
    <h3>${escapeHtml(p.name)}</h3>
    <p>${escapeHtml(p.short)}</p>
    <div class="meta">
      <span>SKU: ${p.id}</span>
      <button data-id="${p.id}" class="viewBtn">View</button>
    </div>
  `;
  grid.appendChild(el);
});

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbMeta = document.getElementById('lbMeta');
document.body.addEventListener('click', (e)=>{
  const btn = e.target.closest('.viewBtn');
  if(!btn) return;
  const id = btn.dataset.id;
  const prod = products.find(x=>x.id===id);
  if(!prod) return;
  lbImage.src = prod.image;
  lbImage.alt = prod.name;
  lbMeta.innerHTML = `<h3>${escapeHtml(prod.name)}</h3><p>${escapeHtml(prod.desc)}</p>`;
  lightbox.setAttribute('aria-hidden','false');
});
document.getElementById('lbClose').addEventListener('click', ()=> {
  lightbox.setAttribute('aria-hidden','true');
  lbImage.src=''; lbImage.alt='';
});
// close on outside click
lightbox.addEventListener('click', (e)=> {
  if (e.target === lightbox) {
    lightbox.setAttribute('aria-hidden','true');
    lbImage.src=''; lbImage.alt='';
  }
});
// close on Escape
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape') lightbox.setAttribute('aria-hidden','true');
});

// Simple form handler: opens mail client as fallback
const form = document.getElementById('enquiryForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const message = data.get('message').trim();
  if(!name || !email || !message){ formMsg.textContent = 'Please fill all fields.'; return; }
  // try to open mailto
  const subject = encodeURIComponent(`Enquiry from website: ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:info@acmecycle.com?subject=${subject}&body=${body}`;
  formMsg.textContent = 'Opening your email client...';
});

// small helper
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// set year
document.getElementById('year').textContent = new Date().getFullYear();

