import { buildWatchmodeURL, WATCHMODE_API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTopRatedMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      // First, get a larger list of popular movies to filter by rating
      const listUrl = buildWatchmodeURL('/list-titles', {
        types: 'movie',
        sort_by: 'popularity_desc',
        limit: 50, // Get more movies to filter by rating
        regions: 'US'
      });
      
      const listResponse = await fetch(listUrl, WATCHMODE_API_OPTIONS);
      const listJson = await listResponse.json();
      
      if (listJson.titles && listJson.titles.length > 0) {
        // Get detailed information for each movie
        const movieDetailsPromises = listJson.titles.map(async (movie) => {
          try {
            const detailUrl = buildWatchmodeURL(`/title/${movie.id}/details`);
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
            console.error(`Error fetching details for movie ${movie.id}:`, error);
            return null;
          }
        });
        
        const movieDetails = await Promise.all(movieDetailsPromises);
        const validMovies = movieDetails
          .filter(movie => movie !== null && movie.vote_average > 0)
          .sort((a, b) => b.vote_average - a.vote_average) // Sort by rating descending
          .slice(0, 20); // Take top 20
        
        dispatch(addTopRatedMovies(validMovies));
      }
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      dispatch(addTopRatedMovies([]));
    }
  }

  useEffect(() => {
    if (!topRatedMovies) getTopRatedMovies();
  }, [])
}

export default useTopRatedMovies;