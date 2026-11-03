const STORAGE_KEY = "campusflow_tasks_v1";
const THEME_KEY = "campusflow_theme_v1";
const LANGUAGE_KEY = "campusflow_language_v1";
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

const TEXT = {
  en: {
    workspaceLabel: "Workspace", allTasks: "All tasks", today: "Today", upcoming: "Upcoming", completed: "Completed",
    smallSteps: "Small steps add up.", focusCopy: "Keep your next goal clear and make a little progress today.", studySpace: "My study space", personalPlanner: "Personal planner", overview: "Overview",
    switchTheme: "Switch color theme", switchToVi: "Switch language to Vietnamese", switchToEn: "Switch language to English", yourStudySpace: "YOUR STUDY SPACE",
    heroLead: "Make room for", heroAccent: "what matters.", heroCopy: "A clear plan turns busy days into steady progress.", addTask: "Add a task", taskSummary: "Task summary",
    openTasks: "Open tasks", readyWhenYouAre: "Ready when you are", dueToday: "Due today", nothingDueToday: "Nothing due today", tasksToFocus: "{count} task{plural} to focus on",
    weeklyProgress: "Weekly progress", progressCaption: "{done} of {total} completed", yourPlan: "YOUR PLAN", myTasks: "My tasks", searchTasks: "Search tasks", filterTasks: "Filter tasks",
    createFirstTask: "Create your first task", clearCompleted: "Clear completed", noMatches: "No matching tasks.", trySearch: "Try another search or clear the search field.",
    emptyAllTitle: "A little breathing room.", emptyAllCopy: "Add a task to start shaping your week.", emptyTodayTitle: "Nothing due today.", emptyTodayCopy: "Enjoy the space or plan ahead for tomorrow.",
    emptyUpcomingTitle: "No upcoming tasks yet.", emptyUpcomingCopy: "Add a deadline when something lands on your list.", emptyCompletedTitle: "Your wins will show up here.", emptyCompletedCopy: "Complete a task to build your progress.",
    planAhead: "PLAN AHEAD", taskTitleLabel: "What needs doing?", taskTitlePlaceholder: "e.g. Review data structures", subject: "Subject", studyCategory: "Study", projectCategory: "Project", personalCategory: "Personal", reviewCategory: "Review",
    priority: "Priority", normalPriority: "Normal", highPriority: "High", lowPriority: "Low", dueDate: "Due date", addToPlan: "Add to my plan", localStorageNote: "Your tasks stay in this browser.",
    freshStart: "A FRESH START", thisWeek: "This week", weekProgress: "{done} of {total} tasks completed this week. Keep your pace.", weekEmpty: "Progress is built one task at a time.",
    focusSession: "FOCUS SESSION", pomodoroTimer: "Pomodoro timer", focusOnTask: "Focus on a task", chooseTask: "Choose a task (optional)", noTasksFocus: "Add a task to get started", timerMode: "Timer mode", focus: "Focus", break: "Break", focusDuration: "25 min", breakDuration: "5 min",
    readyFocus: "Ready to focus", timeRecharge: "Time to recharge", stayTask: "Stay with this task", takeBreath: "Take a breath", paused: "Paused", startFocus: "Start focus", startBreak: "Start break", resumeFocus: "Resume focus", resumeBreak: "Resume break", pauseSession: "Pause session", resetTimer: "Reset timer", focusSessionsToday: "focus sessions today", focusRemaining: "{time} remaining in {mode} mode", focusMode: "focus", breakMode: "break",
    sessionComplete: "Focus session complete. Take a short break.", breakComplete: "Break complete. Ready for another focus session?", progressSaved: "Progress saved.", taskRemoved: "Task removed.", addedTask: "Added to your plan.",
    tasksCleared: "{count} completed task{plural} cleared.", storageSaved: "Your tasks are saved on this device.", storageUnavailable: "Storage is unavailable in this browser.", madeForLearning: "Made for focused learning",
    samplePlan: "Map out this week's study goals", sampleProject: "Build a small project feature", sampleReview: "Review notes from last session", noDeadline: "No deadline", dueTodayShort: "Today", dueTomorrow: "Tomorrow", done: "Done", high: "↑ High", low: "↓ Low",
    mainNavigation: "Main navigation", taskViews: "Task views", chooseFocusTask: "Choose a task for this focus session", weekActivity: "This week's task activity", brandHome: "CampusFlow home", markComplete: "Complete task", markIncomplete: "Mark incomplete", deleteTaskLabel: "Delete task",
    accountSync: "Account & device sync", localOnly: "Local only", apiAddress: "API address", save: "Save", email: "Email", displayName: "Name", password: "Password (10+ characters)", signIn: "Sign in", createAccount: "Create account", signOut: "Sign out", syncNote: "Sign in to sync this browser's tasks to your account.", timetableOcr: "Timetable image reader", ocrNote: "Upload a clear timetable image. Review the extracted lines before adding them.", extractText: "Extract text", ocrPlaceholder: "Extracted timetable text will appear here.", makeTasksFromLines: "Add each line as a task", studyRoom: "Virtual focus room", roomOffline: "Offline", roomNote: "Create or join a room code, then share it with your study group.", joinRoom: "Join", createRoom: "Create room", messagePlaceholder: "Say hello to the room", send: "Send", leaveRoom: "Leave", syncDone: "Account is synced.", syncError: "Sync failed. Check API address and sign in again.", signedIn: "Signed in and synced.", accountCreated: "Account created and synced.", ocrNeedsLogin: "Sign in to use timetable OCR.", ocrFailed: "OCR failed. Check that the API is running and the image is clear.", roomNeedsLogin: "Sign in to join a study room.", roomConnected: "Connected", roomConnecting: "Connecting…", roomDisconnected: "Disconnected",
    documentTitle: "CampusFlow — Study planner", metaDescription: "CampusFlow is a lightweight study planner for organizing assignments, deadlines, and study sessions.", yourProgress: "YOUR PROGRESS", levelAndStreak: "Level & streak", level: "Level", dayStreak: "day streak", studyAnalytics: "STUDY ANALYTICS", yearActivity: "Activity this year", exportData: "Export data", importData: "Import", less: "Less", more: "More", estimateMinutes: "Estimate (minutes)", subtasks: "Subtasks (one per line)", subtasksPlaceholder: "Read chapter\nSolve exercises", enableReminders: "Enable due-date reminders", suggestSubtasks: "Suggest a breakdown", xpNext: "{remaining} XP to next level", categoryStudy: "Study", categoryProject: "Project", categoryPersonal: "Personal", categoryReview: "Review", noStudyTime: "Complete focus sessions to see time by category.", importSuccess: "Data imported.", importFailed: "Could not read that backup.", reminderEnabled: "Due-date reminders enabled.", reminderDenied: "Notifications are blocked by your browser.", subtaskProgress: "{done}/{total} subtasks"
  },
  vi: {
    workspaceLabel: "Không gian làm việc", allTasks: "Tất cả việc", today: "Hôm nay", upcoming: "Sắp tới", completed: "Đã hoàn thành",
    smallSteps: "Từng bước nhỏ tạo nên kết quả.", focusCopy: "Giữ mục tiêu tiếp theo rõ ràng và tiến thêm một chút hôm nay.", studySpace: "Góc học tập của tôi", personalPlanner: "Kế hoạch cá nhân", overview: "Tổng quan",
    switchTheme: "Đổi giao diện sáng/tối", switchToVi: "Chuyển ngôn ngữ sang tiếng Việt", switchToEn: "Chuyển ngôn ngữ sang tiếng Anh", yourStudySpace: "GÓC HỌC TẬP CỦA BẠN",
    heroLead: "Dành thời gian cho", heroAccent: "điều quan trọng.", heroCopy: "Kế hoạch rõ ràng giúp mỗi ngày bận rộn tiến gần hơn đến mục tiêu.", addTask: "Thêm công việc", taskSummary: "Tóm tắt công việc",
    openTasks: "Việc chưa xong", readyWhenYouAre: "Sẵn sàng bắt đầu", dueToday: "Đến hạn hôm nay", nothingDueToday: "Hôm nay không có việc đến hạn", tasksToFocus: "{count} việc cần tập trung",
    weeklyProgress: "Tiến độ tuần", progressCaption: "Hoàn thành {done}/{total} việc", yourPlan: "KẾ HOẠCH CỦA BẠN", myTasks: "Việc của tôi", searchTasks: "Tìm công việc", filterTasks: "Lọc công việc",
    createFirstTask: "Tạo công việc đầu tiên", clearCompleted: "Xóa việc đã xong", noMatches: "Không tìm thấy công việc phù hợp.", trySearch: "Thử từ khóa khác hoặc xóa nội dung tìm kiếm.",
    emptyAllTitle: "Bạn đang có chút thời gian trống.", emptyAllCopy: "Thêm một việc để bắt đầu lên kế hoạch cho tuần.", emptyTodayTitle: "Hôm nay không có việc đến hạn.", emptyTodayCopy: "Bạn có thể nghỉ ngơi hoặc lên kế hoạch cho ngày mai.",
    emptyUpcomingTitle: "Chưa có việc sắp tới.", emptyUpcomingCopy: "Thêm hạn hoàn thành khi bạn có công việc mới.", emptyCompletedTitle: "Những việc đã xong sẽ hiện ở đây.", emptyCompletedCopy: "Hoàn thành một việc để theo dõi tiến độ.",
    planAhead: "LÊN KẾ HOẠCH", taskTitleLabel: "Bạn cần làm gì?", taskTitlePlaceholder: "Ví dụ: Ôn cấu trúc dữ liệu", subject: "Nhóm việc", studyCategory: "Học tập", projectCategory: "Dự án", personalCategory: "Cá nhân", reviewCategory: "Ôn tập",
    priority: "Mức ưu tiên", normalPriority: "Bình thường", highPriority: "Cao", lowPriority: "Thấp", dueDate: "Hạn hoàn thành", addToPlan: "Thêm vào kế hoạch", localStorageNote: "Công việc được lưu trong trình duyệt này.",
    freshStart: "BẮT ĐẦU MỚI", thisWeek: "Tuần này", weekProgress: "Tuần này đã hoàn thành {done}/{total} việc. Hãy tiếp tục nhé.", weekEmpty: "Tiến độ được tạo nên từ từng việc nhỏ.",
    focusSession: "PHIÊN TẬP TRUNG", pomodoroTimer: "Đồng hồ Pomodoro", focusOnTask: "Tập trung vào công việc", chooseTask: "Chọn công việc (không bắt buộc)", noTasksFocus: "Thêm công việc để bắt đầu", timerMode: "Chế độ hẹn giờ", focus: "Tập trung", break: "Nghỉ", focusDuration: "25 phút", breakDuration: "5 phút",
    readyFocus: "Sẵn sàng tập trung", timeRecharge: "Đến giờ nghỉ ngơi", stayTask: "Tiếp tục tập trung nhé", takeBreath: "Thư giãn một chút", paused: "Đã tạm dừng", startFocus: "Bắt đầu tập trung", startBreak: "Bắt đầu nghỉ", resumeFocus: "Tiếp tục tập trung", resumeBreak: "Tiếp tục nghỉ", pauseSession: "Tạm dừng", resetTimer: "Đặt lại đồng hồ", focusSessionsToday: "phiên tập trung hôm nay", focusRemaining: "Còn {time} ở chế độ {mode}", focusMode: "tập trung", breakMode: "nghỉ",
    sessionComplete: "Hoàn thành phiên tập trung. Hãy nghỉ một chút nhé.", breakComplete: "Hết giờ nghỉ. Sẵn sàng tập trung tiếp chưa?", progressSaved: "Đã lưu tiến độ.", taskRemoved: "Đã xóa công việc.", addedTask: "Đã thêm vào kế hoạch.",
    tasksCleared: "Đã xóa {count} việc hoàn thành.", storageSaved: "Công việc được lưu trên thiết bị này.", storageUnavailable: "Trình duyệt này không thể lưu dữ liệu.", madeForLearning: "Tạo nên cho việc học tập tập trung",
    samplePlan: "Lên kế hoạch học tập tuần này", sampleProject: "Hoàn thiện một tính năng nhỏ", sampleReview: "Ôn lại ghi chú buổi trước", noDeadline: "Chưa có hạn", dueTodayShort: "Hôm nay", dueTomorrow: "Ngày mai", done: "Xong", high: "↑ Cao", low: "↓ Thấp",
    mainNavigation: "Thanh điều hướng chính", taskViews: "Lọc công việc", chooseFocusTask: "Chọn công việc cho phiên tập trung", weekActivity: "Hoạt động công việc trong tuần", brandHome: "Trang chủ CampusFlow", markComplete: "Hoàn thành công việc", markIncomplete: "Đánh dấu chưa hoàn thành", deleteTaskLabel: "Xóa công việc",
    accountSync: "Tài khoản & đồng bộ thiết bị", localOnly: "Chỉ lưu cục bộ", apiAddress: "Địa chỉ API", save: "Lưu", email: "Email", displayName: "Tên hiển thị", password: "Mật khẩu (ít nhất 10 ký tự)", signIn: "Đăng nhập", createAccount: "Tạo tài khoản", signOut: "Đăng xuất", syncNote: "Đăng nhập để đồng bộ việc từ trình duyệt này lên tài khoản.", timetableOcr: "Đọc ảnh thời khóa biểu", ocrNote: "Tải ảnh rõ nét và xem lại nội dung trích xuất trước khi thêm.", extractText: "Trích xuất chữ", ocrPlaceholder: "Nội dung thời khóa biểu sẽ hiện ở đây.", makeTasksFromLines: "Thêm mỗi dòng thành một việc", studyRoom: "Phòng tập trung trực tuyến", roomOffline: "Ngoại tuyến", roomNote: "Tạo hoặc nhập mã phòng rồi chia sẻ với nhóm học.", joinRoom: "Tham gia", createRoom: "Tạo phòng", messagePlaceholder: "Gửi lời chào vào phòng", send: "Gửi", leaveRoom: "Rời phòng", syncDone: "Tài khoản đã đồng bộ.", syncError: "Đồng bộ thất bại. Kiểm tra API và đăng nhập lại.", signedIn: "Đã đăng nhập và đồng bộ.", accountCreated: "Đã tạo tài khoản và đồng bộ.", ocrNeedsLogin: "Đăng nhập để dùng OCR thời khóa biểu.", ocrFailed: "OCR thất bại. Kiểm tra API và độ rõ của ảnh.", roomNeedsLogin: "Đăng nhập để vào phòng học.", roomConnected: "Đã kết nối", roomConnecting: "Đang kết nối…", roomDisconnected: "Đã ngắt kết nối",
    documentTitle: "CampusFlow — Kế hoạch học tập", metaDescription: "CampusFlow giúp lập kế hoạch học tập, quản lý hạn hoàn thành và theo dõi phiên tập trung.", yourProgress: "TIẾN ĐỘ CỦA BẠN", levelAndStreak: "Cấp độ & chuỗi ngày", level: "Cấp độ", dayStreak: "ngày liên tiếp", studyAnalytics: "PHÂN TÍCH HỌC TẬP", yearActivity: "Hoạt động năm nay", exportData: "Xuất dữ liệu", importData: "Nhập", less: "Ít", more: "Nhiều", estimateMinutes: "Thời lượng dự kiến (phút)", subtasks: "Việc nhỏ (mỗi dòng một việc)", subtasksPlaceholder: "Đọc chương sách\nLàm bài tập", enableReminders: "Bật nhắc hạn công việc", suggestSubtasks: "Gợi ý chia nhỏ", xpNext: "Còn {remaining} XP để lên cấp", categoryStudy: "Học tập", categoryProject: "Dự án", categoryPersonal: "Cá nhân", categoryReview: "Ôn tập", noStudyTime: "Hoàn thành phiên tập trung để xem thời gian theo nhóm việc.", importSuccess: "Đã nhập dữ liệu.", importFailed: "Không đọc được tệp sao lưu.", reminderEnabled: "Đã bật thông báo hạn việc.", reminderDenied: "Trình duyệt đang chặn thông báo.", subtaskProgress: "{done}/{total} việc nhỏ"
  }
};

