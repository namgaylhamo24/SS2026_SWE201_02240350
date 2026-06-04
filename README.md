# Campus News Push — Assignment 4

**News & announcement app** with **topic-based** notifications (Campus, Sports, Events, Alerts), built with **Expo SDK 54** and the same **Expo Push** workflow from the course notes.

## App domain

| Feature | Description |
|---------|-------------|
| News feed | Browse/filter announcements by topic |
| My topics | Subscribe/unsubscribe per topic (stored + sent to backend) |
| Publish | Create stories; optional local preview notification (~15s) |
| Settings | Permissions, Expo token, local 2s test, remote push tests |

## Notification types (assignment + course)

| Type | How |
|------|-----|
| **Local (2s)** | Settings → *Fire LOCAL notification (2s)* — course Step 6 |
| **Local (scheduled)** | Daily digest; publish preview |
| **Remote (browser)** | https://expo.dev/notifications — course Step 8 |
| **Remote (Node)** | `backend/sendPush.js` or Express API — course Step 9 |
| **Remote (topic)** | Backend broadcast to subscribed devices |

## Architecture (course notes)

```
App → permission → Android channels → getExpoPushTokenAsync(projectId)
    → token sent to YOUR backend
Backend → Expo Push Service (exp.host) → FCM/APNs → phone
```

**IDs you need**

| ID | Where | From |
|----|-------|------|
| `projectId` | `app.config.js` → `extra.eas.projectId` | `eas init` (do not type by hand) |
| `package` / `bundleIdentifier` | `app.config.js` | `com.swe201.campusnews` |
| Expo Push Token | Settings screen | `registerForPushNotificationsAsync()` |

---

## Setup (follow course steps)

### Step 1 — Tools

- Node.js 20+ — https://nodejs.org
- `npm install -g eas-cli`
- Expo account — https://expo.dev/signup
- **Physical Android phone** + USB (remote push on Android needs a **development build**, not Expo Go SDK 53+)

### Step 2 — Install app dependencies

```bash
cd Assignments/Assignment4_PushNotification
npm install
npx expo install expo-notifications expo-device expo-constants
```

(Other packages are already in `package.json`.)

### Step 3 — EAS projectId (Step 4 in course)

This project uses **`app.json`** (static config) with `extra.eas.projectId` already set — same pattern as Practical 4.

```bash
eas login
```

**You do not need `eas init` to run the app.** If you want your own Expo project:

1. Go to https://expo.dev → create a project → copy the **project ID** (UUID).
2. Paste it in `app.json` under `expo.extra.eas.projectId`.

**If `eas init` crashes on Windows** (exit code `3221226505`): that is a known issue with dynamic `app.config.js` + OneDrive paths. This repo uses `app.json` instead to avoid it. Verify config works:

```bash
npx expo config --json
```

### Step 4 — Environment (backend URL)

```bash
copy .env.example .env
```

Set `EXPO_PUBLIC_API_URL` to your PC **LAN IP** (e.g. `http://10.2.24.239:3000`), not `localhost`, when testing on a phone.

```bash
cd backend
copy .env.example .env
npm install
npm start
```

### Step 5 — Build on a real device (Step 7 in course)

Enable **USB debugging** on the phone, connect USB, then:

```bash
npx expo run:android
```

First build takes several minutes. The app installs as **Campus News Push**.

> **Expo Go:** SDK 54 works in Expo Go for **local** notifications. **Remote** push on Android SDK 53+ requires `expo run:android` (development build).

### Step 6 — In the app

1. **Topics** — turn on Campus / Alerts (or others).
2. **Settings** → Request permission → **Get push token & register backend**.
3. Copy the full `ExponentPushToken[...]` string.

### Step 7 — Test from browser (Step 8 in course)

1. Open https://expo.dev/notifications
2. Paste token, Title / Body, Data:

```json
{"screen":"NewsFeed","topic":"Campus"}
```

3. Lock the phone → notification should appear in ~2–5 seconds.
4. Tap it → app opens **News feed** (foreground shows a toast).

### Step 8 — Test from Node (Step 9 in course)

Edit `backend/sendPush.js` — paste your token — then:

```bash
cd backend
npm run send
```

Or use the Express server (topic broadcast):

```bash
curl -X POST http://localhost:3000/notifications/broadcast \
  -H "Content-Type: application/json" \
  -H "x-api-key: dev-admin-key-change-me" \
  -d "{\"topic\":\"Alerts\",\"title\":\"Weather alert\",\"body\":\"Storms tonight.\",\"data\":{\"screen\":\"NewsFeed\",\"topic\":\"Alerts\"}}"
```

---

## Code layout (matches course structure)

| Course concept | This project |
|----------------|--------------|
| `App.tsx` demo | `App.jsx` + `src/notifications/setup.js` |
| `registerForPushNotificationsAsync` | `src/notifications/setup.js` |
| `setNotificationHandler` | Top of `setup.js` |
| Listeners (received / tap) | `src/notifications/handlers.js` |
| Local `scheduleNotificationAsync` | `src/notifications/localScheduler.js` |
| `sendPush.js` | `backend/sendPush.js` |
| Express + tokens | `backend/server.js` |

## Backend endpoints

| Method | URL | Auth | Purpose |
|--------|-----|------|---------|
| POST | `/devices/register` | No | Save token + **topics** |
| POST | `/notifications/send` | `x-api-key` | One device |
| POST | `/notifications/broadcast` | `x-api-key` | All devices on a **topic** |
| POST | `/announcements/publish` | `x-api-key` | Publish to topic subscribers |

## Android channels

| Channel | Use |
|---------|-----|
| `default` | Created first (course); remote pushes |
| `breaking-news` | Breaking stories |
| `topic-updates` | Topic / preview notifications |
| `daily-digest` | Daily roundup |

## Troubleshooting (from course notes)

| Problem | Fix |
|---------|-----|
| No projectId | Run `eas init` |
| Token but no push | Use dev build (`expo run:android`); lock screen; check internet |
| Local works, remote does not | Not Expo Go on Android — use `expo run:android` |
| Xiaomi/OPPO no push | Battery → app → No restrictions |
| DeviceNotRegistered | Reinstall app, get new token, re-register |

## Screenshots (deliverable)

1. Settings — permission + push token  
2. Topics or news feed  
3. Notification in system tray  

## Tech

- **JavaScript** (`.js` / `.jsx`) only  
- **Expo SDK 54**  
- Packages: `expo-notifications`, `expo-device`, `expo-constants`

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

Notes:
- Use your PC LAN IP in `EXPO_PUBLIC_API_URL` (not `localhost`) when testing on a physical device.
- If testing Android remote pushes, prefer a development build (`expo run:android`) rather than Expo Go.

