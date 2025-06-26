import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainConatiner from './MainContainer';


const Browse = () => {


  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainConatiner/>
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
