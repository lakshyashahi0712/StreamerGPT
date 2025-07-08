import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMG } from '../utils/constants.jsX';

const GptSearch = () => {
  return (
   <>
   <div className='fixed -z-10'>
    <img className='h-screen w-screen object-cover' src={BG_IMG} alt='LOGO'/>
    </div>
    <div className=''>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
    </>
  )
}
export default GptSearch;