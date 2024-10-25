import { prepare } from "wxt";
import { useEventEmitter } from "../context/EventEmitterContext";
import { APIResponse } from "../types/Api";
import { Messages as MessagesType } from "../types/Messages";



const Messages = () => {
    const [responses, setResponses] = useState<MessagesType[]>([]);
    const eventEmitter = useEventEmitter();

    const scrollTo = (id: string) => {
        console.log(id);
        document.querySelector(`[data-id="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    useEffect(() => {
        console.log('Setting up event listener in React component')

        const handleMessage = (message: any) => {
            console.log('React component received message:', message)
            const { type, data } = message

            const messagesDOM = [...document.querySelectorAll(".relative.max-w-\\[70\\%\\].rounded-3xl.bg-\\[\\#f4f4f4\\].px-5.py-2\\.5.dark\\:bg-token-main-surface-secondary > div:first-child")];
            console.log(messagesDOM);

            messagesDOM.forEach((msgDOM, index) => {
                msgDOM.setAttribute("data-id", index.toString());
            })

            if (messagesDOM) {

                const messages: MessagesType[] = messagesDOM.map(msg => ({
                    id: msg.getAttribute("data-id") || "",
                    content: msg.textContent,
                    short: msg.textContent?.substring(0, 60),
                })).filter(msg => msg.short?.trim().length)

                console.log(messages);


                setResponses(messages)
            }

        }

        // Subscribe to events
        const unsubscribe = eventEmitter.subscribe(handleMessage)

        return () => {
            unsubscribe()
        }
    }, [eventEmitter])



    return (
        <>
            {responses.map((response, index) => (
                <div
                    key={index}
                    className="p-3 rounded m-2 text-sm cursor-pointer bg-token-sidebar-surface-secondary  hover:bg-neutral-500/20 "
                    onClick={() => { scrollTo(response.id) }}
                >
                    <div>{response.short}</div>
                </div>
            ))}
        </>
    )
}
export default Messages