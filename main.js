import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ══════════════════════════════════════════
   SCREENS
══════════════════════════════════════════ */
const intro     = document.getElementById("intro");
const gift      = document.getElementById("gift");
const universe  = document.getElementById("universe");
const yesBtn    = document.getElementById("yesBtn");
const noBtn     = document.getElementById("noBtn");
const openGift  = document.getElementById("openGift");
const likesNav  = document.getElementById("likesNav");
const photoGrid = document.getElementById("photoGrid");

/* ══════════════════════════════════════════
   PLANET DATA — texturas locales HD
══════════════════════════════════════════ */
const planetData = [
  {
    name: "Mercurio", emoji: "☿", color: "#c8a882",
    radius: 0.50, distance: 5.8,  speed: 0.024, tilt: 0.03,
    texture: "./textures/mercury.jpg", emissive: "#251a0e",
    fact: "¿Sabías que Mercurio completa una vuelta al Sol en solo 88 días? Así de rápido latió mi corazón la primera vez que te vi, Milvia.",
    phrase: "Así como Mercurio se mueve sin parar, tú llevas energía y vida a todo lo que tocas, Milvia.",
    sub: "Rápida, brillante e inigualable. 🌟"
  },
  {
    name: "Venus", emoji: "♀", color: "#f0d090",
    radius: 0.86, distance: 8.2,  speed: 0.018, tilt: 0.05,
    texture: "./textures/venus.jpg", emissive: "#3a2000",
    fact: "¿Sabías que Venus es el planeta más brillante del cielo nocturno? Igual que tú, que iluminas cualquier lugar al que entras, mi niña.",
    phrase: "Como Venus, tú eres lo primero que brilla y lo último en apagarse. Eres la más hermosa de mi universo.",
    sub: "Venus eres tú, mi niña preciosa. ✨"
  },
  {
    name: "Tierra", emoji: "🌍", color: "#4a88f5",
    radius: 0.92, distance: 11.0, speed: 0.014, tilt: 0.41,
    texture: "./textures/earth.jpg", emissive: "#001025",
    fact: "¿Sabías que la Tierra es el único planeta con vida en todo el universo conocido? Así de única y especial eres tú para mí, Milvia.",
    phrase: "Igual que la Tierra es única en el universo, tú eres única en mi vida. Contigo siento que estoy en casa, Milvia.",
    sub: "Mi hogar no es un lugar, eres tú. 💙"
  },
  {
    name: "Marte", emoji: "♂", color: "#d9593a",
    radius: 0.63, distance: 13.8, speed: 0.011, tilt: 0.44,
    texture: "./textures/mars.jpg", emissive: "#2e0a00",
    fact: "¿Sabías que Marte tiene el volcán más alto del sistema solar? Así de imparable e incontenible es la fuerza que tú llevas dentro, Milvia.",
    phrase: "Como ese volcán imparable, así es tu fuerza, Milvia. Tu valentía me enamora más cada día que pasa.",
    sub: "Eres guerrera, mi vida. 🔥"
  },
  {
    name: "Júpiter", emoji: "♃", color: "#d8b07a",
    radius: 1.72, distance: 17.8, speed: 0.0085, tilt: 0.05,
    texture: "./textures/jupiter.jpg", emissive: "#201000",
    fact: "¿Sabías que dentro de Júpiter cabrían 1,300 planetas Tierra? Pues así de grande, y aún más, es el amor que siento por ti, Milvia.",
    phrase: "Así de grande es el amor que te tengo, Milvia. Tu corazón enorme y lleno de amor me hace el hombre más afortunado.",
    sub: "Gigante y poderosa, como tu amor. 🪐"
  },
  {
    name: "Saturno", emoji: "♄", color: "#e8d090",
    radius: 1.45, distance: 22.0, speed: 0.0065, tilt: 0.47,
    texture: "./textures/saturn.jpg", emissive: "#1e1400",
    rings: true,
    fact: "¿Sabías que los anillos de Saturno son únicos en todo el sistema solar? Igual que tú, que tienes algo que nadie más tiene en este mundo, mi Milvia.",
    phrase: "Como Saturno, tú tienes algo que nadie más tiene. Hasta cuando me dices malcriadooo me derrites, Milvia.",
    sub: "Única, con anillos y todo. 😄💛"
  },
  {
    name: "Urano", emoji: "⛢", color: "#7dd8d8",
    radius: 1.10, distance: 26.5, speed: 0.0048, tilt: 1.71,
    texture: "./textures/uranus.jpg", emissive: "#002828",
    fact: "¿Sabías que Urano gira completamente de lado? Así también tú ves la vida diferente a todos, y esa manera tuya de ser es lo que más me enamora.",
    phrase: "Tú también ves el mundo diferente a todos, y eso me fascina. Tu manera de cuidarme es algo que no encuentro en ningún lugar.",
    sub: "Diferente, especial e irrepetible. 🩵"
  },
  {
    name: "Neptuno", emoji: "♆", color: "#4a6aff",
    radius: 1.06, distance: 30.5, speed: 0.0038, tilt: 0.49,
    texture: "./textures/neptune.jpg", emissive: "#00003a",
    fact: "¿Sabías que Neptuno tiene vientos de hasta 2,100 km/h, los más fuertes del sistema solar? Y aun así, cuando estoy contigo todo se calma. Eres mi paz, Milvia.",
    phrase: "Aunque el universo entero se mueva con fuerza, en tus ojos yo siempre encuentro calma, paz y nuestro futuro, Milvia.",
    sub: "Eres mi norte, mi profundidad y mi calma. 💙"
  }
];

