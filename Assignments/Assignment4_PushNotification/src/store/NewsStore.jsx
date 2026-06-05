import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEED_ANNOUNCEMENTS } from '../data/seedAnnouncements';
import { defaultSubscriptions } from '../topics/topics';
import {
  cancelScheduledNotification,
  scheduleAnnouncementPreview,
} from '../notifications/localScheduler';

const STORAGE_NEWS = '@campusnews/announcements';
const STORAGE_TOPICS = '@campusnews/topicSubscriptions';
const STORAGE_DEVICE = '@campusnews/deviceId';
const STORAGE_DAILY = '@campusnews/dailyDigest';

function makeId() {
  return `news_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const initialState = {
  announcements: [],
  topicSubscriptions: defaultSubscriptions(),
  loading: true,
  deviceId: null,
  dailyDigest: { enabled: false, hour: 20, minute: 0, notificationId: null },
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, loading: false };
    case 'SET_ANNOUNCEMENTS':
      return { ...state, announcements: action.payload };
    case 'ADD_ANNOUNCEMENT':
      return { ...state, announcements: [action.payload, ...state.announcements] };
    case 'SET_TOPIC_SUBSCRIPTIONS':
      return { ...state, topicSubscriptions: action.payload };
    case 'SET_DAILY':
      return { ...state, dailyDigest: action.payload };
    default:
      return state;
  }
}

const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const [newsRaw, topicsRaw, deviceRaw, dailyRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_NEWS),
          AsyncStorage.getItem(STORAGE_TOPICS),
          AsyncStorage.getItem(STORAGE_DEVICE),
          AsyncStorage.getItem(STORAGE_DAILY),
        ]);
        let deviceId = deviceRaw;
        if (!deviceId) {
          deviceId = `device_${Date.now()}`;
          await AsyncStorage.setItem(STORAGE_DEVICE, deviceId);
        }
        dispatch({
          type: 'HYDRATE',
          payload: {
            announcements: newsRaw ? JSON.parse(newsRaw) : SEED_ANNOUNCEMENTS,
            topicSubscriptions: topicsRaw ? JSON.parse(topicsRaw) : defaultSubscriptions(),
            deviceId,
            dailyDigest: dailyRaw ? JSON.parse(dailyRaw) : initialState.dailyDigest,
          },
        });
      } catch {
        dispatch({ type: 'HYDRATE', payload: { loading: false } });
      }
    })();
  }, []);

  useEffect(() => {
    if (state.loading) return;
    AsyncStorage.setItem(STORAGE_NEWS, JSON.stringify(state.announcements)).catch(() => {});
  }, [state.announcements, state.loading]);

  useEffect(() => {
    if (state.loading) return;
    AsyncStorage.setItem(STORAGE_TOPICS, JSON.stringify(state.topicSubscriptions)).catch(() => {});
  }, [state.topicSubscriptions, state.loading]);

  useEffect(() => {
    if (state.loading) return;
    AsyncStorage.setItem(STORAGE_DAILY, JSON.stringify(state.dailyDigest)).catch(() => {});
  }, [state.dailyDigest, state.loading]);

  const getAnnouncement = useCallback(
    (id) => state.announcements.find((a) => a.id === id) ?? null,
    [state.announcements],
  );

  const subscribedTopics = useCallback(
    () => Object.keys(state.topicSubscriptions).filter((t) => state.topicSubscriptions[t]),
    [state.topicSubscriptions],
  );

  const addAnnouncement = useCallback(
    async (input) => {
      const item = {
        id: makeId(),
        title: input.title,
        summary: input.summary || input.body?.slice(0, 120) || '',
        body: input.body || '',
        topic: input.topic || 'Campus',
        publishedAt: new Date().toISOString(),
        isBreaking: Boolean(input.isBreaking),
        localNotificationId: null,
      };

      if (input.scheduleLocalPreview) {
        try {
          item.localNotificationId = await scheduleAnnouncementPreview(
            item,
            input.previewDelaySeconds ?? 15,
          );
        } catch (e) {
          console.warn('Local preview schedule failed', e);
        }
      }

      dispatch({ type: 'ADD_ANNOUNCEMENT', payload: item });
      return item;
    },
    [],
  );

  const setTopicSubscription = useCallback((topic, enabled) => {
    dispatch({
      type: 'SET_TOPIC_SUBSCRIPTIONS',
      payload: { ...state.topicSubscriptions, [topic]: enabled },
    });
  }, [state.topicSubscriptions]);

  const setDailyDigest = useCallback((settings) => {
    dispatch({ type: 'SET_DAILY', payload: settings });
  }, []);

  const cancelAnnouncementLocal = useCallback(async (id) => {
    const item = state.announcements.find((a) => a.id === id);
    if (item?.localNotificationId) {
      await cancelScheduledNotification(item.localNotificationId);
    }
  }, [state.announcements]);

  const value = useMemo(
    () => ({
      ...state,
      getAnnouncement,
      subscribedTopics,
      addAnnouncement,
      setTopicSubscription,
      setDailyDigest,
      cancelAnnouncementLocal,
    }),
    [
      state,
      getAnnouncement,
      subscribedTopics,
      addAnnouncement,
      setTopicSubscription,
      setDailyDigest,
      cancelAnnouncementLocal,
    ],
  );

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error('useNews must be used within NewsProvider');
  return ctx;
}