let currentLanguage = readStorage(LANGUAGE_KEY) === "vi" ? "vi" : "en";

function t(key, values = {}) {
  let message = TEXT[currentLanguage][key] ?? TEXT.en[key] ?? key;
  for (const [name, value] of Object.entries(values)) message = message.replaceAll(`{${name}}`, String(value));
  return message;
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
const SESSION_LOG_KEY = "campusflow_focus_log_v1";
let focusLog = (() => { try { const value = JSON.parse(readStorage(SESSION_LOG_KEY) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } })();
let deletedTaskIds = (() => { try { const value = JSON.parse(readStorage("campusflow_deleted_tasks_v1") || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } })();
let apiBase = readStorage("campusflow_api_url_v1") || window.CAMPUSFLOW_API_URL || "http://localhost:8080";
let accountToken = readStorage("campusflow_token_v1") || "";
let roomSocket = null;
let activeRoomCode = "";
let stompConnected = false;
let syncTimer = null;

const $ = (selector) => document.querySelector(selector);
const taskList = $("#task-list");
const form = $("#task-form");
const titleInput = $("#task-title");

function saveTasks() {
  try {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const oldById = new Map(previous.map((task) => [task.id, JSON.stringify(task)]));
    tasks = tasks.map((task) => oldById.get(task.id) === JSON.stringify(task) ? task : { ...task, updatedAt: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    $("#list-summary").textContent = t("storageSaved");
    queueSync();
  } catch {
    $("#list-summary").textContent = t("storageUnavailable");
  }
}

function readStorage(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function writeStorage(key, value) {
  try { localStorage.setItem(key, value); return true; } catch { return false; }
}

function formatDate(value) {
  if (!value) return t("noDeadline");
  if (value === today) return t("dueTodayShort");
  if (value === shiftDate(1)) return t("dueTomorrow");
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat(currentLanguage === "vi" ? "vi-VN" : "en-US", { month: "short", day: "numeric" }).format(date);
}

function displayTaskTitle(task) {
  const samples = {
    "Map out this week's study goals": "samplePlan",
    "Build a small project feature": "sampleProject",
    "Review notes from last session": "sampleReview",
    "Lên kế hoạch học tập tuần này": "samplePlan",
    "Hoàn thiện một tính năng nhỏ": "sampleProject",
    "Ôn lại ghi chú buổi trước": "sampleReview",
  };
  return samples[task.title] ? t(samples[task.title]) : task.title;
}

function displayCategory(category) {
  const categoryKeys = { Study: "studyCategory", Project: "projectCategory", Personal: "personalCategory", Review: "reviewCategory" };
  return categoryKeys[category] ? t(categoryKeys[category]) : category;
}

function dateLocale() {
  return currentLanguage === "vi" ? "vi-VN" : "en-US";
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
      return !query || `${displayTaskTitle(task)} ${displayCategory(task.category)} ${task.title} ${task.category}`.toLowerCase().includes(query);
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
  check.setAttribute("aria-label", `${t(task.completed ? "markIncomplete" : "markComplete")}: ${displayTaskTitle(task)}`);
  check.setAttribute("aria-pressed", String(task.completed));
  check.addEventListener("click", () => toggleTask(task.id));

  const main = document.createElement("div");
  main.className = "task-main";
  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = displayTaskTitle(task);
  title.title = displayTaskTitle(task);
  const meta = document.createElement("div");
  meta.className = "task-meta";
  const category = document.createElement("span");
  category.className = "category-label";
  category.dataset.category = task.category;
  category.textContent = displayCategory(task.category);
  const sep = document.createElement("span");
  sep.textContent = "·";
  const due = document.createElement("span");
  due.textContent = formatDate(task.dueDate);
  meta.append(category, sep, due);
  main.append(title, meta);
  if (task.subtasks?.length) {
    const subtaskBox = document.createElement("div"); subtaskBox.className = "subtask-list";
    const progress = document.createElement("span"); progress.className = "subtask-progress"; progress.textContent = t("subtaskProgress", { done: task.subtasks.filter((item) => item.done).length, total: task.subtasks.length }); subtaskBox.append(progress);
    task.subtasks.forEach((item, index) => { const label = document.createElement("label"); label.className = "subtask-item"; const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = item.done; checkbox.addEventListener("change", () => { task.subtasks[index].done = checkbox.checked; saveTasks(); render(); }); const text = document.createElement("span"); text.textContent = item.title; label.append(checkbox, text); subtaskBox.append(label); });
    main.append(subtaskBox);
  }

  const side = document.createElement("div");
  side.className = "task-side";
  if (task.priority !== "normal") {
    const priority = document.createElement("span");
    priority.className = `priority-label ${task.priority}`;
    priority.textContent = task.priority === "high" ? t("high") : t("low");
    side.append(priority);
  }
  const dueLabel = document.createElement("span");
  dueLabel.className = `due-label${task.dueDate === today && !task.completed ? " is-today" : ""}`;
  dueLabel.textContent = task.completed ? t("done") : formatDate(task.dueDate);
  side.append(dueLabel);
  const remove = document.createElement("button");
  remove.className = "delete-task";
  remove.type = "button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `${t("deleteTaskLabel")}: ${displayTaskTitle(task)}`);
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
    all: ["emptyAllTitle", "emptyAllCopy"],
    today: ["emptyTodayTitle", "emptyTodayCopy"],
    upcoming: ["emptyUpcomingTitle", "emptyUpcomingCopy"],
    completed: ["emptyCompletedTitle", "emptyCompletedCopy"],
  };
  const [heading, copy] = messages[activeFilter];
  $("#empty-title").textContent = searchQuery ? t("noMatches") : t(heading);
  $("#empty-copy").textContent = searchQuery ? t("trySearch") : t(copy);
  $("#empty-add").hidden = activeFilter === "completed" || Boolean(searchQuery);
}

function renderWeek() {
  const container = $("#week-days");
  container.replaceChildren();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const offset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - offset);
  const labels = currentLanguage === "vi" ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] : ["M", "T", "W", "T", "F", "S", "S"];
  for (let index = 0; index < 7; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const dateString = localDateString(date);
    const day = document.createElement("div");
    day.className = `week-day${dateString === today ? " is-current" : ""}`;
    day.setAttribute("aria-label", new Intl.DateTimeFormat(dateLocale(), { weekday: "long", month: "short", day: "numeric" }).format(date));
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
  $("#due-message").textContent = dueToday ? t("tasksToFocus", { count: dueToday, plural: dueToday === 1 ? "" : "s" }) : t("nothingDueToday");
  $("#progress-percent").textContent = String(Math.min(progress, 100));
  $("#progress-caption").textContent = t("progressCaption", { done: completedThisWeek, total: weeklyTasks.length });
  $("#progress-bar").style.width = `${Math.min(progress, 100)}%`;
  $("#all-count").textContent = String(open);
  $("#today-count").textContent = String(dueToday);
  $("#visible-count").textContent = String(visible.length);
  $("#clear-completed").hidden = !tasks.some((task) => task.completed);
  $("#week-copy").textContent = weeklyTasks.length ? t("weekProgress", { done: completedThisWeek, total: weeklyTasks.length }) : t("weekEmpty");
  renderWeek();
  renderInsights();
  renderFocusTasks();
  renderTimer();
}

function renderFocusTasks() {
  const select = $("#focus-task");
  const available = tasks.filter((task) => !task.completed);
  if (!available.some((task) => task.id === selectedFocusTaskId)) selectedFocusTaskId = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = available.length ? t("chooseTask") : t("noTasksFocus");
  const options = available.map((task) => {
    const option = document.createElement("option");
    option.value = task.id;
    option.textContent = displayTaskTitle(task);
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
  const modeName = timerMode === "focus" ? t("focusMode") : t("breakMode");
  $("#timer-display").textContent = `${minutes}:${seconds}`;
  $("#timer-caption").textContent = running ? (timerMode === "focus" ? t("stayTask") : t("takeBreath")) : (timerSeconds === total ? (timerMode === "focus" ? t("readyFocus") : t("timeRecharge")) : t("paused"));
  $("#timer-dial").setAttribute("aria-label", t("focusRemaining", { time: `${minutes}:${seconds}`, mode: modeName }));
  $("#dial-progress").style.strokeDashoffset = String(326.73 * (1 - timerSeconds / total));
  $("#timer-start").textContent = running ? t("pauseSession") : t(timerMode === "focus" ? (timerSeconds === total ? "startFocus" : "resumeFocus") : (timerSeconds === total ? "startBreak" : "resumeBreak"));
  $("#timer-start").setAttribute("aria-label", running ? t("pauseSession") : t(timerMode === "focus" ? (timerSeconds === total ? "startFocus" : "resumeFocus") : (timerSeconds === total ? "startBreak" : "resumeBreak")));
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
    const focusTask = tasks.find((task) => task.id === selectedFocusTaskId);
    focusLog.push({ id: crypto.randomUUID(), date: today, minutes: 25, category: focusTask?.category || "Study", taskId: focusTask?.id || null, completedAt: Date.now() });
    writeStorage(SESSION_LOG_KEY, JSON.stringify(focusLog));
    queueSync();
    renderInsights();
    sendTimerNotification(t("sessionComplete"));
    announce(t("sessionComplete"));
    timerMode = "break";
    timerSeconds = BREAK_DURATION;
  } else {
    sendTimerNotification(t("breakComplete"));
    announce(t("breakComplete"));
    timerMode = "focus";
    timerSeconds = FOCUS_DURATION;
  }
  renderTimer();
}

function sendTimerNotification(message) {
  if (readStorage("campusflow_reminders_v1") === "on" && "Notification" in window && Notification.permission === "granted") new Notification("CampusFlow", { body: message, icon: "./icon.svg" });
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
  tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed, completedAtDate: !task.completed ? today : null, rewarded: task.rewarded || !task.completed } : task);
  saveTasks();
  render();
  announce(t("progressSaved"));
}

function deleteTask(id) {
  if (!deletedTaskIds.includes(id)) deletedTaskIds.push(id);
  writeStorage("campusflow_deleted_tasks_v1", JSON.stringify(deletedTaskIds));
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
  announce(t("taskRemoved"));
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
  const subtasks = String(data.get("subtasks") || "").split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 12).map((title) => ({ title, done: false }));
  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    category: String(data.get("category")),
    priority: String(data.get("priority")),
    dueDate: String(data.get("dueDate")),
    estimateMinutes: Math.max(15, Number(data.get("estimate")) || 60),
    subtasks,
    completed: false,
    createdAt: Date.now(),
  });
  saveTasks();
  form.reset();
  setFilter("all");
  titleInput.focus();
  announce(t("addedTask"));
});