/* ══════════════════════════════════════════
   PHOTO SECTION
══════════════════════════════════════════ */
const photoContent = [
  { src: "./photos/1-image-1772974188959.png",           title: "Tu fuerza",       text: "Me encanta cómo peleas por lo que quieres y nunca te rindes. Esa determinación me enamora." },
  { src: "./photos/2-image-1772974244006.png",           title: "Cómo me cuidas",  text: "Tu manera de cuidarme es uno de los regalos más bonitos que tengo en mi vida." },
  { src: "./photos/3-image-1772974292039.png",           title: "Tu ternura",      text: "Tu dulzura hace que todo en mi día se sienta más bonito y liviano." },
  { src: "./photos/4-image-1772974346919.png",           title: "Tu mirada",       text: "Tus ojos tienen un brillo que me deja sin palabras cada vez que te miro." },
  { src: "./photos/5-image-1772974360453.png",           title: "Tu alegría",      text: "Tu risa es mi sonido favorito en este universo entero." },
  { src: "./photos/6-image-1772974434583.png",           title: "Tu estilo",       text: "Eres hermosa de una forma tan única y auténtica que no puedo evitar admirarte." },
  { src: "./photos/7-image-resized-1772974461695.webp",  title: "Tu corazón",      text: "Siempre piensas en los demás. Eso te hace una persona gigante y especial." },
  { src: "./photos/8-image-1772974478202.png",           title: "Malcriadooo",     text: "Cuando me dices malcriadooo me derrites por completo. No lo cambio por nada. 😄" },
  { src: "./photos/9-image-resized-1772974529470.webp",  title: "Tu magia",        text: "Tienes una vibra que convierte cualquier momento ordinario en algo especial." },
  { src: "./photos/10-image-1772974698683.png",          title: "Tú, completa",    text: "Eres mi niña hermosa, mi orgullo, mi tranquilidad y mi universo entero." }
];

photoContent.forEach((item) => {
  const card = document.createElement("article");
  card.className = "photo-card";
  card.innerHTML = `
    <img src="${item.src}" alt="${item.title}" loading="lazy" />
    <div class="caption"><h4>${item.title}</h4><p>${item.text}</p></div>`;
  photoGrid.appendChild(card);
});

