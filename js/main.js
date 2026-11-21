document.addEventListener("DOMContentLoaded",()=>{
const data=[
["ETAPA 01","Datos: la materia prima","Se recopilan fotografías, mediciones, registros de sensores o información histórica. La calidad de los datos influye directamente en los resultados."],
["ETAPA 02","Entrenamiento: encontrar patrones","El algoritmo ajusta sus parámetros a partir de ejemplos y aprende relaciones útiles para una tarea concreta."],
["ETAPA 03","Modelo: una herramienta aprendida","El entrenamiento produce un modelo que recibe datos nuevos y genera una clasificación, estimación o predicción."],
["ETAPA 04","Predicción: apoyar una decisión","El modelo analiza un caso nuevo. En ingeniería, el resultado debe interpretarse y validarse antes de actuar."]
];
document.querySelectorAll(".step").forEach(btn=>btn.addEventListener("click",()=>{
document.querySelectorAll(".step").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
const d=data[Number(btn.dataset.n)];document.getElementById("stepNo").textContent=d[0];document.getElementById("stepTitle").textContent=d[1];document.getElementById("stepText").textContent=d[2];
}));
const counters=document.querySelectorAll("[data-count]");
if("IntersectionObserver" in window && counters.length){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.count,start=performance.now();function tick(now){let p=Math.min((now-start)/1100,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3))).toLocaleString("es-CO");if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);obs.unobserve(el)}),{threshold:.4});counters.forEach(x=>obs.observe(x))}
document.querySelectorAll(".quiz-option").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".quiz-option").forEach(x=>x.classList.remove("correct","incorrect"));let ok=btn.dataset.correct==="true";btn.classList.add(ok?"correct":"incorrect");document.getElementById("feedback").textContent=ok?"¡Correcto! La IA ayuda a priorizar, pero la decisión exige inspección, evidencia y criterio técnico.":"No es la mejor decisión. Una alerta no confirma el daño, pero tampoco debe ignorarse: hay que verificarla técnicamente."}));
});