import React from 'react'
import { IMG_CDN_URL } from '../utils/constants.jsx'

const MovieCard = ({ posterPath }) => {
  if(!posterPath) return null;
  return (
    <div className="min-w-[130px] md:min-w-[150px] lg:min-w-[170px] rounded overflow-hidden">
      <img
        alt="movieCard"
        className="w-full h-auto object-cover rounded"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard