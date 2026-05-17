
import express from 'express';
import { Expo } from 'expo-server-sdk';

const app = express();
app.use(express.json());
const expo = new Expo();
const tokens = new Set();

app.post('/token', (req, res) => {
  const { token } = req.body;
  if (Expo.isExpoPushToken(token)) tokens.add(token);
  res.sendStatus(201);
});

app.get('/', (req, res) => res.send('OK'));

app.post('/send', async (req, res) => {
  const messages = [...tokens].map(t => ({
    to: t, sound: 'default', title: 'Hello', body: 'From backend', data: {}
  }));

  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  for (const chunk of chunks) {
    const t = await expo.sendPushNotificationsAsync(chunk);
    tickets.push(...t);
  }

  // collect ticket IDs to check receipts
  const receiptIds = tickets.map(t => t.id).filter(Boolean);

  // check receipts after a delay
  setTimeout(async () => {
    const receiptIdChunks = [];
    while (receiptIds.length) receiptIdChunks.push(receiptIds.splice(0, 100));
    for (const chunk of receiptIdChunks) {
      const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      for (const id in receipts) {
        const receipt = receipts[id];
        if (receipt.status !== 'ok') console.error('Receipt error', receipt);
      }
    }
  }, 5000);

  res.json({ tickets });
});

app.get('/tokens', (req, res) => {
  res.json({ tokens: [...tokens] });
});

app.listen(3000, '0.0.0.0', () => console.log('Push backend listening on http://0.0.0.0:3000'));