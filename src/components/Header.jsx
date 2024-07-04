import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <>
      <header>
        <div className='flex gap-1 justify-center items-center p-1 '>
          <img src={chrome.runtime.getURL(logo)} alt="logo" className='w-5' />
          <h1 className='text-neutral-300 font-semibold'>BetterGPT</h1>
        </div>
      </header>
    </>
  )
}
export default Header