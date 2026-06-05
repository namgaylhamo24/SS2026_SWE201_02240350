import axios from 'axios';
import { API_BASE_URL, ADMIN_API_KEY } from '../config/env';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const authHeaders = { headers: { 'x-api-key': ADMIN_API_KEY } };

export async function registerDevice({ deviceId, pushToken, topics = [] }) {
  const { data } = await api.post('/devices/register', {
    deviceId,
    pushToken,
    topics,
    categories: topics,
  });
  return data;
}

export async function requestTestPush({ deviceId, title, body, data }) {
  const { data: result } = await api.post(
    '/notifications/send',
    { deviceId, title, body, data },
    authHeaders,
  );
  return result;
}

export async function sendTopicBroadcast({ topic, title, body, data }) {
  const { data: result } = await api.post(
    '/notifications/broadcast',
    { topic, category: topic, title, body, data },
    authHeaders,
  );
  return result;
}

export async function publishRemoteAnnouncement({ topic, title, body, announcementId }) {
  const { data: result } = await api.post(
    '/announcements/publish',
    { topic, title, body, announcementId },
    authHeaders,
  );
  return result;
}

export { API_BASE_URL };
