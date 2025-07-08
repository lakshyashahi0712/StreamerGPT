import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMG } from '../utils/constants.jsX';

const GptSearch = () => {
  return (
    <div>
<div className='fixed -z-10'>
    <img src={BG_IMG} alt="BGIMG" />
</div>


        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}
export default GptSearch;