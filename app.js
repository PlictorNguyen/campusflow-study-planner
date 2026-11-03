const STORAGE_KEY = "campusflow_tasks_v1";
const THEME_KEY = "campusflow_theme_v1";
const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;
const today = localDateString(new Date());

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

function makeStarterTasks() {
  return [
    { id: crypto.randomUUID(), title: "Map out this week's study goals", category: "Study", priority: "normal", dueDate: today, completed: false, createdAt: Date.now() - 3000 },
    { id: crypto.randomUUID(), title: "Build a small project feature", category: "Project", priority: "high", dueDate: shiftDate(1), completed: false, createdAt: Date.now() - 2000 },
    { id: crypto.randomUUID(), title: "Review notes from last session", category: "Review", priority: "low", dueDate: shiftDate(2), completed: false, createdAt: Date.now() - 1000 },
  ];
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return makeStarterTasks();
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : makeStarterTasks();
  } catch {
    return makeStarterTasks();
  }
}

let tasks = loadTasks();
let activeFilter = "all";
let searchQuery = "";
let toastTimer;
let timerMode = "focus";
let timerSeconds = FOCUS_DURATION;
let timerInterval = null;
let timerEndsAt = null;
let selectedFocusTaskId = "";
let sessionsToday = Number(readStorage(`campusflow_sessions_${today}`)) || 0;

const $ = (selector) => document.querySelector(selector);
const taskList = $("#task-list");
const form = $("#task-form");
const titleInput = $("#task-title");

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    $("#list-summary").textContent = "Your tasks are saved on this device.";
  } catch {
    $("#list-summary").textContent = "Storage is unavailable in this browser.";
  }
}

function readStorage(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function writeStorage(key, value) {
  try { localStorage.setItem(key, value); return true; } catch { return false; }
}

function formatDate(value) {
  if (!value) return "No due date";
  if (value === today) return "Today";
  if (value === shiftDate(1)) return "Tomorrow";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

function isInCurrentWeek(value) {
  if (!value) return false;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const weekday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - weekday);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  const date = new Date(`${value}T12:00:00`);
  return date >= start && date < end;
}

function filteredTasks() {
  const query = searchQuery.trim().toLowerCase();
  return tasks
    .filter((task) => {
      if (activeFilter === "today" && (task.dueDate !== today || task.completed)) return false;
      if (activeFilter === "upcoming" && (!task.dueDate || task.dueDate <= today || task.completed)) return false;
      if (activeFilter === "completed" && !task.completed) return false;
      return !query || `${task.title} ${task.category}`.toLowerCase().includes(query);
    })
    .sort((a, b) => Number(a.completed) - Number(b.completed) || (a.dueDate || "9999").localeCompare(b.dueDate || "9999") || b.createdAt - a.createdAt);
}

function taskMarkup(task) {
  const row = document.createElement("article");
  row.className = `task-row${task.completed ? " is-done" : ""}`;
  const check = document.createElement("button");
  check.className = "task-check";
  check.type = "button";
  check.textContent = "✓";
  check.setAttribute("aria-label", `${task.completed ? "Mark incomplete" : "Complete"}: ${task.title}`);
  check.setAttribute("aria-pressed", String(task.completed));
  check.addEventListener("click", () => toggleTask(task.id));

  const main = document.createElement("div");
  main.className = "task-main";
  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.title;
  title.title = task.title;
  const meta = document.createElement("div");
  meta.className = "task-meta";
  const category = document.createElement("span");
  category.className = "category-label";
  category.dataset.category = task.category;
  category.textContent = task.category;
  const sep = document.createElement("span");
  sep.textContent = "·";
  const due = document.createElement("span");
  due.textContent = task.dueDate ? formatDate(task.dueDate) : "No deadline";
  meta.append(category, sep, due);
  main.append(title, meta);

  const side = document.createElement("div");
  side.className = "task-side";
  if (task.priority !== "normal") {
    const priority = document.createElement("span");
    priority.className = `priority-label ${task.priority}`;
    priority.textContent = task.priority === "high" ? "↑ High" : "↓ Low";
    side.append(priority);
  }
  const dueLabel = document.createElement("span");
  dueLabel.className = `due-label${task.dueDate === today && !task.completed ? " is-today" : ""}`;
  dueLabel.textContent = task.completed ? "Done" : formatDate(task.dueDate);
  side.append(dueLabel);
  const remove = document.createElement("button");
  remove.className = "delete-task";
  remove.type = "button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `Delete ${task.title}`);
  remove.addEventListener("click", () => deleteTask(task.id));
  side.append(remove);
  row.append(check, main, side);
  return row;
}

function setEmptyState(count) {
  const empty = $("#empty-state");
  empty.hidden = count > 0;
  taskList.hidden = count === 0;
  if (count) return;
  const messages = {
    all: ["A little breathing room.", "Add a task to start shaping your week."],
    today: ["Nothing due today.", "Enjoy the space or plan ahead for tomorrow."],
    upcoming: ["No upcoming tasks yet.", "Add a deadline when something lands on your list."],
    completed: ["Your wins will show up here.", "Complete a task to build your progress."],
  };
  const [heading, copy] = messages[activeFilter];
  $("#empty-title").textContent = searchQuery ? "No matching tasks." : heading;
  $("#empty-copy").textContent = searchQuery ? "Try another search or clear the search field." : copy;
  $("#empty-add").hidden = activeFilter === "completed" || Boolean(searchQuery);
}

function renderWeek() {
  const container = $("#week-days");
  container.replaceChildren();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const offset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - offset);
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  for (let index = 0; index < 7; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const dateString = localDateString(date);
    const day = document.createElement("div");
    day.className = `week-day${dateString === today ? " is-current" : ""}`;
    day.setAttribute("aria-label", new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(date));
    const label = document.createElement("span");
    label.textContent = labels[index];
    const number = document.createElement("span");
    number.textContent = String(date.getDate());
    const mark = document.createElement("i");
    mark.className = "day-mark";
    const dayTasks = tasks.filter((task) => task.dueDate === dateString);
    if (dayTasks.some((task) => task.completed)) mark.classList.add("has-done");
    else if (dayTasks.length) mark.classList.add("has-due");
    day.append(label, number, mark);
    container.append(day);
  }
}

