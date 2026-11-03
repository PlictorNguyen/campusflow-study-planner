# CampusFlow — Study Planner

CampusFlow is a responsive study planner for assignments, project work, and focus sessions. The front end uses vanilla HTML, CSS, and JavaScript; an optional Spring Boot and PostgreSQL API adds accounts, cloud sync, timetable OCR, and live focus rooms.

The interface is organized into six navigable screens: Overview, Tasks, Calendar, Focus, Study rooms, and Account & settings. The URL hash tracks the current screen, so each view can be bookmarked or refreshed.

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
- Register and sign in with email/password, then sync tasks and focus history across devices through the API
- Extract text from a timetable image using English/Vietnamese OCR; review lines before adding them as tasks
- Join authenticated live focus rooms with presence and chat
- Responsive layout and keyboard-accessible controls

## Run locally

For the full PWA and notification features, serve the folder over localhost (service workers and notifications are unavailable from `file://`):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No package installation or build step is required.

The first visit includes a few sample tasks so the dashboard is easy to explore. While signed out, data stays in the current browser. After sign-in, tasks, deletion markers, and focus history sync to the configured API. Export a backup before clearing browser data. Due-date and Pomodoro notifications work while the app is open; they are not background push notifications.

## Start the account, OCR, and room API

Install Docker Desktop, copy `.env.example` to `.env`, replace the sample secrets with private random values, then run:

```bash
docker compose up --build
```

Keep the UI served at `http://localhost:8000`; the API defaults to `http://localhost:8080`. Open the Account & device sync panel, check the API address, and register. See [backend/README.md](backend/README.md) for endpoints and configuration.

## Current scope

Email/password login, PostgreSQL sync, image OCR, and live text/presence rooms are implemented for self-hosting. OCR text is reviewed by the student before creating tasks. Room traffic is real-time but in-memory and disappears when the API restarts. Google sign-in, email verification, password recovery, server push notifications, persistent room history, voice/video, and public backend hosting still need provider credentials or a hosted environment. Never use the sample database password or a public JWT secret in production.

## Built with

- HTML
- CSS
- JavaScript
- Java 17 / Spring Boot / PostgreSQL (optional API)
- Tesseract OCR (API container)

---

CampusFlow was created as a portfolio project to practice building a complete, responsive interface with persistent client-side state and interactive focus tools.
