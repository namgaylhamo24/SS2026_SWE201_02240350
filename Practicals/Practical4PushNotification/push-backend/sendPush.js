import fs from 'fs/promises';
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

async function loadTokensFromFile() {
  try {
    const raw = await fs.readFile(new URL('./tokens.json', import.meta.url));
    const parsed = JSON.parse(raw.toString());
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.tokens)) return parsed.tokens;
    return [];
  } catch (err) {
    return null; // signal not found
  }
}

async function loadTokensFromBackend() {
  const backend = process.env.BACKEND_URL || 'http://localhost:3000';
  if (typeof fetch === 'undefined') throw new Error('global fetch is not available; please provide tokens.json');
  const res = await fetch(`${backend}/tokens`);
  if (!res.ok) throw new Error(`Failed to fetch tokens from backend: ${res.status}`);
  const body = await res.json();
  return Array.isArray(body.tokens) ? body.tokens : [];
}

async function sendPush() {
  let tokens = await loadTokensFromFile();
  if (tokens === null) {
    try {
      tokens = await loadTokensFromBackend();
    } catch (err) {
      console.error('Could not load tokens from backend:', err.message);
      return;
    }
  }

  tokens = tokens.filter(t => Expo.isExpoPushToken(t));
  if (tokens.length === 0) {
    console.log('No valid Expo push tokens found.');
    return;
  }

  const messages = tokens.map(t => ({
    to: t,
    sound: 'default',
    title: 'From the backend',
    body: 'This push came from a Node.js script.',
    data: { sentAt: Date.now() },
  }));

  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const t = await expo.sendPushNotificationsAsync(chunk);
      console.log('Sent chunk, tickets:', t);
      tickets.push(...t);
    } catch (error) {
      console.error('Send error:', error);
    }
  }

  const receiptIds = tickets.map(x => x.id).filter(Boolean);
  if (receiptIds.length === 0) {
    console.log('No receipt IDs to check.');
    return;
  }

  // wait a short while for receipts to be available
  await new Promise(r => setTimeout(r, 5000));

  while (receiptIds.length) {
    const chunk = receiptIds.splice(0, 100);
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      for (const id in receipts) {
        const receipt = receipts[id];
        if (receipt.status === 'ok') continue;
        console.error('Receipt error for', id, receipt);
      }
    } catch (err) {
      console.error('Receipt check error:', err);
    }
  }
}

sendPush();
