document.addEventListener("DOMContentLoaded", () => {
  // Navegación: marca el enlace de la página actual.
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  // Módulo interactivo de fundamentos.
  const processData = [
    {
      title: "Modelo BIM y cronograma",
      text: "Se dispone del modelo digital del proyecto y del plan de trabajo que define qué elementos y actividades deberían estar ejecutados en una fecha determinada.",
      output: "Una referencia para comparar el avance real."
    },
    {
      title: "Captura de la realidad",
      text: "Cámaras, recorridos 360° y escáneres registran el estado físico de la obra. La calidad de la captura condiciona el análisis posterior.",
      output: "Imágenes y datos espaciales del estado observado."
    },
    {
      title: "Ubicación y análisis visual",
      text: "La localización espacial relaciona la captura con el entorno del proyecto. La visión artificial y el aprendizaje automático ayudan a reconocer elementos y etapas visibles.",
      output: "Capturas ubicadas y elementos o actividades reconocidos."
    },
    {
      title: "Comparación con el plan",
      text: "La información detectada se contrasta con el modelo y el cronograma para estimar cantidades ejecutadas e identificar diferencias.",
      output: "Indicadores de avance y posibles desviaciones."
    },
    {
      title: "Decisión de ingeniería",
      text: "El equipo revisa los resultados, valida las alertas y decide si debe ajustar recursos, secuencias, inspecciones o medidas correctivas.",
      output: "Información para apoyar decisiones; la responsabilidad sigue siendo profesional."
    }
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