$("#clear-completed").addEventListener("click", () => {
  const completedCount = tasks.filter((task) => task.completed).length;
  tasks.filter((task) => task.completed).forEach((task) => { if (!deletedTaskIds.includes(task.id)) deletedTaskIds.push(task.id); });
  writeStorage("campusflow_deleted_tasks_v1", JSON.stringify(deletedTaskIds));
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
  announce(t("tasksCleared", { count: completedCount, plural: completedCount === 1 ? "" : "s" }));
});

$("#theme-toggle").addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  writeStorage(THEME_KEY, isDark ? "dark" : "light");
  $("#theme-toggle").setAttribute("aria-label", t("switchTheme"));
  $("#theme-toggle").setAttribute("title", t("switchTheme"));
});

function renderHeaderDates() {
  const now = new Date();
  $("#header-date").textContent = new Intl.DateTimeFormat(dateLocale(), { weekday: "short", month: "short", day: "numeric" }).format(now);
  $("#welcome-date").textContent = new Intl.DateTimeFormat(dateLocale(), { weekday: "long", month: "long", day: "numeric" }).format(now).toUpperCase();
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.title = t("documentTitle");
  document.querySelector('meta[name="description"]').content = t("metaDescription");
  document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => { element.title = t(element.dataset.i18nTitle); });
  const languageButton = $("#language-toggle");
  languageButton.textContent = currentLanguage === "en" ? "VI" : "EN";
  languageButton.setAttribute("aria-label", t(currentLanguage === "en" ? "switchToVi" : "switchToEn"));
  languageButton.title = t(currentLanguage === "en" ? "switchToVi" : "switchToEn");
  $("#theme-toggle").setAttribute("aria-label", t("switchTheme"));
  $("#theme-toggle").title = t("switchTheme");
  renderHeaderDates();
  $("#api-url").value = apiBase;
  $("#account-status").textContent = accountToken ? t("syncDone") : t("localOnly");
  render();
}

