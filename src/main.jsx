import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

function getColorScheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const colorScheme = getColorScheme();
  const body = document.body;

  if (colorScheme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