function render() {
  const visible = filteredTasks();
  taskList.replaceChildren(...visible.map(taskMarkup));
  setEmptyState(visible.length);
  const open = tasks.filter((task) => !task.completed).length;
  const dueToday = tasks.filter((task) => !task.completed && task.dueDate === today).length;
  const completedThisWeek = tasks.filter((task) => task.completed && isInCurrentWeek(task.completedAtDate || task.dueDate)).length;
  const weeklyTasks = tasks.filter((task) => isInCurrentWeek(task.dueDate) || (task.completed && isInCurrentWeek(task.completedAtDate)));
  const progress = weeklyTasks.length ? Math.round((completedThisWeek / weeklyTasks.length) * 100) : 0;

  $("#open-stat").textContent = String(open);
  $("#due-stat").textContent = String(dueToday);
  $("#due-message").textContent = dueToday ? `${dueToday} task${dueToday === 1 ? "" : "s"} to focus on` : "Nothing due today";
  $("#progress-percent").textContent = String(Math.min(progress, 100));
  $("#progress-caption").textContent = `${completedThisWeek} of ${weeklyTasks.length} completed`;
  $("#progress-bar").style.width = `${Math.min(progress, 100)}%`;
  $("#all-count").textContent = String(open);
  $("#today-count").textContent = String(dueToday);
  $("#visible-count").textContent = String(visible.length);
  $("#clear-completed").hidden = !tasks.some((task) => task.completed);
  $("#week-copy").textContent = weeklyTasks.length ? `${completedThisWeek} of ${weeklyTasks.length} tasks completed this week. Keep your pace.` : "Progress is built one task at a time.";
  renderWeek();
  renderFocusTasks();
  renderTimer();
}

function renderFocusTasks() {
  const select = $("#focus-task");
  const available = tasks.filter((task) => !task.completed);
  if (!available.some((task) => task.id === selectedFocusTaskId)) selectedFocusTaskId = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = available.length ? "Choose a task (optional)" : "Add a task to get started";
  const options = available.map((task) => {
    const option = document.createElement("option");
    option.value = task.id;
    option.textContent = task.title;
    return option;
  });
  select.replaceChildren(placeholder, ...options);
  select.value = selectedFocusTaskId;
  select.disabled = available.length === 0;
}

