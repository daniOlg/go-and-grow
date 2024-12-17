import React from 'react';
import { createRoot } from 'react-dom/client';
import { FirebaseAppProvider } from 'reactfire';
import { App } from './App';

export const firebaseConfig = {
  apiKey: 'AIzaSyCkSwd_Fw2jhZtc_zmeL7LpGD0sQFYfcO0',
  authDomain: 'go-and-grow-74013.firebaseapp.com',
  projectId: 'go-and-grow-74013',
  storageBucket: 'go-and-grow-74013.firebasestorage.app',
  messagingSenderId: '1083588582604',
  appId: '1:1083588582604:web:7976fb0291490a355ff669',
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
);
