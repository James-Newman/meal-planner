const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function renderMeal(label, value) {
  return `
    <div class="meal">
      <span class="label">${label}</span>
      <span class="value">${value ?? ""}</span>
    </div>
  `;
}

function renderDay(dayName, day) {
  const meals =
    day.type === "split"
      ? renderMeal("Kids", day.meals.kids) + renderMeal("Adults", day.meals.adults)
      : renderMeal("Dinner", day.meal);

  return `
    <div class="day">
      <h3>${dayName}</h3>
      ${meals}
    </div>
  `;
}

function renderWeek(week) {
  const days = DAY_ORDER.map((dayName) => renderDay(dayName, week.days[dayName])).join("");

  return `
    <section class="week">
      <h2>Week ${week.week}</h2>
      <div class="days">${days}</div>
    </section>
  `;
}

async function main() {
  const app = document.getElementById("app");

  try {
    const response = await fetch("data/menu.json");
    if (!response.ok) throw new Error(`Failed to load menu.json: ${response.status}`);
    const menu = await response.json();

    app.innerHTML = menu.weeks.map(renderWeek).join("");
  } catch (err) {
    app.innerHTML = `<p class="error">Could not load the menu. ${err.message}</p>`;
  }
}

main();
