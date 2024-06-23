import MovieCardList from "../card/MovieCardList";

const TopMovies = () => {
  return (
    <div className="p-4">
      <h3 className="ml-2 text-2xl font-semibold ">Top Movies</h3>
      <MovieCardList type="top-movies" />
    </div>
  );
};

export default TopMovies;
