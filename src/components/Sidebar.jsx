import { useEffect, useState, useRef } from "react";
import Button from "./Button"
import Header from "./Header"
import { StarIcon } from "@radix-ui/react-icons";

const Sidebar = ({ sidebar, OnHandleSidebar, OnScrollToMessage, OnLoadChat, chatMessages }) => {
    const messageRefs = useRef([]);


    const handleMessageClick = (content) => {
        OnScrollToMessage(content);
    }

    const handleStarMessage = (content) => {
        console.log("starred -->"+content);
    }

    useEffect(() => {
        messageRefs.current.forEach((ref, index) => {
            if (ref && ref.current) {
                console.log(`Message ${index}:`, ref.current.querySelector('.hidden-msg').textContent);
            }
        });

    }, [chatMessages]);

    return (
        <>

            <div id='cmo-sidebar' className={`absolute right-0 top-0 ${sidebar} h-screen overflow-y-auto bg-token-sidebar-surface-primary`}>
                <Header />
                {/* <Button onClick={OnHandleSidebar} size='small'>toggle sidebar</Button> */}
                {
                    chatMessages && chatMessages.length > 0 && chatMessages.map((msg, index) => (
                        <div
                            key={index}
                            ref={el => messageRefs.current[index] = el}
                            onClick={() => handleMessageClick(msg.content)}
                            className='p-2 rounded m-2 text-sm cursor-pointer bg-token-sidebar-surface-secondary  hover:bg-red-500 '>
                            {/* <div className="hover:bg-yellow-500" onClick={()=>handleStarMessage(msg.content)}>
                                <StarIcon />
                            </div> */}
                            {msg.short}
                        </div>
                    ))
                }
                {
                    chatMessages && chatMessages.length === 0 && (
                        <>
                            <div className='text-white'>No data available</div>
                            <button className="bg-neutral-600" onClick={OnLoadChat} >fetch</button>
                        </>
                    )
                }
            </div>

        </>
    )
}
export default Sidebar