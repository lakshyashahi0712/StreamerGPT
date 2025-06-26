
import { useSelector } from 'react-redux'

import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store=>store.movies?.trailerVideo);

  useMovieTrailer(movieId);
  
  return (
    <div className=' w-screen overflow-x-hidden-hidden'>

      <iframe className=' w-full aspect-video' 
      src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&start=0&end=60&playlist="+trailerVideo?.key}  ></iframe>

    </div>
  )
}

export default VideoBackground
