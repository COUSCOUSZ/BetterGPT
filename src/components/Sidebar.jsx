import { useEffect, useState, useRef } from "react";
import Button from "./Button"
import Header from "./Header"

const Sidebar = ({ sidebar, OnHandleSidebar,OnScrollToMessage, OnLoadChat, chatMessages }) => {
    const messageRefs = useRef([]);

    const handleMessageClick = (content) => {
        OnScrollToMessage(content);
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

            <div id='cmo-sidebar' className={`absolute right-0 top-0 ${sidebar} h-screen overflow-y-auto  bg-neutral-900 `}>
                <Header />
                {/* <Button onClick={OnHandleSidebar} size='small'>toggle sidebar</Button> */}
                {
                    chatMessages && chatMessages.length > 0 && chatMessages.map((msg, index) => (
                        <div
                            key={index}
                            ref={el => messageRefs.current[index] = el}
                            onClick={()=>handleMessageClick(msg.content)}
                            className='p-2 rounded m-2 text-sm cursor-pointer bg-token-sidebar-surface-secondary text-neutral-300 hover:bg-neutral-800'>
                            {msg.short}
                            <div className="hidden-msg hidden">
                                {msg.content}
                            </div>
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