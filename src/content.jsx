import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


const root = document.createElement('div')
root.id = 'crx-root'
document.body.appendChild(root)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "iconClicked") {
    console.log("Extension icon was clicked!");
    // Perform any actions you want here
  }
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
