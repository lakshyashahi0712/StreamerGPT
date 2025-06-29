import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomngMovies';
import Header from './Header'
import MainConatiner from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {


  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      <MainConatiner/>
      <SecondaryContainer/>
      {/* 

       MainConatiner
       - VideoBackgriund
       - VideoTitle
      SecondaryConatiner
       - MovieList*n
         - cards*n


       */}
    </div>
  )
}

export default Browse
