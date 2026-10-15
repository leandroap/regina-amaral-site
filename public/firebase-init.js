import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey: '${VITE_FIREBASE_API_KEY}',
  authDomain: '${VITE_FIREBASE_AUTH_DOMAIN}',
  projectId: '${VITE_FIREBASE_PROJECT_ID}',
  storageBucket: '${VITE_FIREBASE_STORAGE_BUCKET}',
  messagingSenderId: '${VITE_FIREBASE_MESSAGING_SENDER_ID}',
  appId: '${VITE_FIREBASE_APP_ID}',
  measurementId: '${VITE_FIREBASE_MEASUREMENT_ID}',
};

const hasUnreplacedConfig = Object.values(firebaseConfig).some(
  (value) => !value || value.includes('${VITE_FIREBASE_')
);

export const analyticsReady = (async () => {
  if (hasUnreplacedConfig || !firebaseConfig.measurementId) return null;

  const app = initializeApp(firebaseConfig);
  if (!(await isSupported())) return null;

  return getAnalytics(app);
})();
