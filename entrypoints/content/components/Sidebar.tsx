import { useState, useEffect } from "react";
import { useEventEmitter } from "../context/EventEmitterContext";
import { isUrlMatching } from "../utils";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import { Messages as MessagesType } from "../types/Messages";
import targets, { Target } from "@/entrypoints/content/targets";
import { backgroundStyles } from "../css-variants";

interface Props {
    sidebar: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ sidebar, toggleSidebar }: Props) => {
    const [responses, setResponses] = useState<MessagesType[]>([]);
    const [target, setTarget] = useState<Target | undefined>(undefined);
    const bgCSS = target?.cssKey ? backgroundStyles[target.cssKey]:"";
    const eventEmitter = useEventEmitter();
    const [isLoading, setIsLoading] = useState(false);

    const reload = ()=>{
        const selector = target?.selector;
        setIsLoading(true);
        setTimeout(() => {
            // Find all message elements in ChatGPT's DOM
            const messagesDOM = selector
                ? [...document.querySelectorAll(selector)]
                : [];
            // console.log(messagesDOM);

            // set data-id attribute to each message element for scrollTo()
            messagesDOM.forEach((msgDOM, index) => {
                msgDOM.setAttribute("data-id", index.toString());
            });

            // Convert DOM elements to message objects
            if (messagesDOM) {
                const messages: MessagesType[] = messagesDOM
                    .map((msg) => ({
                        id: msg.getAttribute("data-id") || "",
                        content: msg.textContent,
                        // short: msg.textContent?.substring(0, 60),
                    }))
                    .filter((msg) => msg.content?.trim().length);

                console.log(messages);

                setResponses(messages);
                setIsLoading(false);
            }
        }, 500);
        
    }

    useEffect(() => {
        console.log("Setting up event listener in React component");

        // HandleMessage runs when an event is emitted
        const handleMessage = (message: any) => {
            console.log("React component received message:", message);

            const foundTarget = targets.find((target) =>
                isUrlMatching(message.data.url, target.urlPatterns)
            );
            setTarget(foundTarget);
            const selector = foundTarget?.selector;

            setIsLoading(true);
            setTimeout(() => {
                // Find all message elements in ChatGPT's DOM
                const messagesDOM = selector
                    ? [...document.querySelectorAll(selector)]
                    : [];
                // console.log(messagesDOM);

                // set data-id attribute to each message element for scrollTo()
                messagesDOM.forEach((msgDOM, index) => {
                    msgDOM.setAttribute("data-id", index.toString());
                });

                // Convert DOM elements to message objects
                if (messagesDOM) {
                    const messages: MessagesType[] = messagesDOM
                        .map((msg) => ({
                            id: msg.getAttribute("data-id") || "",
                            content: msg.textContent,
                            // short: msg.textContent?.substring(0, 60),
                        }))
                        .filter((msg) => msg.content?.trim().length);

                    console.log(messages);

                    setResponses(messages);
                    setIsLoading(false);
                }
            }, 500);
        };

        // Subscribe to events and cleanup on unmount
        const unsubscribe = eventEmitter.subscribe(handleMessage);

        return () => {
            unsubscribe();
        };
    }, [eventEmitter]);

    return (
        <div
            className={`${
                sidebar ? "w-[20rem]" : "w-0"
            } relative h-screen overflow-y-auto ${bgCSS}`}
        >
            <div className="mb-16">
                <Header toggleSidebar={toggleSidebar} />
                <Messages target={target} responses={responses} isLoading={isLoading} />
            </div>
            <Footer target={target} reload={reload} isLoading={isLoading} />
        </div>
    );
};

export default Sidebar;
