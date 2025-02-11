import { useEventEmitter } from "../context/EventEmitterContext";
import { Messages as MessagesType } from "../types/Messages";
import targets from "@/targets";

const Messages = () => {
    const [responses, setResponses] = useState<MessagesType[]>([]);
    const eventEmitter = useEventEmitter();
    let selector : string | undefined = undefined;

    // scroll to a specific message
    const scrollTo = (id: string) => {
        // console.log(id);
        document
            .querySelector(`[data-id="${id}"]`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    useEffect(() => {
        console.log("Setting up event listener in React component");

        // HandleMessage runs when an event is emitted
        const handleMessage = (message: any) => {
            console.log("React component received message:", message);

            function patternToRegex(pattern: string): RegExp {
                const regexString = pattern
                    .replace(/\*/g, ".*") // Replace '*' with '.*' to match any characters
                    .replace(/:\/\//g, "://"); // Keep '://' as is
                return new RegExp(`^${regexString}$`);
            }
    
            function isUrlMatching(url: string, patterns: string[]): boolean {
                return patterns.some((pattern) =>
                    patternToRegex(pattern).test(url)
                );
            }
    
            selector = targets.find((target) =>
                isUrlMatching(message.data.url, target.urlPatterns)
            )?.selector;
            console.log(selector);

            setTimeout(() => {
                // Find all message elements in ChatGPT's DOM
                const messagesDOM = selector
                    ? [...document.querySelectorAll(selector)]
                    : [];
                // console.log(messagesDOM);

                const theme = localStorage.getItem("theme");
                // console.log(theme);

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
                }
            }, 500);
        };

        // Subscribe to events and cleanup on unmount
        const unsubscribe = eventEmitter.subscribe(handleMessage);

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            {responses.map((response) => (
                <>
                    <div
                        key={response.id}
                        id={response.id}
                        className={`p-3 rounded-lg m-2 text-sm cursor-pointer bg-token-sidebar-surface-secondary  hover:bg-neutral-500/20 `}
                        onClick={() => {
                            scrollTo(response.id);
                        }}
                    >
                        <div className="line-clamp-2">{response.content}</div>
                    </div>
                </>
            ))}
        </>
    );
};
export default Messages;
