import { createContext } from "react";


interface EventEmitter {
    subscribe: (listener: (data: any) => void) => () => void;
    emit: (data: any) => void;
}

const EventEmitterContext = createContext<EventEmitter | null>(null);

export const useEventEmitter = () => {
    const context = useContext(EventEmitterContext);
    if (!context) {
        throw new Error('useEventEmitter must be used within an EventEmitterProvider')
    }
    return context
}

interface EventEmitterProviderProps {
    eventEmitter: EventEmitter
    children: React.ReactNode
}

export function EventEmitterProvider({ eventEmitter, children }: EventEmitterProviderProps) {
    return (
        <EventEmitterContext.Provider value={eventEmitter}>
            {children}
        </EventEmitterContext.Provider>
    )
}