function renderInsights() {
  const completedTasks = tasks.filter((task) => task.completed && task.rewarded).length;
  const xp = completedTasks * 20 + focusLog.length * 10;
  const level = Math.floor(xp / 100) + 1;
  const streakDates = new Set([...focusLog.map((item) => item.date), ...tasks.filter((task) => task.completed).map((task) => task.completedAtDate).filter(Boolean)]);
  let streak = 0; const cursor = new Date(); cursor.setHours(0, 0, 0, 0);
  if (!streakDates.has(localDateString(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (streakDates.has(localDateString(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  $("#level-value").textContent = String(level); $("#streak-value").textContent = String(streak); $("#xp-value").textContent = String(xp);
  $("#xp-bar").style.width = `${xp % 100}%`; $("#xp-caption").textContent = t("xpNext", { remaining: 100 - (xp % 100) });
  const counts = new Map(); focusLog.forEach((item) => counts.set(item.date, (counts.get(item.date) || 0) + 1));
  tasks.filter((task) => task.completed && task.completedAtDate).forEach((task) => counts.set(task.completedAtDate, (counts.get(task.completedAtDate) || 0) + 1));
  const heatmap = $("#heatmap"); heatmap.replaceChildren(); const end = new Date(); end.setHours(0, 0, 0, 0); const start = new Date(end); start.setDate(start.getDate() - 363 - start.getDay());
  for (let day = 0; day < 364; day += 1) { const date = new Date(start); date.setDate(start.getDate() + day); const dateKey = localDateString(date); const count = counts.get(dateKey) || 0; const cell = document.createElement("i"); cell.className = `heat-cell level-${Math.min(4, count)}`; cell.title = `${dateKey}: ${count}`; heatmap.append(cell); }
  const minutes = {}; focusLog.forEach((item) => { minutes[item.category] = (minutes[item.category] || 0) + item.minutes; });
  const categories = ["Study", "Project", "Personal", "Review"].filter((category) => minutes[category]); const holder = $("#category-time"); holder.replaceChildren();
  if (!categories.length) { holder.textContent = t("noStudyTime"); return; }
  categories.forEach((category) => { const item = document.createElement("span"); item.textContent = `${t(`category${category}`)} · ${minutes[category]} min`; holder.append(item); });
}

$("#export-data").addEventListener("click", () => { const blob = new Blob([JSON.stringify({ version: 1, tasks, focusLog }, null, 2)], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "campusflow-backup.json"; link.click(); URL.revokeObjectURL(link.href); });
$("#import-data").addEventListener("change", async (event) => { try { const data = JSON.parse(await event.target.files[0].text()); if (!Array.isArray(data.tasks) || !Array.isArray(data.focusLog)) throw new Error("invalid backup"); tasks = data.tasks; focusLog = data.focusLog; writeStorage(SESSION_LOG_KEY, JSON.stringify(focusLog)); saveTasks(); render(); announce(t("importSuccess")); } catch { announce(t("importFailed")); } event.target.value = ""; });
$("#enable-reminders").addEventListener("click", async () => { if (!("Notification" in window)) return announce(t("reminderDenied")); const permission = await Notification.requestPermission(); if (permission !== "granted") return announce(t("reminderDenied")); writeStorage("campusflow_reminders_v1", "on"); announce(t("reminderEnabled")); });
$("#suggest-subtasks").addEventListener("click", () => { const title = titleInput.value.trim(); if (!title) { titleInput.focus(); return; } const count = Math.max(2, Math.min(8, Math.ceil((Number($("#task-estimate").value) || 60) / 45))); const parts = Array.from({ length: count }, (_, index) => `${title} — ${currentLanguage === "vi" ? `phần ${index + 1}` : `part ${index + 1}`}`); $("#task-subtasks").value = parts.join("\n"); });
function checkDueReminders() { if (readStorage("campusflow_reminders_v1") !== "on" || !("Notification" in window) || Notification.permission !== "granted") return; const due = tasks.filter((task) => !task.completed && task.dueDate === today); if (due.length && readStorage(`campusflow_reminded_${today}`) !== "yes") { new Notification("CampusFlow", { body: due.map((task) => task.title).join(", ") }); writeStorage(`campusflow_reminded_${today}`, "yes"); } }
checkDueReminders(); window.setInterval(checkDueReminders, 60000);
if ("serviceWorker" in navigator && location.protocol !== "file:") window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));

$("#language-toggle").addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "vi" : "en";
  writeStorage(LANGUAGE_KEY, currentLanguage);
  applyLanguage();
});

async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (accountToken) headers.set("Authorization", "Bearer " + accountToken);
  if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const response = await fetch(apiBase + path, { ...options, headers });
  if (!response.ok) throw new Error("API " + response.status);
  return response.status === 204 ? null : response.json();
}

function mergeSnapshot(remote) {
  deletedTaskIds = [...new Set([...deletedTaskIds, ...(remote.deletedTaskIds || []).map((item) => item.asText ? item.asText() : item)])];
  writeStorage("campusflow_deleted_tasks_v1", JSON.stringify(deletedTaskIds));
  const localById = new Map(tasks.map((task) => [task.id, task]));
  (remote.tasks || []).forEach((task) => {
    const local = localById.get(task.id);
    if (!local || Number(task.updatedAt || 0) > Number(local.updatedAt || 0)) localById.set(task.id, task);
  });
  tasks = [...localById.values()].filter((task) => !deletedTaskIds.includes(task.id));
  const logs = new Map();
  [...focusLog, ...(remote.focusLog || [])].forEach((item, index) => {
    const key = item.id || [item.date, item.completedAt || index, item.category, item.taskId].join("|");
    if (!logs.has(key)) logs.set(key, item);
  });
  focusLog = [...logs.values()];
  writeStorage(STORAGE_KEY, JSON.stringify(tasks));
  writeStorage(SESSION_LOG_KEY, JSON.stringify(focusLog));
}

async function syncAccount() {
  if (!accountToken) return;
  const remote = await apiRequest("/api/sync");
  mergeSnapshot(remote);
  await apiRequest("/api/sync", { method: "PUT", body: JSON.stringify({ tasks, focusLog, deletedTaskIds }) });
  render();
  $("#account-status").textContent = t("syncDone");
  $("#sync-note").textContent = t("syncDone");
}

function queueSync() {
  if (!accountToken) return;
  window.clearTimeout(syncTimer);
  syncTimer = window.setTimeout(() => apiRequest("/api/sync", { method: "PUT", body: JSON.stringify({ tasks, focusLog, deletedTaskIds }) })
    .then(() => { $("#account-status").textContent = t("syncDone"); })
    .catch(() => { $("#account-status").textContent = t("syncError"); }), 800);
}

function appendRoomMessage(message) {
  const row = document.createElement("p");
  row.className = "room-message";
  const title = document.createElement("strong"); title.textContent = message.displayName || "CampusFlow";
  const body = document.createElement("span"); body.textContent = message.text || ("[" + message.type + "]");
  row.append(title, body); $("#room-chat").append(row); $("#room-chat").scrollTop = $("#room-chat").scrollHeight;
}

function stompSend(destination, body) {
  if (!roomSocket || !stompConnected) return;
  const payload = JSON.stringify(body);
  roomSocket.send("SEND\ndestination:" + destination + "\ncontent-type:application/json\ncontent-length:" + new TextEncoder().encode(payload).length + "\n\n" + payload + String.fromCharCode(0));
}

function connectRoom(code) {
  if (!accountToken) return announce(t("roomNeedsLogin"));
  activeRoomCode = code.toUpperCase();
  $("#room-code").value = activeRoomCode;
  $("#room-status").textContent = t("roomConnecting");
  const wsUrl = apiBase.replace(/^http/, "ws") + "/ws";
  roomSocket = new WebSocket(wsUrl, ["v12.stomp"]);
  roomSocket.onopen = () => roomSocket.send("CONNECT\naccept-version:1.2\nhost:campusflow\nheart-beat:10000,10000\nAuthorization:Bearer " + accountToken + "\n\n" + String.fromCharCode(0));
  roomSocket.onmessage = (event) => {
    const raw = String(event.data);
    if (raw.startsWith("CONNECTED")) {
      stompConnected = true; $("#room-status").textContent = t("roomConnected"); $("#room-chat-form").hidden = false;
      roomSocket.send("SUBSCRIBE\nid:campusflow-room\ndestination:/topic/room/" + activeRoomCode + "\n\n" + String.fromCharCode(0));
      stompSend("/app/room/" + activeRoomCode, { type: "join", displayName: readStorage("campusflow_display_name_v1") || "Student", text: "joined the room" });
    } else if (raw.startsWith("MESSAGE")) {
      const body = raw.split("\n\n").slice(1).join("\n\n").replace(String.fromCharCode(0), "");
      try { appendRoomMessage(JSON.parse(body)); } catch { /* ignore malformed frames */ }
    } else if (raw.startsWith("ERROR")) { $("#room-status").textContent = t("roomDisconnected"); }
  };
  roomSocket.onclose = () => { stompConnected = false; $("#room-status").textContent = t("roomDisconnected"); $("#room-chat-form").hidden = true; };
  roomSocket.onerror = () => { $("#room-status").textContent = t("roomDisconnected"); };
}

$("#save-api-url").addEventListener("click", () => {
  try {
    const url = new URL($("#api-url").value.trim());
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("protocol");
    apiBase = url.origin.replace(/\/$/, "");
    writeStorage("campusflow_api_url_v1", apiBase);
    announce("API: " + apiBase);
  } catch { announce("Enter a valid http or https API address."); }
});

let authMode = "login";
$("#auth-mode").addEventListener("click", () => {
  authMode = authMode === "login" ? "register" : "login";
  $("#display-name-wrap").hidden = authMode !== "register";
  $("#auth-name").required = authMode === "register";
  $("#auth-password").autocomplete = authMode === "register" ? "new-password" : "current-password";
  $("#auth-submit").textContent = t(authMode === "register" ? "createAccount" : "signIn");
  $("#auth-mode").textContent = t(authMode === "register" ? "signIn" : "createAccount");
});
$("#auth-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = { email: $("#auth-email").value.trim(), password: $("#auth-password").value };
  if (authMode === "register") payload.displayName = $("#auth-name").value.trim();
  try {
    const result = await apiRequest("/api/auth/" + (authMode === "register" ? "register" : "login"), { method: "POST", body: JSON.stringify(payload) });
    accountToken = result.token; writeStorage("campusflow_token_v1", accountToken); writeStorage("campusflow_display_name_v1", result.displayName);
    $("#auth-password").value = ""; $("#auth-submit").hidden = true; $("#auth-mode").hidden = true; $("#sign-out").hidden = false;
    await syncAccount(); announce(t(authMode === "register" ? "accountCreated" : "signedIn"));
  } catch { announce(t("syncError")); }
});
$("#sign-out").addEventListener("click", () => {
  if (roomSocket) roomSocket.close(); roomSocket = null; stompConnected = false;
  accountToken = ""; writeStorage("campusflow_token_v1", ""); $("#auth-submit").hidden = false; $("#auth-mode").hidden = false; $("#sign-out").hidden = true;
  $("#account-status").textContent = t("localOnly"); $("#sync-note").textContent = t("syncNote");
});

$("#read-timetable").addEventListener("click", async () => {
  if (!accountToken) return announce(t("ocrNeedsLogin"));
  const file = $("#timetable-image").files[0];
  if (!file) return announce(t("ocrFailed"));
  const formData = new FormData(); formData.append("image", file);
  try {
    const result = await apiRequest("/api/ocr/timetable", { method: "POST", body: formData });
    $("#ocr-output").value = result.lines.join("\n");
    announce(t("extractText"));
  } catch { announce(t("ocrFailed")); }
});
$("#add-ocr-tasks").addEventListener("click", () => {
  const lines = $("#ocr-output").value.split("\n").map((line) => line.trim()).filter((line) => line.length >= 3).slice(0, 30);
  if (!lines.length) return;
  lines.forEach((title) => tasks.unshift({ id: crypto.randomUUID(), title: title.slice(0, 90), category: "Study", priority: "normal", dueDate: "", estimateMinutes: 60, subtasks: [], completed: false, createdAt: Date.now(), updatedAt: Date.now() }));
  saveTasks(); render(); announce(t("addedTask"));
});

$("#room-create").addEventListener("click", () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; const bytes = new Uint8Array(8); crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
  $("#room-chat").replaceChildren(); connectRoom(code);
});
$("#room-join").addEventListener("click", () => {
  const code = $("#room-code").value.trim().toUpperCase();
  if (!/^[A-Z0-9]{6,12}$/.test(code)) return announce("Room code must be 6–12 letters or numbers.");
  $("#room-chat").replaceChildren(); connectRoom(code);
});
$("#room-chat-form").addEventListener("submit", (event) => {
  event.preventDefault(); const text = $("#room-message").value.trim(); if (!text) return;
  stompSend("/app/room/" + activeRoomCode, { type: "chat", displayName: readStorage("campusflow_display_name_v1") || "Student", text });
  $("#room-message").value = "";
});
$("#room-leave").addEventListener("click", () => {
  if (stompConnected) stompSend("/app/room/" + activeRoomCode, { type: "leave", displayName: readStorage("campusflow_display_name_v1") || "Student", text: "left the room" });
  if (roomSocket) roomSocket.close(); roomSocket = null; stompConnected = false; $("#room-chat-form").hidden = true; $("#room-status").textContent = t("roomOffline");
});

if (readStorage(THEME_KEY) === "dark") document.body.classList.add("dark");
if (accountToken) { $("#auth-submit").hidden = true; $("#auth-mode").hidden = true; $("#sign-out").hidden = false; }
applyLanguage();
if (accountToken) syncAccount().catch(() => { $("#account-status").textContent = t("syncError"); });
