import logo from '../assets/images/evalvuelogo.jpg'

function Loader() {
  return (
     <div className=" absolute  z-[100]">
       <img src={logo} alt="Loading..." className="border-[6px] border-[#dcd8e0] duration-200 animate-spin-custom rounded-full   h-[180px] w-[180px] " />
       <p className='text-center font-bold text-xl'>Loading...</p>
     </div>
  )
}

export default Loader