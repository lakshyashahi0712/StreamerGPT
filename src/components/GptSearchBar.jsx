import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getGeminiResponse } from '../utils/gemini';
import { buildWatchmodeURL, WATCHMODE_API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch()

  // Search movie in Watchmode
  const searchMovieWatchmode = async (movie) => {
    try {
      const searchUrl = buildWatchmodeURL('/search', {
        search_field: 'name',
        search_value: movie,
        types: 'movie'
      });
      
      const searchResponse = await fetch(searchUrl, WATCHMODE_API_OPTIONS);
      const searchJson = await searchResponse.json();
      
      if (searchJson.title_results && searchJson.title_results.length > 0) {
        // Get detailed information for the first few search results
        const movieDetailsPromises = searchJson.title_results.slice(0, 3).map(async (searchResult) => {
          try {
            const detailUrl = buildWatchmodeURL(`/title/${searchResult.id}/details`);
            const detailResponse = await fetch(detailUrl, WATCHMODE_API_OPTIONS);
            const detailData = await detailResponse.json();
            
            return {
              id: detailData.id,
              title: detailData.title,
              overview: detailData.plot_overview || "No overview available",
              poster_path: detailData.poster ? detailData.poster.replace('https://cdn.watchmode.com', '') : null,
              backdrop_path: detailData.backdrop ? detailData.backdrop.replace('https://cdn.watchmode.com', '') : null,
              release_date: detailData.release_date || detailData.year?.toString(),
              vote_average: detailData.user_rating || 0,
              adult: false,
              original_language: detailData.original_language || 'en',
              original_title: detailData.original_title || detailData.title,
              popularity: detailData.relevance_percentile || 0,
              video: false,
              vote_count: 0,
              trailer: detailData.trailer || null
            };
          } catch (error) {
            console.error(`Error fetching details for movie ${searchResult.id}:`, error);
            return null;
          }
        });
        
        const movieDetails = await Promise.all(movieDetailsPromises);
        return movieDetails.filter(movie => movie !== null);
      }
      return [];
    } catch (error) {
      console.error('Error searching movie:', error);
      return [];
    }
  }

  const handleGptSearchClick = async () => {
    const gptquery = "Act as a movie recommendation system and suggest some movies for the query " 
      + searchText.current.value 
      + ". Only give me names of 5 movies comma separated. Example: Gadar, Don, Sholay, Golmaal, Koi Mil Gaya";

    const prompt = gptquery;
    console.log("User Prompt:", prompt);

    let attempts = 0;
    const maxAttempts = 3;
    let delay = 2000;

    try {
      let geminiAnswer;

      while (attempts < maxAttempts) {
        try {
          geminiAnswer = await getGeminiResponse(prompt);
          break;
        } catch (err) {
          if (err.message.includes("503") && attempts < maxAttempts - 1) {
            console.warn(`Gemini 503 error. Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
            attempts++;
            delay *= 2;
          } else {
            throw err;
          }
        }
      }

      console.log("Gemini Response:", geminiAnswer);
      const gptMovies = geminiAnswer.split(",").map(name => name.trim());

      const promiseArray = gptMovies.map((movie) => searchMovieWatchmode(movie));
      const watchmodeResults = await Promise.all(promiseArray);

      console.log(watchmodeResults);
      dispatch(addGptMovieResult({
        movieNames: gptMovies,
        movieResults: watchmodeResults
      }));
    } catch (err) {
      console.error("Error calling Gemini or Watchmode:", err);
      alert("AI is currently overloaded or failed. Please try again later.");
    }
  };

  return (
    <div className='pt-[35%] md:pt-[11%] flex justify-center'>
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