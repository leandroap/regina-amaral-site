import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBlGagY25dvKyGRUw3JEZmVKjhOnmdV3xs',
  authDomain: 'recaamaral-prd.firebaseapp.com',
  projectId: 'recaamaral-prd',
  storageBucket: 'recaamaral-prd.firebasestorage.app',
  messagingSenderId: '288982675740',
  appId: '1:288982675740:web:31b165f634e4e3b8e64ad9',
  measurementId: 'G-9TZX1DB743',
};

const app = initializeApp(firebaseConfig);

isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});
