import { FaPlay } from "react-icons/fa";



const VideoTitle = ({title,overview}) => {
  return (
    <div className=' w-screen overflow-x-hidden aspect-video  pt-[18%] px-6 md:px-[6%] absolute text-white bg-gradient-to-r from-gray-950'>
      <h1 className='mb-2.5 text-4xl md:text-6xl font-bold w-1/2'>{title}</h1>
      <p className='hidden md:inline-block py-2 text-lg w-3/4'>{overview}</p>
      <div className='gap-2.5 flex'>
       <button className=' flex items-center gap-2 bg-white text-black font-semibold py-2 px-7 md:py-4 md:px-12 text-2xl rounded-md hover:opacity-80  cursor-pointer'>
  <FaPlay />
  Play
</button>

        <button className='hidden md:inline-block gap-2 mx-2 bg-black text-white p-4 px-12 text-2xl opacity-50 rounded-md hover:opacity-80 cursor-pointer'>
         More Info
            </button>
            
            
      </div>
    </div>
  )
}

export default VideoTitle
