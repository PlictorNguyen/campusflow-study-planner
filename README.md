# CampusFlow — Study Planner

CampusFlow is a responsive study planner for keeping assignments, project work, and review sessions in one place. It is built with vanilla HTML, CSS, and JavaScript, with no framework or build step.

## Features

- Add tasks with a subject, priority, and due date
- Filter by all tasks, today, upcoming, and completed
- Search task titles and subjects
- Mark tasks complete or remove them
- View a weekly overview and progress summary
- Run 25-minute focus sessions and 5-minute breaks with a circular timer
- Link a focus session to an open task and count completed focus sessions each day
- Switch between light and dark themes
- Switch the interface between English and Vietnamese; the choice is remembered in the browser
- Break tasks into checkable subtasks and record an estimated duration
- Generate an editable subtask breakdown from a task title and time estimate
- Track completed focus sessions by date and task category, with a year activity heatmap
- Earn XP, levels, and a daily study streak from completed tasks and focus sessions
- Export and restore a JSON backup of tasks and focus history
- Opt in to browser notifications for tasks due today
- Install as a PWA and reopen its app shell offline after the first visit
- Save tasks, theme, language, and focus history in the current browser with `localStorage`
- Responsive layout and keyboard-accessible controls

## Run locally

For the full PWA and notification features, serve the folder over localhost (service workers and notifications are unavailable from `file://`):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No package installation or build step is required.

The first visit includes a few sample tasks so the dashboard is easy to explore. Data stays in the current browser and is not uploaded to a server. Export a backup before clearing browser data. Due-date and Pomodoro notifications work while the app is open; they are not background push notifications.

## Current scope

The app is still local-first. Cross-device account sync, Google sign-in, timetable OCR, and shared live study rooms need a deployed backend and provider credentials. The PWA uses a service worker for the app shell; it does not yet provide server push notifications.

## Built with

- HTML
- CSS
- JavaScript

---

CampusFlow was created as a portfolio project to practice building a complete, responsive interface with persistent client-side state and interactive focus tools.
