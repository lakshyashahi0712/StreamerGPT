import { FaPlay } from "react-icons/fa";



const VideoTitle = ({title,overview}) => {
  return (
    <div className=' w-screen overflow-x-hidden aspect-video pt-[18%] px-[6%] absolute text-white bg-gradient-to-r from-gray-950'>
      <h1 className='text-6xl font-bold w-1/2'>{title}</h1>
      <p className='py-2 text-lg w-3/4'>{overview}</p>
      <div className='gap-2.5 flex'>
       <button className='flex items-center gap-2 bg-white text-black font-semibold p-4 px-12 text-2xl rounded-md hover:opacity-80  cursor-pointer'>
  <FaPlay />
  Play
</button>

        <button className='flex gap-2 mx-2 bg-black text-white p-4 px-12 text-2xl opacity-50 rounded-md hover:opacity-80 cursor-pointer'>
         More Info
            </button>
            
            
      </div>
    </div>
  )
}

export default VideoTitle
