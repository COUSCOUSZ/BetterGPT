import { useState } from 'react'
import logo from './assets/logo.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import { useEffect } from 'react'
import { waitFor, waitForThem } from './utils/observer'


function App() {
  const sidebarClass = ".relative.max-w-\\[70\\%\\].rounded-3xl.bg-\\[\\#f4f4f4\\].px-5.py-2\\.5.dark\\:bg-token-main-surface-secondary > div:first-child";
  const sidebarWidth = 'w-[16.25rem]'
  const [toggle, setToggle] = useState(true)
  const [chatMessages, setChatMessages] = useState()
  const [sidebar, setSidebar] = useState('w-0')
  const [isLoading, setIsLoading] = useState(false)
  const body = document.body
  // const chats = document.getElementsByClassName("relative grow overflow-hidden whitespace-nowrap");
  const chats = document.getElementsByClassName("flex items-center gap-2 p-2");
  const messageInput = document.getElementsByClassName("flex items-end gap-1.5 md:gap-2")[0];

  const loadChat = () => {
    let msgs = null;
    setTimeout(() => {
      msgs = Array.from(document.querySelectorAll(sidebarClass));
      const msgsConfig = msgs.map((msg) => {
        return {
          "content": msg.innerHTML, // used to scroll to the message
          "short": msg.innerHTML.substring(0, 60) + "...", // short version of the message
        }
      });

      setChatMessages(msgsConfig);
      console.log(msgsConfig);
    }, 1000);

    // let msgs = waitForThem(sidebarClass).then((elements) => {
    //   console.log(elements);
    //   return Array.from(elements);
    // });
  }

  const toggleOn = () => {
    // toggle on
    loadChat()
    setToggle(true)
    setSidebar(sidebarWidth)
    body.style.width = 'calc(100% - 16.25rem)'
  }

  const toggleOff = () => {
    // toggle off
    setToggle(false)
    setSidebar('w-0')
    body.style.width = 'auto'
  }

  // when component is mounted
  useEffect(() => {
    if (toggle) {
      // content is lazy loaded so we need to wait for it
      waitFor(".flex.flex-col.text-sm.md\\:pb-9").then(() => {
        console.log("...... Hmm must be the wind!");
        toggleOn();
      });
    } else {
      toggleOff();
    }
    // chat click event
    Array.from(chats).forEach((chat) => {
      chat.addEventListener("click", (e) => {
        loadChat();
        console.log(`clicked ${chat.textContent}`);
      });
    });

  }, [])

  // on sidebar toggle event
  const handleSidebar = () => {
    if (toggle) {
      toggleOff();
    } else {
      toggleOn();
    }
  }

  const scrollToMessage = (content) => {
    console.log(content);
    document.querySelectorAll(sidebarClass).forEach((msg) => {
      if (msg.innerHTML === content) {
        msg.scrollIntoView({behavior: "smooth",block:'center'});
      }
    });
  }

  return (
    <>
      {/* sidebar container */}
      <section id='cmo-sidebar-container' className={`fixed right-0 top-0 ${sidebar} h-screen transition-all`}>
        {/* toggle btn */}
        <div id='cmo-toggle' onClick={handleSidebar} className='absolute left-0 -translate-x-[4rem] top-1/2 p-2 z-[999999] w-10 rounded cursor-pointer bg-blue-900 text-white'>
          <img src={chrome.runtime.getURL(logo)} alt="" />
        </div>
        {/* sidebar */}
        <Sidebar
          sidebar={sidebar}
          OnHandleSidebar={handleSidebar}
          OnScrollToMessage={scrollToMessage}
          chatMessages={chatMessages}
          OnLoadChat={loadChat}
        />

      </section>
    </>
  )
}

export default App
