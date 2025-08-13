import { buildWatchmodeURL, WATCHMODE_API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(store => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      // First, get the list of movie IDs
      const listUrl = buildWatchmodeURL('/list-titles', {
        types: 'movie',
        sort_by: 'popularity_desc',
        limit: 20, // Reduced limit since we need to fetch details for each
        regions: 'US'
      });
      
      const listResponse = await fetch(listUrl, WATCHMODE_API_OPTIONS);
      const listJson = await listResponse.json();
      
      if (listJson.titles && listJson.titles.length > 0) {
        // Get detailed information for each movie (limit to first 20 for performance)
        const movieDetailsPromises = listJson.titles.slice(0, 20).map(async (movie) => {
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
              popularity: detailData.popularity_percentile || 0,
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
        const validMovies = movieDetails.filter(movie => movie !== null);
        
        dispatch(addPopularMovies(validMovies));
      }
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      dispatch(addPopularMovies([]));
    }
  }

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
  }, [])
}

export default usePopularMovies;