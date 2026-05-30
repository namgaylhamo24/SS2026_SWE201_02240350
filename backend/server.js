import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Expo } from 'expo-server-sdk';

const app = express();
const expo = new Expo();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'dev-admin-key-change-me';

const devices = new Map();

app.use(cors());
app.use(express.json());

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing x-api-key header' });
  }
  return next();
}

function getTopics(device) {
  return device.topics?.length ? device.topics : device.categories || [];
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, devices: devices.size });
});

app.post('/devices/register', (req, res) => {
  const { deviceId, pushToken, topics, categories } = req.body;
  const topicList = topics || categories || [];
  if (!deviceId || !pushToken) {
    return res.status(400).json({ error: 'deviceId and pushToken are required' });
  }
  if (!Expo.isExpoPushToken(pushToken)) {
    return res.status(400).json({ error: 'Invalid Expo push token' });
  }
  devices.set(deviceId, {
    pushToken,
    topics: Array.isArray(topicList) ? topicList : [],
  });
  return res.status(201).json({ deviceId, topics: topicList, registered: true });
});

app.get('/devices', requireApiKey, (_req, res) => {
  const list = [...devices.entries()].map(([id, d]) => ({
    deviceId: id,
    topics: getTopics(d),
    pushTokenPreview: `${d.pushToken.slice(0, 24)}...`,
  }));
  res.json({ devices: list });
});

app.post('/notifications/send', requireApiKey, async (req, res) => {
  const { deviceId, title, body, data = {} } = req.body;
  const device = devices.get(deviceId);
  if (!device) {
    return res.status(404).json({ error: 'Device not registered' });
  }

  const messages = [
    {
      to: device.pushToken,
      sound: 'default',
      title: title || 'Campus News',
      body: body || 'New announcement',
      channelId: 'default',
      data: { ...data, deviceId },
    },
  ];

  try {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    for (const chunk of chunks) {
      const result = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...result);
    }
    return res.json({ ok: true, tickets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

app.post('/notifications/broadcast', requireApiKey, async (req, res) => {
  const topic = req.body.topic || req.body.category;
  const { title, body, data = {} } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'topic (or category) is required' });
  }

  const targets = [...devices.entries()].filter(([, d]) => getTopics(d).includes(topic));

  if (!targets.length) {
    return res.status(404).json({ error: `No devices subscribed to topic "${topic}"` });
  }

  const messages = targets.map(([, d]) => ({
    to: d.pushToken,
    sound: 'default',
    title: title || `${topic} news`,
    body: body || `New ${topic} announcement`,
    channelId: 'topic-updates',
    data: {
      ...data,
      topic,
      screen: data.screen || 'NewsFeed',
      type: 'topic_broadcast',
    },
  }));

  try {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    for (const chunk of chunks) {
      const result = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...result);
    }
    return res.json({ ok: true, sent: messages.length, tickets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

app.post('/announcements/publish', requireApiKey, async (req, res) => {
  const { topic, title, body, announcementId } = req.body;
  if (!topic || !title) {
    return res.status(400).json({ error: 'topic and title are required' });
  }

  const targets = [...devices.entries()].filter(([, d]) => getTopics(d).includes(topic));
  if (!targets.length) {
    return res.status(404).json({ error: `No devices subscribed to topic "${topic}"` });
  }

  const messages = targets.map(([, d]) => ({
    to: d.pushToken,
    sound: 'default',
    title,
    body: body || title,
    channelId: 'topic-updates',
    data: {
      screen: 'NewsFeed',
      topic,
      announcementId: announcementId || `remote_${Date.now()}`,
      type: 'remote_publish',
    },
  }));

  try {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    for (const chunk of chunks) {
      const result = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...result);
    }
    return res.json({ ok: true, sent: messages.length, tickets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Campus News push backend on http://0.0.0.0:${PORT}`);
});
