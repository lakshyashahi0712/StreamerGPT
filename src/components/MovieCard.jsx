import React from 'react'
import { IMG_CDN_URL } from '../utils/constants.jsX'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48'>
      <img alt='movieCard'
      src={IMG_CDN_URL+ posterPath } />
    </div>
  )
}

export default MovieCard