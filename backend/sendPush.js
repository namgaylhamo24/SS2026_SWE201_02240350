// Course notes Step 9 — send one push from Node (paste token from Settings screen).
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

// Paste your token from the app (include ExponentPushToken[...] wrapper).
const pushToken = 'ExponentPushToken[PASTE_YOUR_TOKEN_HERE]';

async function sendPush() {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error('Invalid Expo push token. Copy the full string from the app.');
    return;
  }

  const messages = [
    {
      to: pushToken,
      sound: 'default',
      title: 'From the backend',
      body: 'This push came from sendPush.js (Node.js).',
      channelId: 'topic-updates',
      data: {
        screen: 'NewsFeed',
        topic: 'Campus',
        type: 'sendPush_script',
      },
    },
  ];

  const chunks = expo.chunkPushNotifications(messages);
  for (const chunk of chunks) {
    try {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      console.log('Tickets:', tickets);
    } catch (error) {
      console.error('Send error:', error);
    }
  }
}

sendPush();
