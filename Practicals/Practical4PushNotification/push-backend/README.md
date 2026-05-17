Quick steps to run this backend:

1. Install dependencies

```bash
cd Practicals/Practical4PushNotification/push-backend
npm install
```

2. Edit `sendPush.js` and paste the token you copied from the phone into `pushToken`.

3. Run the script:

```bash
node sendPush.js
```

Notes:
- This uses `expo-server-sdk`. The token must be a full token like `ExponentPushToken[xxxxxxxx]`.
- Tickets returned by Expo are not delivery receipts; see Expo docs for `getPushNotificationReceiptsAsync` for verification.
