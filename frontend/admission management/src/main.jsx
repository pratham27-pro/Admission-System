"use client"
import { StrictMode, React } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App/>
    </PersistGate>
  </Provider>
);