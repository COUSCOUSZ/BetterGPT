import targets, { Target } from "@/entrypoints/content/targets";
import { Messages as MessagesType } from "../types/Messages";
import { scrollTo } from "../utils";
import { messageStyles } from "../css-variants";

interface Props {
    target: Target | undefined;
    responses: MessagesType[];
    isLoading: boolean;
}

const Messages = ({ target, responses,isLoading }: Props) => {
    const messageCSS = target?.cssKey ? messageStyles[target.cssKey]:"";
    return (
        <>
            {responses.map((response) => (
                <>
                    <div
                        key={response.id}
                        id={response.id}
                        className={`p-3 rounded-lg m-2 text-sm cursor-pointer ${messageCSS} ${isLoading && "animate-pulse"}`}
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
