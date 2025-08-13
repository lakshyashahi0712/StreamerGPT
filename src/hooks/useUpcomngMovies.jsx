import { buildWatchmodeURL, WATCHMODE_API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUpcomingMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(store => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const url = buildWatchmodeURL('/releases', {
        limit: 50
      });
      
      const data = await fetch(url, WATCHMODE_API_OPTIONS);
      const json = await data.json();
      
      if (json.releases) {
        const movieReleases = json.releases
          .filter(release => release.type === 'movie')
          .slice(0, 20) // Limit to 20 movies
          .map(movie => ({
            id: movie.id,
            title: movie.title,
            overview: `Upcoming release on ${movie.source_name}`,
            poster_path: movie.poster_url ? movie.poster_url.replace('https://cdn.watchmode.com', '') : null,
            backdrop_path: null,
            release_date: movie.source_release_date,
            vote_average: 0,
            adult: false,
            original_language: 'en',
            original_title: movie.title,
            popularity: 0,
            video: false,
            vote_count: 0
          }));
        
        dispatch(addUpcomingMovies(movieReleases));
      }
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      dispatch(addUpcomingMovies([]));
    }
  }

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
  }, [])
}

export default useUpcomingMovies;