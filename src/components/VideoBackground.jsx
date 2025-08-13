import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);

  useMovieTrailer(movieId);
  
  // Fallback to a static image or placeholder when no trailer is available
  if (!trailerVideo || !trailerVideo.key) {
    return (
      <div className='w-screen overflow-x-hidden aspect-video bg-gray-900 flex items-center justify-center'>
        <div className='text-white text-center'>
          <h2 className='text-2xl mb-4'>Preview Not Available</h2>
          <p className='text-lg opacity-75'>Trailer coming soon</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className='w-screen overflow-x-hidden'>
      <iframe 
        className='overflow-x-hidden w-screen aspect-video' 
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&start=10&end=40&playlist=${trailerVideo.key}`}
        title="Movie Trailer"
        style={{ border: 'none' }}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  )
}

export default VideoBackground;