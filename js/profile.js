/* ------------------------- Данные проектов ------------------------- */
const projects = [
    {
        title: "Проект 1 — Dashboard",
        description:
            "Адаптивная панель управления с интерактивными графиками.",
        tags: ["React", "Recharts", "Tailwind"],
        link: "#",
    },
    {
        title: "Проект 2 — SPA",
        description:
            "Одностраничное приложение с авторизацией и маршрутизацией.",
        tags: ["React", "TypeScript", "Vite"],
        link: "#",
    },
    {
        title: "Проект 3 — Портфолио",
        description: "Минималистичное портфолио с CMS‑интеграцией.",
        tags: ["Next.js", "MDX", "Tailwind"],
        link: "#",
    },
];

/* ------------------------- Вывод проектов ------------------------- */
const grid = document.getElementById("projectsGrid");

projects.forEach((p) => {
    const el = document.createElement("div");
    el.className = "project-card";

    el.innerHTML = `
      <h3 style="font-size:18px; font-weight:bold;">${p.title}</h3>
      <p style="color:#ccc; margin:10px 0;">${p.description}</p>
      <div>${p.tags.map((t) => `<span class='tag'>${t}</span>`).join("")}</div>
      <a href="${p.link
        }" style="display:inline-block; margin-top:10px; color:orange; font-weight:bold;">Открыть →</a>
    `;

    grid.appendChild(el);
});

/* ------------------------- Скролл к контактам ------------------------- */
function scrollToContact() {
    document
        .querySelector("#contact")
        .scrollIntoView({ behavior: "smooth" });
}

/* ------------------------- Форма ------------------------- */
function sendForm(event) {
    event.preventDefault();
    alert("Сообщение отправлено! (Форма демонстрационная)");
}