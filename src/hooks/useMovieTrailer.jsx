import { useDispatch, useSelector } from "react-redux";
import { buildWatchmodeURL, WATCHMODE_API_OPTIONS } from '../utils/constants'
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector(store => store.movies.trailerVideo);

  const getMovieTrailer = async () => {
    try {
      // Get movie details from Watchmode
      const detailsUrl = buildWatchmodeURL(`/title/${movieId}/details`);
      const detailsData = await fetch(detailsUrl, WATCHMODE_API_OPTIONS);
      const detailsJson = await detailsData.json();
      
      // Watchmode provides trailer URLs in the details response
      if (detailsJson.trailer) {
        // Extract YouTube video ID from the trailer URL
        const youtubeUrl = detailsJson.trailer;
        let videoId = null;
        
        // Extract video ID from various YouTube URL formats
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = youtubeUrl.match(regExp);
        
        if (match && match[2].length === 11) {
          videoId = match[2];
        }
        
        if (videoId) {
          const trailer = {
            key: videoId,
            name: `${detailsJson.title} Trailer`,
            site: "YouTube",
            type: "Trailer",
            official: true
          };
          
          dispatch(addTrailerVideo(trailer));
        } else {
          dispatch(addTrailerVideo(null));
        }
      } else {
        dispatch(addTrailerVideo(null));
      }
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
      dispatch(addTrailerVideo(null));
    }
  }

  useEffect(() => {
    if (!trailerVideo && movieId) getMovieTrailer();
  }, [movieId]);
}

export default useMovieTrailer;