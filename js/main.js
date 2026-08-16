const intro = document.getElementById("intro");
const scenes = document.getElementById("scenes");
const scenePanels = document.querySelectorAll(".scene-panel");
const chatLog = document.getElementById("chat-log");

function detenerEmbeds() {
  document.querySelectorAll("iframe[data-src]").forEach((frame) => {
    frame.src = "";
  });
}

function mostrarEscena(id) {
  detenerEmbeds();
  if (intro) intro.classList.add("hidden");
  scenePanels.forEach((panel) => {
    const visible = panel.dataset.panel === id;
    panel.classList.toggle("hidden", !visible);
    if (!visible) return;
    panel.scrollTop = 0;
    panel.querySelectorAll("iframe[data-src]").forEach((frame) => {
      frame.src = frame.dataset.src;
    });
  });
}

function anunciarEscena(nombre) {
  if (!chatLog) return;

  const linea = document.createElement("p");
  linea.className = "chat-line chat-scene";

  const nick = document.createElement("b");
  nick.textContent = "richigamo18";

  linea.append(nick, document.createTextNode(` cambió a ${nombre}`));
  chatLog.appendChild(linea);
  chatLog.scrollTop = chatLog.scrollHeight;
}

if (scenes) {
  scenes.addEventListener("click", (event) => {
    const item = event.target.closest(".list-item");
    if (!item || !scenes.contains(item)) return;
    if (item.classList.contains("active")) return;

    scenes.querySelectorAll(".list-item").forEach((escena) => {
      escena.classList.remove("active");
    });
    item.classList.add("active");

    const nombre = item.textContent.trim();
    anunciarEscena(nombre);
    mostrarEscena(item.dataset.scene);
  });
}
