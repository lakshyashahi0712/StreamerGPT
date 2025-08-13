import React, { useState } from 'react'
import { WATCHMODE_IMG_BASE_URL } from '../utils/constants';
import { FaPlay } from 'react-icons/fa';

const MovieCard = ({ posterPath, movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  
  if (!posterPath) return null;
  
  // Handle both full URLs and relative paths
  const imageUrl = posterPath.startsWith('http') 
    ? posterPath 
    : WATCHMODE_IMG_BASE_URL + posterPath;

  // Extract YouTube video ID from trailer URL if available
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const trailerVideoId = movie?.trailer ? getYouTubeId(movie.trailer) : null;
  
  return (
    <div className="min-w-[130px] md:min-w-[150px] lg:min-w-[170px] rounded overflow-hidden relative group">
      {showTrailer && trailerVideoId ? (
        <div className="relative">
          <iframe
            className="w-full aspect-[2/3] rounded"
            src={`https://www.youtube.com/embed/${trailerVideoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
            title="Movie Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full text-xs hover:bg-black/90"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            alt="movieCard"
            className="w-full h-auto object-cover rounded transition-transform group-hover:scale-105"
            src={imageUrl}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
            }}
          />
          {trailerVideoId && (
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <FaPlay className="text-white text-2xl" />
            </button>
          )}
          {movie?.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-medium truncate">{movie.title}</p>
              {movie?.vote_average > 0 && (
                <p className="text-yellow-400 text-xs">★ {movie.vote_average.toFixed(1)}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCard;