const intro = document.getElementById("intro");
const sceneItems = document.querySelectorAll("#scenes .list-item");
const scenePanels = document.querySelectorAll(".scene-panel");
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");

function detenerEmbeds() {
  document.querySelectorAll("iframe[data-src]").forEach((frame) => {
    frame.src = "";
  });
}

function mostrarEscena(id) {
  detenerEmbeds();
  intro.classList.add("hidden");
  scenePanels.forEach((panel) => {
    const visible = panel.dataset.panel === id;
    panel.classList.toggle("hidden", !visible);
    if (!visible) return;
    panel.querySelectorAll("iframe[data-src]").forEach((frame) => {
      frame.src = frame.dataset.src;
    });
  });
}

sceneItems.forEach((item) => {
  item.addEventListener("click", () => {
    sceneItems.forEach((escena) => escena.classList.remove("active"));
    item.classList.add("active");
    mostrarEscena(item.dataset.scene);
  });
});

chatInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const texto = chatInput.value.trim();
  if (!texto) return;

  const linea = document.createElement("p");
  linea.className = "chat-line";
  linea.innerHTML = "<b>tú:</b> ";
  linea.append(document.createTextNode(texto));
  chatLog.appendChild(linea);
  chatLog.scrollTop = chatLog.scrollHeight;
  chatInput.value = "";
});
