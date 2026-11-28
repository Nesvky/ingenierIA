document.addEventListener("DOMContentLoaded", () => {
  // Navegación: marca el enlace de la página actual.
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  // Módulo interactivo de fundamentos.
  const processData = [
    { title: "Modelo BIM y cronograma", text: "Se incorpora el modelo digital y el plan de trabajo. Ambos indican qué elementos y actividades deberían estar ejecutados.", output: "Referencia digital para comparar la obra." },
    { title: "Captura de la obra", text: "Se realiza un recorrido con cámara 360°. En el caso Kaiser, Doxel reportó monitoreo diario con cámaras HD y escáneres láser.", output: "Imágenes y datos del estado físico observado." },
    { title: "Análisis de imágenes", text: "La visión artificial y el aprendizaje automático reconocen elementos visibles y sus etapas de construcción.", output: "Elementos y etapas identificados en la captura." },
    { title: "Ubicación espacial · VSLAM", text: "La tecnología VSLAM de Doxel estima la posición de la cámara y relaciona las imágenes con el espacio del modelo BIM.", output: "Capturas ubicadas dentro del proyecto." },
    { title: "Comparación del avance", text: "Las cantidades y etapas identificadas se contrastan con el BIM y el cronograma para encontrar lo instalado, lo pendiente y las desviaciones.", output: "Avance real frente al avance previsto." },
    { title: "Informes y decisiones", text: "El equipo recibe cantidades, porcentajes, productividad y alertas. Los profesionales revisan la información y deciden qué hacer.", output: "Información para apoyar decisiones de ingeniería." }
  ];
  const tabs = document.querySelectorAll(".process-tab");
  if (tabs.length) {
    const number = document.getElementById("processNumber");
    const title = document.getElementById("processTitle");
    const text = document.getElementById("processText");
    const output = document.getElementById("processOutput");
    tabs.forEach(tab => tab.addEventListener("click", () => {
      const index = Number(tab.dataset.step);
      const item = processData[index];
      tabs.forEach(t => t.classList.toggle("active", t === tab));
      number.textContent = `ETAPA 0${index + 1}`;
      title.textContent = item.title;
      text.textContent = item.text;
      output.textContent = item.output;
    }));
  }

  // Calculadora didáctica del ejemplo de tubería.
  const total = document.getElementById("totalMeters");
  const planned = document.getElementById("plannedMeters");
  const actual = document.getElementById("actualMeters");
  if (total && planned && actual) {
    const safe = (value, max) => Math.min(Math.max(Number(value) || 0, 0), max);
    const fmt = value => `${Number(value.toFixed(1))}`;
    const update = () => {
      const t = Math.max(Number(total.value) || 0, 0);
      const p = safe(planned.value, t);
      const a = safe(actual.value, t);
      const pp = t ? p / t * 100 : 0;
      const ap = t ? a / t * 100 : 0;
      const compliance = p ? a / p * 100 : 0;
      document.getElementById("actualPercent").textContent = `${fmt(ap)}%`;
      document.getElementById("plannedPercent").textContent = `${fmt(pp)}%`;
      document.getElementById("planCompliance").textContent = p ? `${fmt(compliance)}%` : "—";
      document.getElementById("plannedLabel").textContent = `${fmt(p)} m`;
      document.getElementById("actualLabel").textContent = `${fmt(a)} m`;
      document.getElementById("plannedBar").style.width = `${pp}%`;
      document.getElementById("actualBar").style.width = `${ap}%`;
      const difference = a - p;
      const sign = difference > 0 ? "+" : difference < 0 ? "−" : "";
      document.getElementById("deviationText").textContent =
        `Desviación: ${sign}${fmt(Math.abs(difference))} m ${difference < 0 ? "por debajo" : difference > 0 ? "por encima" : "respecto"} del plan.`;
    };
    [total, planned, actual].forEach(input => input.addEventListener("input", update));
    update();
  }
});
