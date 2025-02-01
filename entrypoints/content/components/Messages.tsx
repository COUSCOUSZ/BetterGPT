import { useEventEmitter } from "../context/EventEmitterContext";
import { Messages as MessagesType } from "../types/Messages";



const Messages = () => {
    const [responses, setResponses] = useState<MessagesType[]>([]);
    const eventEmitter = useEventEmitter();

    // scroll to a specific message
    const scrollTo = (id: string) => {
        // console.log(id);
        document.querySelector(`[data-id="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    useEffect(() => {
        console.log('Setting up event listener in React component')

        // HandleMessage runs when an event is emitted
        const handleMessage = (message: any) => {
            console.log('React component received message:', message);

            setTimeout(() => {
                // Find all message elements in ChatGPT's DOM
                const messagesDOM = [...document.querySelectorAll("body > div.flex.h-full.w-full.flex-col > div > div.relative.flex.h-full.w-full.flex-row.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.composer-parent.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden.\\@container\\/thread > div > div > div > div > article> div > div > div > div > div > div > div > div > div.whitespace-pre-wrap")];
                // console.log(messagesDOM);

                const theme = localStorage.getItem("theme");
                // console.log(theme);

                // set data-id attribute to each message element for scrollTo()
                messagesDOM.forEach((msgDOM, index) => {
                    msgDOM.setAttribute("data-id", index.toString());
                });

                // Convert DOM elements to message objects
                if (messagesDOM) {
                    const messages: MessagesType[] = messagesDOM.map(msg => ({
                        id: msg.getAttribute("data-id") || "",
                        content: msg.textContent,
                        // short: msg.textContent?.substring(0, 60),
                    })).filter(msg => msg.content?.trim().length);

                    console.log(messages);

                    setResponses(messages);
                }
            }, 500);

        }

        // Subscribe to events and cleanup on unmount
        const unsubscribe = eventEmitter.subscribe(handleMessage)

        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <>
            {responses.map((response) => (
                <>
                    <div
                        key={response.id}
                        id={response.id}
                        className={`p-3 rounded-lg m-2 text-sm cursor-pointer bg-token-sidebar-surface-secondary  hover:bg-neutral-500/20 `}
                        onClick={() => { scrollTo(response.id) }}
                    >
                        <div className="line-clamp-2">{response.content}</div>
                    </div>
                </>
            ))}
        </>
    )
}
export default Messages