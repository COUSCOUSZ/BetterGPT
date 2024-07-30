import logo from '../assets/logo48.png'

const Header = () => {
  return (
    <>
      <header>
        <div className='flex gap-1 justify-center items-center p-1 '>
          <img src={chrome.runtime.getURL(logo)} alt="logo" className='w-5' />
          <h1 className='font-semibold dark:text-yellow-500'>BetterGPT</h1>
        </div>
      </header>
    </>
  )
}
export default Header