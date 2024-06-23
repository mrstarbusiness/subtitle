/* eslint-disable @next/next/no-img-element */
// components/MovieCard.js

import { slugify } from "@/utils/slugify";
import Link from "next/link";

const MovieCard = ({ movie }) => {
  return (
    <Link
      href={`/bangla-subtitle/${movie?.id}-${slugify(movie?.title)}`}
      target="_blank"
    >
      <div className="max-w-xs cursor-pointer border-2 hover:border-gray-300 shadow-lg rounded-lg overflow-hidden hover:scale-[1.02] duration-500">
        <div className="relative">
          <img className="w-full h-72 object-cover" src={movie?.thumbnail} alt={movie?.title} />
          <div className="absolute top-2 right-0 bg-pink-500 text-white px-2 py-1 text-sm">
            {movie?.year}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{movie?.title} </h3>
          <p className="text-gray-500">{movie?.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
