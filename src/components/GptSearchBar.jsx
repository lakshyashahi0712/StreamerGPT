import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getGeminiResponse } from '../utils/gemini';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch()

//search movie in tmdb
  const searchMovieTMDB = async(movie) =>{

    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1" , API_OPTIONS);
    const json = await data.json()

    return json.results;
  }
  const handleGptSearchClick = async () => {
  const gptquery = "Act as a movie recommendation system and suggest some movies for the query " 
    + searchText.current.value 
    + ". Only give me names of 5 movies comma separated. Example: Gadar, Don, Sholay, Golmaal, Koi Mil Gaya";

  const prompt = gptquery;
  console.log("User Prompt:", prompt);

  let attempts = 0;
  const maxAttempts = 3;
  let delay = 2000; // start with 2s

  try {
    let geminiAnswer;

    // Retry logic for 503
    while (attempts < maxAttempts) {
      try {
        geminiAnswer = await getGeminiResponse(prompt);
        break; // success, break retry loop
      } catch (err) {
        if (err.message.includes("503") && attempts < maxAttempts - 1) {
          console.warn(`Gemini 503 error. Retrying in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          attempts++;
          delay *= 2; // exponential backoff
        } else {
          throw err;
        }
      }
    }

    console.log("Gemini Response:", geminiAnswer);
    const gptMovies = geminiAnswer.split(",").map(name => name.trim());

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);
    dispatch(addGptMovieResult({
      movieNames: gptMovies,
      movieResults: tmdbResults
    }));
  } catch (err) {
    console.error("Error calling Gemini or TMDB:", err);
    alert("AI is currently overloaded or failed. Please try again later.");
  }
};


  return (
    <div className='pt-[35%]  md:pt-[11%] flex justify-center'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          className='p-4 m-4 bg-white col-span-9'
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className='col-span-3 py-2 m-4 px-4 bg-red-700 text-white rounded-lg'
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
