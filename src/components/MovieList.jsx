import React, { useRef } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import MovieCard from './MovieCard';
import { FaChevronRight } from "react-icons/fa";



const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scrollAmount = 300; // pixels to move per click

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) {
    return <p className="text-white">Loading movies...</p>;
  }

  return (
    <div className="px-6 bg-transparent relative">
      <h1 className="text-4xl font-semibold py-4 text-white">{title}</h1>

      <div className="relative">
        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="w-full flex overflow-x-auto scroll-smooth space-x-4 no-scrollbar pb-4"
        >
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path || ""}
            />
          ))}
        </div>

        {/* Left Button */}
        <button
          onClick={handleScrollLeft}
          className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-0 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>

        {/* Right Button */}
        <button
          onClick={handleScrollRight}
          className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
