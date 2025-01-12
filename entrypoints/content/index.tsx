import ReactDOM from 'react-dom/client';
import App from './App';
import "@/assets/css/tailwind.css"
import { EventEmitterProvider } from './context/EventEmitterContext';

export default defineContentScript({
    matches: ['https://chatgpt.com/*'],
    main(ctx) {

        // Event emitter for communication
        const eventEmitter = {
            listeners: new Set<(data: any) => void>(),
            emit(data: any) {
                
                this.listeners.forEach(listener => listener(data))
            },
            subscribe(listener: (data: any) => void) {
                this.listeners.add(listener)
                return () => this.listeners.delete(listener)
            }
        }

        // Listen for messages from background script, check background.ts
        chrome.runtime.onMessage.addListener((message) => {
            // console.log("hhhh");

            if (message.type === "API_RESPONSE" || message.type === "API_ERROR") {
                // console.log(message);
                eventEmitter.emit(message);
            }
        })



        const ui = createIntegratedUi(ctx, {
            position: "inline",
            anchor: "body",
            onMount: (container) => {
                // Create a root in the UI container and render a component
                const root = ReactDOM.createRoot(container);
                // console.log(eventEmitter);

                root.render(
                    <EventEmitterProvider eventEmitter={eventEmitter}>
                        <App />
                    </EventEmitterProvider>
                );
                return root;
            },
            onRemove: (root) => {
                // Unmount the root & close channel when the UI is removed
                eventEmitter.listeners.clear();
                root?.unmount();
            }
        });

        // Call mount to add the UI to the DOM
        ui.mount();
    }
})