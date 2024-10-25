import Sidebar from "./components/Sidebar";
import { APIResponse } from "./types/Api";
import logo from "@/assets/logo.svg"



const App = () => {
    const [sidebar, setSidebar] = useState<boolean>(true);
    

    const toggleSidebar=()=>{
        if(sidebar){
            document.body.style.width = 'auto';
            setSidebar(false);
        }
        else{
            document.body.style.width = 'calc(100% - 20rem)';
            setSidebar(true);
        }
    }

    return (
        <>
            <div>
                {/* sidebar container */}
                <section id='cmo-sidebar-container' className={`fixed right-0 top-0 ${sidebar ? "w-[20rem]" : "w-0"} h-screen transition-all text-token-text-primary`}> 
                    {/* toggle btn */}
                    <div id='cmo-toggle'
                        onClick={toggleSidebar}
                        className='absolute left-0 -translate-x-[4rem] top-1/2 p-2 h-10 w-10 z-[999999] rounded cursor-pointer btn-primary'
                    >
                        <img src={logo} alt="logo svg" />
                    </div>
                    {/* sidebar */}
                    <Sidebar
                        sidebar={sidebar}
                        toggleSidebar={toggleSidebar}
                        // responses={responses}
                    />

                </section>
                
            </div>
        </>
    )
}
export default App