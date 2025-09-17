// ===== PRODUCTS: add / edit products here =====
const products = [
  {
    id: "SP-104",
    name: "104mm Steel Sprocket",
    image: "images/sprocket.jpg",
    short: "Heat-treated heavy-duty sprocket.",
    desc: "Precision-cut 104mm sprocket manufactured from heat-treated alloy steel. Suitable for heavy-load applications. Surface hardness: HRC 50-55. MOQ: 100 pcs.",
    specs: {
      Material: "Alloy Steel (EN9)",
      Diameter: "104 mm",
      Thickness: "4 mm",
      Finish: "Phosphate / Zinc",
      MOQ: "100 pcs",
      LeadTime: "3 weeks"
    },
    specPdf: "specs/sprocket-spec.pdf"
  },
  {
    id: "CH-118",
    name: "1/2 x 1/8 Anti-Rust Chain",
    image: "images/chain.jpg",
    short: "High-fatigue chain with corrosion-resistant coating.",
    desc: "Industrial-grade 1/2 x 1/8 chain with anti-corrosion coating, treated for improved fatigue life. Available in custom lengths and bulk packaging.",
    specs: {
      Pitch: "1/2\" x 1/8\"",
      Material: "Carbon Steel",
      Coating: "Zinc plating / Anti-rust",
      TensileStrength: "≥ 6.0 kN",
      MOQ: "200 m",
      LeadTime: "2 weeks"
    }
  },
  {
    id: "PD-AL01",
    name: "CNC Aluminium Pedal",
    image: "images/pedal.jpg",
    short: "Lightweight alloy pedal with textured grip.",
    desc: "CNC-machined aluminium pedal designed for low weight and high durability. Anodized finish available in black or silver.",
    specs: {
      Material: "6061-T6 Aluminium",
      Weight: "120 g (pair)",
      Surface: "Anodized",
      MOQ: "250 pairs",
      LeadTime: "4 weeks"
    }
  }
];

// Render product cards
const grid = document.getElementById("productGrid");
products.forEach(p => {
  const card = document.createElement("article");
  card.className = "card reveal";
  card.dataset.id = p.id; // make the whole card clickable
  card.innerHTML = `
    <div class="card-image">
      <img src="${p.image}" alt="${escapeHtml(p.name)}">
    </div>
    <div class="card-body">
      <h3>${escapeHtml(p.name)}</h3>
      <p>${escapeHtml(p.short)}</p>
      <div class="card-meta">
        <small>${p.id}</small>
        <button class="btn outline viewBtn" data-id="${p.id}">View</button>
      </div>
    </div>`;
  grid.appendChild(card);
});

// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, {threshold: 0.12});
reveals.forEach(r => obs.observe(r));

// ---------- Modal logic ----------
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalSpecs = document.getElementById('modalSpecs');
const enquireBtn = document.getElementById('enquireBtn');
const downloadBtn = document.getElementById('downloadBtn');

document.body.addEventListener('click', (ev) => {
  // button click OR whole card click
  const btn = ev.target.closest('.viewBtn, .card');
  if (!btn) return;

  const id = btn.dataset.id || btn.closest('.card').dataset.id;
  const prod = products.find(x => x.id === id);

  if (prod) openModal(prod);
});

function openModal(prod) {
  modal.setAttribute('aria-hidden','false');
  modalImage.src = prod.image;
  modalImage.alt = prod.name;
  modalTitle.textContent = prod.name;
  modalDesc.textContent = prod.desc;

  // build specs table
  modalSpecs.innerHTML = '';
  for (const key in prod.specs) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td style="width:40%;font-weight:600">${escapeHtml(key)}</td><td>${escapeHtml(prod.specs[key])}</td>`;
    modalSpecs.appendChild(tr);
  }

  // Enquire button: open mailto with product info
  enquireBtn.href = `mailto:info@acmecycle.com?subject=${encodeURIComponent('Enquiry: '+prod.name+' ('+prod.id+')')}&body=${encodeURIComponent('I am interested in '+prod.name+' (SKU: '+prod.id+').\n\nPlease provide pricing and MOQ details.\n\nRegards,\n')}`;

  // download/spec PDF (if provided)
  if (prod.specPdf) {
    downloadBtn.href = prod.specPdf;
    downloadBtn.style.display = 'inline-block';
  } else {
    downloadBtn.style.display = 'none';
  }

  document.body.style.overflow = 'hidden'; // lock scroll
}

// close modal
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  modal.setAttribute('aria-hidden','true');
  modalImage.src = ''; modalImage.alt = '';
  document.body.style.overflow = '';
}

// ---------- Contact form ----------
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.textContent = "Thanks — your message is ready in your email client.";
  const data = new FormData(form);
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  window.location.href = `mailto:info@acmecycle.com?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`;
});

// year
document.getElementById('year').textContent = new Date().getFullYear();

// small helper
function escapeHtml(s){ 
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}

