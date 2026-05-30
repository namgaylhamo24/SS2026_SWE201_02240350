import React, { useRef, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NewsProvider } from './src/store/NewsStore';
import RootNavigator from './src/navigation/RootNavigator';
import ForegroundToast from './src/components/ForegroundToast';
import { useNotificationListeners } from './src/notifications/handlers';

export default function App() {
  const navigationRef = useRef(null);
  const [toast, setToast] = useState({ visible: false, title: '', body: '' });

  const onForeground = useCallback((n) => {
    setToast({ visible: true, title: n.title, body: n.body });
  }, []);

  useNotificationListeners(navigationRef, onForeground);

  return (
    <NewsProvider>
      <StatusBar style="dark" />
      <RootNavigator navigationRef={navigationRef} />
      <ForegroundToast
        visible={toast.visible}
        title={toast.title}
        body={toast.body}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </NewsProvider>
  );
}
