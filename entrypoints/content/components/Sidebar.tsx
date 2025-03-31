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
    const bgCSS = target?.cssKey ? backgroundStyles[target.cssKey] : "";
    const eventEmitter = useEventEmitter();
    const [isLoading, setIsLoading] = useState(false);

    const extractMessages = (selector?: string) => {
        setIsLoading(true);
        setTimeout(() => {
            // Find all message elements in ChatGPT's DOM
            const messagesDOM = selector ? [...document.querySelectorAll(selector)] : [];
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

    const reload = () => {
        console.log(target);
        
        extractMessages(target?.selector);
    };

    useEffect(() => {
        console.log("Target state updated:", target);
    }, [target]); 

    useEffect(() => {
        console.log("Setting up event listener in React component");

        const fetchRemoteTargets = async (): Promise<Target[]> => {
            console.warn("Fetching remote targets...");
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/COUSCOUSZ/BetterGPT/refs/heads/main/entrypoints/content/target.json"
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch targets: ${response.statusText}`);
                }
                const remoteTargets = await response.json();
                return remoteTargets;
            } catch (error) {
                console.error("Error fetching remote targets:", error);
                return [];
            }
        };

        // HandleMessage runs when an event is emitted
        const handleMessage = async (message: any) => {
            console.log("React component received message:", message);
            // If the target is already set, no need to fetch again
            if (target) {
                extractMessages(target.selector);
                return;
            }

            const remoteTargets = await fetchRemoteTargets();
            // Find the target that matches the current URL from the remote OR local as fallback
            const foundTarget =
                remoteTargets.find((target) =>
                    isUrlMatching(message.data.url, target.urlPatterns)
                ) || targets.find((target) => isUrlMatching(message.data.url, target.urlPatterns));

            setTarget(foundTarget);
            extractMessages(foundTarget?.selector);
        };

        // Subscribe to events and cleanup on unmount
        const unsubscribe = eventEmitter.subscribe(handleMessage);

        return () => {
            console.warn("Cleaning up event listener...");
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
