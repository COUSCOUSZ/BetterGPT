# Workflow Overview

This document outlines the workflow of the Chrome extension, detailing the interaction between the background script, content script, and React components.

## 1. Background Script (`background.ts`)

- **Monitors API Calls**: 
  - Listens for web requests to specific URLs using `chrome.webRequest`.
  - Detects when a request completes or fails.

- **Sends Messages**: 
  - Upon detecting a relevant request, sends a message to the content script using `chrome.tabs.sendMessage`.

## 2. Content Script (`index.tsx`)

- **Receives Messages**: 
  - Listens for messages from the background script using `chrome.runtime.onMessage`.

- **Event Emitter**: 
  - Uses an event emitter to broadcast these messages to React components.

- **UI Integration**: 
  - Renders the React app, providing the event emitter via context.

## 3. React App (`App.tsx`)

- **Sidebar Toggle**: 
  - Manages the state of a sidebar, allowing it to be shown or hidden.

- **Renders Components**: 
  - Includes components like `Sidebar` and `Messages`.

## 4. Messages Component (`Messages.tsx`)

- **Subscribes to Events**: 
  - Uses `useEffect` to subscribe to the event emitter for new messages.

- **Handles Messages**: 
  - Processes incoming messages, updates the state, and renders them.

- **Scroll Functionality**: 
  - Provides a function to scroll to specific messages when clicked.

## Detailed Workflow

1. **API Call Detected**:
   - Background script detects an API call to ChatGPT.
   - Logs the request and sends a message to the content script with details.

2. **Message Received**:
   - Content script receives the message.
   - Uses the event emitter to broadcast the message to any subscribed listeners.

3. **React Component Updates**:
   - The `Messages` component, having subscribed to the event emitter, receives the message.
   - Processes the message, updates its state with new message data, and re-renders the UI.

4. **User Interaction**:
   - User can click on a message to scroll to it in the main ChatGPT interface.
   - The `scrollTo` function is called, smoothly scrolling the view to the selected message.

## Diagram (Textual Representation)
[Background Script]
↓
[Detect API Call]
↓
[Send Message to Content Script]
↓
[Content Script]
↓
[Receive Message]
↓
[Emit Event]
↓
[React App]
↓
[Messages Component]
↓
[Update State & Render]
↓
[User Interaction (Click)]
↓
[Scroll to Message]