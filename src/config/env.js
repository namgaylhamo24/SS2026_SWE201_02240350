import Constants from 'expo-constants';

function getDevHost() {
  try {
    const manifest = Constants.expoConfig;
    const hostUri =
      manifest?.hostUri ??
      Constants.manifest2?.extra?.expoClient?.hostUri;
    if (hostUri) return hostUri.split(':')[0];
  } catch {
    // ignore
  }
  return 'localhost';
}

const extra = Constants.expoConfig?.extra ?? {};

export const API_BASE_URL =
  (extra.apiUrl || process.env.EXPO_PUBLIC_API_URL || `http://${getDevHost()}:3000`).replace(
    /\/$/,
    '',
  );

export const ADMIN_API_KEY =
  extra.adminApiKey || process.env.EXPO_PUBLIC_ADMIN_API_KEY || '';
