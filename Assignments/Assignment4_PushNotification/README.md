# Assignment 4

**Title:** Campus News — Push‑Notification Enabled Mobile Application



## Abstract

This report documents the design, implementation, and evaluation of "Campus News", a mobile application built with Expo and React Native that demonstrates practical use of push notifications. The system implements local scheduling, device registration for remote pushes via Expo Push Notifications, topic‑based subscription, and an Express backend that stores tokens and triggers notifications. The project satisfies the functional requirements of Assignment 4 by providing end‑to‑end notification flows, foreground/background handling, deep linking from notifications, and Android channel configuration.

## 1. Introduction

Push notifications are a fundamental mobile feature for timely user engagement. This project implements a news/announcement domain where users subscribe to topics (e.g., Campus, Alerts, Sports) and receive both scheduled local notifications and remote server‑triggered notifications. The objectives are to demonstrate correct permission handling, robust token registration, targeted remote pushes, and consistent navigation behavior when notifications are tapped.

## 2. Objectives

- Implement runtime permission requests and user feedback for denied/restricted states.
- Schedule and manage local notifications from the app UI.
- Register Expo push tokens and save them on a backend service.
- Provide backend endpoints to send single‑device or topic broadcasts using Expo's push API.
- Handle notifications across app states (foreground, background, killed) and navigate appropriately.

## 3. System Design

The system comprises two main components:

- Mobile client (Expo managed app): UI screens, notification helpers, local scheduler, registration flow, and navigation handlers.
- Backend service (Node.js + Express): token registry, protected endpoints for sending notifications, and helper scripts for manual sends.

Communication follows: app → backend (register token) → Expo push service → platform push services → device.


## 4. Implementation

Mobile app highlights:

- `src/notifications/setup.js`: registers handlers, sets notification behavior, and creates Android channels.
- `src/screens/SettingsScreen.jsx`: requests permission and registers push token with the backend via `src/api/pushApi.js`.
- Local scheduling: users can schedule reminders; scheduled notifications are cancellable and editable.
- Tap handling: notification `data` payload contains `screen` and `id` fields to deep‑link into the app.

Backend highlights:

- `backend/server.js`: stores tokens in memory (Map) and exposes `/devices/register`, `/notifications/send`, and `/notifications/broadcast` endpoints.
- `backend/sendPush.js`: simple script to send a notification to a single token (for manual testing).

Configuration:

- Environment variables are read from `.env` (sample `.env.example` provided). `EXPO_PUBLIC_API_URL` points to the backend; `EXPO_PUBLIC_ADMIN_API_KEY` secures broadcast endpoints.

## 5. Notification Flows

1. Permission & Token Registration
  - App requests permission; on success it calls `getExpoPushTokenAsync()` and sends the token and selected topics to the backend.

2. Local Notification
  - User schedules a local reminder; the app calls `scheduleNotificationAsync()` and stores the scheduler ID to allow updates/cancellation.

3. Remote Notification (single)
  - A backend POST to `/notifications/send` with `deviceId` triggers an Expo push targeted to that device.

4. Remote Notification (topic)
  - A POST to `/notifications/broadcast` sends a message to all registered tokens subscribed to the topic.

Tap handling navigates to a target screen using the `screen` field in `data`.

## 6. Testing and Evaluation

Test procedures performed:

- Local notification test (foreground/background) — verified immediate display and in‑app handling.
- Remote notification via Expo's web UI — pasted token and payload; verified receipt and tap deep linking.
- Remote notification via `backend/sendPush.js` and `POST /notifications/broadcast` — verified multi‑recipient delivery.

Metrics & observations:

- Delivery latency: typical 2–5 seconds for test messages.
- Foreground handling: custom in‑app banner and event handlers successfully updated UI without relying on system notification.

## 7. Limitations

- The backend stores tokens in memory (Map) for simplicity; a production system must persist tokens in a database.
- `x-api-key` is a minimal protection suitable for assignment demonstrations; use OAuth or stronger auth in production.
- Android remote push testing requires a development build (`expo run:android`) for SDK 53+, not Expo Go.


## 8. Conclusion

This project demonstrates end‑to‑end push notification functionality using Expo Notifications, satisfying the assignment's functional requirements. It shows robust permission handling, local scheduling, server‑triggered remote pushes, topic broadcasts, and deep linking behavior on notification tap.

## References

- Expo Notifications documentation: https://docs.expo.dev/versions/latest/sdk/notifications/
- Expo Push API guide: https://docs.expo.dev/push-notifications/overview/

## Appendix A — Quick Demo & Run Instructions

1. Backend

```bash
cd Assignments/Assignment4_PushNotification/backend
copy .env.example .env   # Windows (or cp .env.example .env)
# (optional) edit .env to set API_KEY
npm install
npm start
```

2. Mobile app (physical Android device recommended)

```bash
cd Assignments/Assignment4_PushNotification
npm install
# For remote push on Android (development build):
npx expo run:android
# For local-only testing in Expo Go:
npx expo start
```

3. Register device

Open app → Settings → Request permission → "Get push token & register backend".

4. Send test push

From browser: https://expo.dev/notifications

Or using backend broadcast:

```bash
curl -X POST http://<YOUR_PC_IP>:3000/notifications/broadcast \
  -H "Content-Type: application/json" \
  -H "x-api-key: dev-admin-key-change-me" \
  -d '{"topic":"Campus","title":"Test","body":"Hello from backend","data":{"screen":"NewsFeed","topic":"Campus"}}'
```

---



## Demo Checklist

Follow these quick steps to demonstrate the app (minimal steps to satisfy the functional requirements):

- 1) Prepare the backend

```bash
cd Assignments/Assignment4_PushNotification/backend
copy .env.example .env   # on Windows (or `cp .env.example .env` on macOS/Linux)
# Edit backend/.env: set PORT and API_KEY as needed
npm install
npm start
```

- 2) Run the mobile app (physical Android device recommended for remote pushes)

```bash
cd Assignments/Assignment4_PushNotification
npm install
# For development build (remote push on Android):
npx expo run:android
# For quick testing (local notifications) in Expo Go:
npx expo start
```

- 3) Register device for pushes

Open the app → Settings → Request permission → "Get push token & register backend". Copy the full `ExponentPushToken[...]` if you need to test from Node or the browser.

- 4) Send a test remote push

From the browser: https://expo.dev/notifications — paste token, title/body, and optional data (e.g. `{"screen":"NewsFeed","topic":"Campus"}`).

Or call the backend broadcast endpoint (example):

```bash
curl -X POST http://<YOUR_PC_IP>:3000/notifications/broadcast \
  -H "Content-Type: application/json" \
  -H "x-api-key: dev-admin-key-change-me" \
  -d '{"topic":"Campus","title":"Test","body":"Hello from backend","data":{"screen":"NewsFeed","topic":"Campus"}}'
```

- 5) Verify behavior
- Notification arrives in system tray (background) or displays in-app (foreground).
- Tap the notification → app navigates to the relevant screen (e.g., NewsFeed or announcement detail).