/* ══════════════════════════════════════════
   INTRO BUTTONS
══════════════════════════════════════════ */
function enterUniverse() {
  intro.classList.add("hidden");
  gift.classList.add("hidden");
  universe.classList.remove("hidden");
  if (!window._solarInit) { createSolarSystem(); window._solarInit = true; }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

yesBtn.addEventListener("click", enterUniverse);

function moveNoBtn() {
  const container = noBtn.closest(".actions");
  const box = container.getBoundingClientRect();
  const maxX = Math.max(0, box.width - noBtn.offsetWidth);
  const maxY = Math.max(0, box.height - noBtn.offsetHeight);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
}

["mouseenter", "pointerdown", "touchstart", "focus", "click"].forEach((ev) => {
  noBtn.addEventListener(ev, (e) => {
    e.preventDefault();
    moveNoBtn();
  });
});

openGift.addEventListener("click", enterUniverse);

likesNav.addEventListener("click", () => {
  document.getElementById("likes").scrollIntoView({ behavior: "smooth" });
});

/* ══════════════════════════════════════════
   PLANET OVERLAY
══════════════════════════════════════════ */
const overlay = document.createElement("div");
overlay.id = "planetOverlay";
overlay.innerHTML = `
  <div id="overlayBg"></div>
  <button id="overlayClose" title="Cerrar">✕</button>
  <div id="overlayContent">
    <div id="overlayEmoji"></div>
    <h3 id="overlayName"></h3>
    <div id="overlayFact"></div>
    <p  id="overlayPhrase"></p>
    <p  id="overlaySub"></p>
  </div>`;
document.body.appendChild(overlay);

document.getElementById("overlayClose").addEventListener("click", hideOverlay);
overlay.addEventListener("click", (e) => { if (e.target === overlay) hideOverlay(); });

function showOverlay(pd) {
  document.getElementById("overlayBg").style.background =
    `radial-gradient(ellipse at 55% 40%, ${pd.color}66 0%, transparent 68%)`;
  document.getElementById("overlayEmoji").textContent  = pd.emoji;
  document.getElementById("overlayName").textContent   = pd.name;
  document.getElementById("overlayPhrase").textContent = pd.phrase;
  document.getElementById("overlaySub").textContent    = pd.sub;

  const factEl = document.getElementById("overlayFact");
  factEl.innerHTML = `<span class="fact-icon">🔭</span> ${pd.fact}`;

  overlay.classList.add("active");
}
function hideOverlay() { overlay.classList.remove("active"); }

/* ══════════════════════════════════════════
   SUN OVERLAY — carta especial para Milvia
══════════════════════════════════════════ */
const sunOverlay = document.createElement("div");
sunOverlay.id = "sunOverlay";
sunOverlay.innerHTML = `
  <div id="sunOverlayBg"></div>
  <button id="sunOverlayClose" title="Cerrar">✕</button>
  <div id="sunOverlayContent">
    <div id="sunOverlayIcon">☀️</div>
    <h3 id="sunOverlayTitle">Tú eres mi centro</h3>
    <div id="sunOverlayLetter">
      <p>Milvia,</p>
      <p>
        Así como el Sol es el centro de este sistema solar y todos los planetas
        giran a su alrededor sin poder alejarse… tú eres el centro de mi mundo.
        Todo en mi vida orbita alrededor de ti: mis mañanas, mis noches,
        mis planes, mis sueños.
      </p>
      <p>
        Sin el Sol no habría luz, no habría vida. Y sin ti, mi vida simplemente
        no tendría el mismo color. Me das calor cuando tengo frío, me das luz
        cuando todo está oscuro, y me das fuerza solo con saber que estás ahí.
      </p>
      <p>
        Eres mi centro, mi calor y mi razón favorita para sonreír cada día.
        Feliz día de la mujer, mi niña hermosa. 🌻
      </p>
      <p class="sun-sign">Con todo mi amor, siempre. 💛</p>
    </div>
  </div>`;
document.body.appendChild(sunOverlay);

document.getElementById("sunOverlayClose").addEventListener("click", () => sunOverlay.classList.remove("active"));
sunOverlay.addEventListener("click", (e) => { if (e.target === sunOverlay) sunOverlay.classList.remove("active"); });

function showSunOverlay() { sunOverlay.classList.add("active"); }

/* ══════════════════════════════════════════
   CANVAS GLOW TEXTURE (circular, sin cuadros)
══════════════════════════════════════════ */
function makeGlowTexture(size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const center = size / 2;
  const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
  grad.addColorStop(0,    "rgba(255,255,255,0.85)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.4)");
  grad.addColorStop(0.6,  "rgba(255,255,255,0.1)");
  grad.addColorStop(1,    "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const GLOW_TEX = makeGlowTexture(256);

/* ══════════════════════════════════════════
   SUN TEXTURE (canvas procedural)
══════════════════════════════════════════ */
function makeSunTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const c = size / 2;
  // Base orange
  const g = ctx.createRadialGradient(c, c, 0, c, c, c);
  g.addColorStop(0,   "#fff7a0");
  g.addColorStop(0.3, "#ffcc33");
  g.addColorStop(0.7, "#ff8800");
  g.addColorStop(1,   "#cc4400");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  // Sunspots
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 14; i++) {
    const r = 4 + Math.random() * 14;
    const x = c * 0.4 + Math.random() * c * 1.2;
    const y = c * 0.4 + Math.random() * c * 1.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#882200";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

/* ══════════════════════════════════════════
   3D SOLAR SYSTEM
══════════════════════════════════════════ */
function createSolarSystem() {
  const container = document.getElementById("scene");

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  renderer.setClearColor(0x00000a, 1);

  /* Camera */
  const camera = new THREE.PerspectiveCamera(
    55, container.clientWidth / container.clientHeight, 0.1, 600
  );
  camera.position.set(0, 20, 46);

  /* OrbitControls: rueda = zoom, arrastrar = rotar, shift+arrastrar = pan */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping   = true;
  controls.dampingFactor   = 0.06;
  controls.minDistance     = 5;
  controls.maxDistance     = 100;
  controls.maxPolarAngle   = Math.PI * 0.80;
  controls.autoRotate      = true;
  controls.autoRotateSpeed = 0.3;
  controls.zoomSpeed       = 1.2;
  controls.target.set(0, 0, 0);

  /* ── Lights ── */
  // Soft fill from all sides
  scene.add(new THREE.AmbientLight(0x8899cc, 0.45));

  // Main sun light
  const sunLight = new THREE.PointLight(0xffd27a, 5, 260);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // Cool back-fill
  const rimLight = new THREE.DirectionalLight(0x3355bb, 0.35);
  rimLight.position.set(-50, 30, -50);
  scene.add(rimLight);

  /* ── Starfield (multi-layer) ── */
  function makeStars(n, spread, sz, col, alpha = 1) {
    const pos = [];
    for (let i = 0; i < n; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r  = 70 + Math.random() * spread;
      pos.push(
        r * Math.sin(ph) * Math.cos(th),
        r * Math.sin(ph) * Math.sin(th),
        r * Math.cos(ph)
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({
      color: col, size: sz, sizeAttenuation: true,
      transparent: true, opacity: alpha, depthWrite: false
    }));
  }

  const stars = [
    makeStars(3500, 120, 0.30, 0xffffff,  0.95),
    makeStars(1200, 160, 0.20, 0xaaccff,  0.80),
    makeStars(700,  90,  0.40, 0xffddaa,  0.70),
    makeStars(400,  70,  0.55, 0xffaadd,  0.50),
  ];
  stars.forEach(s => scene.add(s));

  /* ── Nebula (colored fog clouds behind stars) ── */
  function addNebula(col, x, y, z, sz, op) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      color: col, transparent: true, opacity: op, depthWrite: false,
      map: GLOW_TEX, blending: THREE.AdditiveBlending
    }));
    sp.scale.set(sz, sz, 1);
    sp.position.set(x, y, z);
    scene.add(sp);
  }
  addNebula(0xff2288, -90, 30, -120, 200, 0.06);
  addNebula(0x2244ff,  80, -20, -130, 180, 0.05);
  addNebula(0x8800ff,   0, 60, -140, 220, 0.04);
  addNebula(0x00aaff, -40, -50, -100, 150, 0.04);

  /* ── Sun ── */
  const loader = new THREE.TextureLoader();
  let sunTex;
  loader.load("./textures/sun.jpg",
    (t) => { t.colorSpace = THREE.SRGBColorSpace; sunTex = t; sunMesh.material.map = t; sunMesh.material.needsUpdate = true; },
    undefined,
    () => { sunMesh.material.map = makeSunTexture(); sunMesh.material.needsUpdate = true; }
  );

  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(2.9, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0xffcc44, map: makeSunTexture() })
  );
  scene.add(sunMesh);

  // Sun glow layers (circular, con GLOW_TEX)
  function addSunGlow(scale, opacity, color) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: GLOW_TEX, color, transparent: true, opacity,
      depthWrite: false, blending: THREE.AdditiveBlending
    }));
    sp.scale.set(scale, scale, 1);
    sunMesh.add(sp);
  }
  addSunGlow(20, 0.12, 0xffdd44);
  addSunGlow(13, 0.20, 0xffaa22);
  addSunGlow(8,  0.28, 0xffee88);

  /* ── Build planets ── */
  const planetMeshes = [];

  planetData.forEach((pd, idx) => {

    // Orbit ring
    const ringGeo = new THREE.RingGeometry(pd.distance - 0.04, pd.distance + 0.04, 150);
    scene.add(new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.08,
      side: THREE.DoubleSide, depthWrite: false
    })));

    // Planet
    const mat = new THREE.MeshStandardMaterial({
      color: pd.color,
      emissive: new THREE.Color(pd.emissive || "#000000"),
      emissiveIntensity: 0.18,
      roughness: 0.62,
      metalness: 0.05
    });

    loader.load(pd.texture,
      (tex) => { tex.colorSpace = THREE.SRGBColorSpace; mat.map = tex; mat.needsUpdate = true; }
    );

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(pd.radius, 56, 56), mat);
    mesh.rotation.z = pd.tilt || 0;

    // Atmospheric glow sprite (circular)
    const atmosGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: GLOW_TEX,
      color: new THREE.Color(pd.color),
      transparent: true, opacity: 0.22,
      depthWrite: false, blending: THREE.AdditiveBlending
    }));
    const gs = pd.radius * 3.6;
    atmosGlow.scale.set(gs, gs, 1);
    mesh.add(atmosGlow);

    // Pivot for orbit
    const pivot = new THREE.Object3D();
    pivot.rotation.y = (Math.PI * 2 / planetData.length) * idx;
    mesh.position.x  = pd.distance;
    pivot.add(mesh);
    scene.add(pivot);

    // Saturn rings (with texture)
    if (pd.rings) {
      const rGeo = new THREE.RingGeometry(pd.radius * 1.55, pd.radius * 2.25, 90);
      // Remap UVs so texture doesn't look weird
      const uvAttr = rGeo.attributes.uv;
      const posAttr = rGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
        const len = v.length();
        const norm = (len - pd.radius * 1.55) / ((pd.radius * 2.25) - (pd.radius * 1.55));
        uvAttr.setXY(i, norm, 0.5);
      }
      uvAttr.needsUpdate = true;

      const rMat = new THREE.MeshStandardMaterial({
        color: 0xd4b896, side: THREE.DoubleSide,
        transparent: true, opacity: 0.70, roughness: 1, metalness: 0
      });
      loader.load("./textures/saturn_ring.png",
        (t) => { t.colorSpace = THREE.SRGBColorSpace; rMat.map = t; rMat.alphaMap = t; rMat.needsUpdate = true; }
      );
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.x = Math.PI / 2.6;
      mesh.add(rMesh);
    }

    mesh.userData = { pd, pivot, baseRadius: pd.radius, speed: pd.speed };
    planetMeshes.push(mesh);
  });

  /* ── Raycaster ── */
  const raycaster = new THREE.Raycaster();
  const ptr = new THREE.Vector2(-99, -99);
  let hovered  = null;
  let dragDist = 0;

  // Marca el sol como clickeable también
  sunMesh.userData.isSun = true;
  const allClickable = [...planetMeshes, sunMesh];

  function toNDC(cx, cy) {
    const rect = renderer.domElement.getBoundingClientRect();
    ptr.x =  ((cx - rect.left) / rect.width)  * 2 - 1;
    ptr.y = -((cy - rect.top)  / rect.height) * 2 + 1;
  }

  function handleClick() {
    raycaster.setFromCamera(ptr, camera);
    const hit = raycaster.intersectObjects(allClickable);
    if (!hit.length) return;
    const obj = hit[0].object;
    if (obj.userData.isSun) {
      showSunOverlay();
    } else {
      showOverlay(obj.userData.pd);
    }
  }

  renderer.domElement.addEventListener("pointermove", (e) => {
    toNDC(e.clientX, e.clientY);
    dragDist += Math.hypot(e.movementX, e.movementY);
    raycaster.setFromCamera(ptr, camera);
    const hit = raycaster.intersectObjects(allClickable);
    hovered = hit.length ? hit[0].object : null;
    document.body.style.cursor = hovered ? "pointer" : "";
    controls.autoRotate = !hovered;
  });

  renderer.domElement.addEventListener("pointerdown", () => { dragDist = 0; });
  renderer.domElement.addEventListener("pointerup",   (e) => {
    if (dragDist > 8) return;
    toNDC(e.clientX, e.clientY);
    handleClick();
  });

  /* Touch tap (móvil) */
  let touchMoved = false;
  renderer.domElement.addEventListener("touchstart", () => { touchMoved = false; }, { passive: true });
  renderer.domElement.addEventListener("touchmove",  () => { touchMoved = true;  }, { passive: true });
  renderer.domElement.addEventListener("touchend", (e) => {
    if (touchMoved) return;
    const t = e.changedTouches[0];
    toNDC(t.clientX, t.clientY);
    handleClick();
  });

  /* ── Hint flotante ── */
  const hint = document.createElement("div");
  hint.className = "canvas-hint";
  hint.innerHTML = "🖱 Arrastra · 🔍 Scroll/pellizco para zoom · 🪐 Toca un planeta";
  container.appendChild(hint);
  setTimeout(() => { hint.style.opacity = "0"; }, 4500);

  /* ── Resize ── */
  window.addEventListener("resize", () => {
    if (!container.clientWidth) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  /* ── Loop ── */
  let tick = 0;
  function animate() {
    requestAnimationFrame(animate);
    tick += 0.016;

    // Pulsating sun light
    sunLight.intensity = 4.8 + Math.sin(tick * 1.6) * 0.5;
    sunMesh.rotation.y += 0.003;

    planetMeshes.forEach((mesh) => {
      const ud = mesh.userData;
      ud.pivot.rotation.y += ud.speed;
      mesh.rotation.y     += 0.006;

      const isH   = hovered === mesh;
      const tScale = isH ? 1.20 : 1.0;
      mesh.scale.lerp(new THREE.Vector3(tScale, tScale, tScale), 0.12);
      mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
        mesh.material.emissiveIntensity, isH ? 0.65 : 0.18, 0.09
      );
    });

    // Stars slow drift
    stars[0].rotation.y += 0.00025;
    stars[1].rotation.y -= 0.00018;
    stars[2].rotation.x += 0.00010;
    stars[3].rotation.z += 0.00012;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