function renderTimer() {
  const total = timerMode === "focus" ? FOCUS_DURATION : BREAK_DURATION;
  const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
  const seconds = (timerSeconds % 60).toString().padStart(2, "0");
  const running = timerInterval !== null;
  const modeName = timerMode === "focus" ? "focus" : "break";
  $("#timer-display").textContent = `${minutes}:${seconds}`;
  $("#timer-caption").textContent = running ? (timerMode === "focus" ? "Stay with this task" : "Take a breath") : (timerSeconds === total ? (timerMode === "focus" ? "Ready to focus" : "Time to recharge") : "Paused");
  $("#timer-dial").setAttribute("aria-label", `${minutes} minutes and ${seconds} seconds remaining in ${modeName} mode`);
  $("#dial-progress").style.strokeDashoffset = String(326.73 * (1 - timerSeconds / total));
  $("#timer-start").textContent = running ? "Pause session" : (timerSeconds === total ? `Start ${modeName}` : `Resume ${modeName}`);
  $("#timer-start").setAttribute("aria-label", running ? "Pause focus timer" : `${timerSeconds === total ? "Start" : "Resume"} ${modeName} timer`);
  $("#session-total").textContent = String(sessionsToday);
  $(".timer-card").classList.toggle("is-break", timerMode === "break");
  document.querySelectorAll(".timer-mode").forEach((button) => {
    const selected = button.dataset.mode === timerMode;
    button.classList.toggle("is-current", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function setTimerMode(mode) {
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerEndsAt = null;
  timerMode = mode;
  timerSeconds = mode === "focus" ? FOCUS_DURATION : BREAK_DURATION;
  renderTimer();
}

function finishTimer() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerEndsAt = null;
  if (timerMode === "focus") {
    sessionsToday += 1;
    writeStorage(`campusflow_sessions_${today}`, String(sessionsToday));
    announce("Focus session complete. Take a short break.");
    timerMode = "break";
    timerSeconds = BREAK_DURATION;
  } else {
    announce("Break complete. Ready for another focus session?");
    timerMode = "focus";
    timerSeconds = FOCUS_DURATION;
  }
  renderTimer();
}

function toggleTimer() {
  if (timerInterval !== null) {
    timerSeconds = Math.max(0, Math.ceil((timerEndsAt - Date.now()) / 1000));
    window.clearInterval(timerInterval);
    timerInterval = null;
    timerEndsAt = null;
    renderTimer();
    return;
  }
  timerEndsAt = Date.now() + timerSeconds * 1000;
  timerInterval = window.setInterval(() => {
    timerSeconds = Math.max(0, Math.ceil((timerEndsAt - Date.now()) / 1000));
    if (timerSeconds === 0) finishTimer();
    else renderTimer();
  }, 250);
  renderTimer();
}

function announce(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function toggleTask(id) {
  tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed, completedAtDate: !task.completed ? today : null } : task);
  saveTasks();
  render();
  announce("Progress saved.");
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
  announce("Task removed.");
}

function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const selected = button.dataset.filter === filter;
    if (button.classList.contains("nav-item") || button.classList.contains("filter-chip")) {
      button.classList.toggle(button.classList.contains("nav-item") ? "is-active" : "is-selected", selected);
      if (button.classList.contains("filter-chip")) button.setAttribute("aria-pressed", String(selected));
    }
  });
  render();
}

document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
$("#task-search").addEventListener("input", (event) => { searchQuery = event.target.value; render(); });
$("#focus-add").addEventListener("click", () => { titleInput.focus(); $("#new-task-panel").scrollIntoView({ behavior: "smooth", block: "center" }); });
$("#empty-add").addEventListener("click", () => titleInput.focus());
$("#focus-task").addEventListener("change", (event) => { selectedFocusTaskId = event.target.value; });
document.querySelectorAll(".timer-mode").forEach((button) => button.addEventListener("click", () => setTimerMode(button.dataset.mode)));
$("#timer-start").addEventListener("click", toggleTimer);
$("#timer-reset").addEventListener("click", () => setTimerMode(timerMode));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  if (!title) return;
  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    category: String(data.get("category")),
    priority: String(data.get("priority")),
    dueDate: String(data.get("dueDate")),
    completed: false,
    createdAt: Date.now(),
  });
  saveTasks();
  form.reset();
  setFilter("all");
  titleInput.focus();
  announce("Added to your plan.");
});

$("#clear-completed").addEventListener("click", () => {
  const completedCount = tasks.filter((task) => task.completed).length;
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
  announce(`${completedCount} completed task${completedCount === 1 ? "" : "s"} cleared.`);
});

$("#theme-toggle").addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  writeStorage(THEME_KEY, isDark ? "dark" : "light");
  $("#theme-toggle").setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
});

if (readStorage(THEME_KEY) === "dark") document.body.classList.add("dark");
const now = new Date();
$("#header-date").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(now);
$("#welcome-date").textContent = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(now).toUpperCase();
render();
