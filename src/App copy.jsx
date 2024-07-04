import { useState, useEffect } from 'react'
import logo from './assets/logo.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import { waitFor, waitForThem } from './utils/observer'

function App() {
  const sidebarWidth = 'w-[16.25rem]'
  const [toggle, setToggle] = useState(true)
  const [chatMessages, setChatMessages] = useState([]);
  const [sidebar, setSidebar] = useState('w-0');
  const [isLoading, setIsLoading] = useState(true);

  const loadChat = async () => {
    setIsLoading(true);
    try {
      const elements = await waitForThem(
        ".flex.w-full.flex-col.gap-1.juice\\:empty\\:hidden.items-end.rtl\\:items-start > div > div:first-child"
      );
      const msgs = Array.from(elements);
      const msgsConfig = msgs.map((msg) => ({
        "content": msg.innerHTML,
        "short": msg.innerHTML.substring(0, 60) + "...",
      }));
      setChatMessages(msgsConfig);
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }
    setIsLoading(false);
  }

  const toggleOn = () => {
    setToggle(true)
    setSidebar(sidebarWidth)
    document.body.style.width = 'calc(100% - 16.25rem)'
  }

  const toggleOff = () => {
    setToggle(false)
    setSidebar('w-0')
    document.body.style.width = 'auto'
  }

  useEffect(() => {
    const initializeSidebar = async () => {
      if (toggle) {
        await waitFor(".flex.flex-col.text-sm.md\\:pb-9");
        console.log("...... Hmm must be the wind!");
        toggleOn();
        await loadChat();
      } else {
        toggleOff();
      }
    };

    initializeSidebar();
  }, [toggle]);

  const handleSidebar = () => {
    setToggle(!toggle);
  }

  return (
    <>
      <section id='cmo-sidebar-container' className={`fixed right-0 top-0 ${sidebar} h-screen transition-all`}>
        <div id='cmo-toggle' onClick={handleSidebar} className='absolute left-0 -translate-x-[4rem] top-1/2 p-2 z-[999999] w-10 rounded cursor-pointer bg-blue-900 text-white'>
          <img src={chrome.runtime.getURL(logo)} alt="" />
        </div>
        <Sidebar 
          sidebar={sidebar} 
          OnHandleSidebar={handleSidebar} 
          chatMessages={chatMessages} 
          OnLoadChat={loadChat} 
          isLoading={isLoading}
        />
      </section>
    </>
  )
}

export default App