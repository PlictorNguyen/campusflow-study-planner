# CampusFlow API

Spring Boot API and PostgreSQL store for account login, task/focus-history sync, image OCR, and authenticated live focus-room messages.

## Start locally

1. Copy the root .env.example file to .env. Set JWT_SECRET to a unique random value of at least 32 bytes and choose a private database password.
2. Start the API and database from the project root with: docker compose up --build
3. Check http://localhost:8080/api/health.
4. Serve the static UI at http://localhost:8000, matching APP_ORIGIN.

The API listens on port 8080. Registration uses an email and a password of at least 10 characters. It returns a signed bearer token. Use that token for /api/sync, /api/ocr/timetable, and WebSocket STOMP connections.

## Endpoints

- POST /api/auth/register and POST /api/auth/login
- GET /api/sync and PUT /api/sync (per-account tasks and Pomodoro history)
- POST /api/ocr/timetable (multipart field image; English and Vietnamese OCR)
- WebSocket /ws; STOMP sends to /app/room/{CODE} and subscribes to /topic/room/{CODE}
- GET /api/health

Room codes must be 6–12 uppercase letters or digits. Room messages support join, leave, chat, timer, and presence types. The live broker is in-memory: messages are not retained and rooms do not survive an API restart.

## Important setup

Use HTTPS and managed PostgreSQL in production. Set APP_ORIGIN to the exact hosted UI origin and use strong secrets from the hosting provider. Google sign-in, email verification, password recovery, background push, and durable room history are not included. OCR returns extracted text for the student to review; it does not silently create calendar events.
