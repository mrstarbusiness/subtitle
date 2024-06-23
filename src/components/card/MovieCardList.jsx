import { getConfigurationByType, getSubtitle } from "@/app/actionfrons";
import MarQueComponent from "../common/MarQueComponent";
import SeeMoreBtn from "../common/SeeMoreBtn";
import MovieCard from "./MovieCard";

const MovieCardList = async ({ type }) => {
  const { subtitles } = await getSubtitle(type, 12);

  const genres = await getConfigurationByType("GENRES");
  const genresList = genres?.configuration?.value
    ? genres?.configuration?.value.split(",")
    : [];

  return (
    <div className="relative bg-gray-100 p-8 rounded-lg shadow-lg">
      <MarQueComponent type={type} genres={genresList} />
      <div className="p-4 rounded-lg  grid grid-cols-3 gap-4">
        {subtitles &&
          subtitles.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
            />
          ))}
      </div>
      <div className="flex justify-center mt-8">
        <SeeMoreBtn  type={type}/>
      </div>
    </div>
  );
};

export default MovieCardList;
