import React from 'react'
import { IMG_CDN_URL } from '../utils/constants.jsX'

const MovieCard = ({ posterPath }) => {
  return (
    <div className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px] rounded overflow-hidden">
      <img
        alt="movieCard"
        className="w-full h-auto object-cover rounded"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};


export default MovieCard