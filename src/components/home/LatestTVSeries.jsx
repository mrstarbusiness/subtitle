import MovieCardList from "../card/MovieCardList";

const LatestTVSeries = () => {
  return (
    <div className="p-4 mt-10">
      <h3 className="ml-2 text-2xl font-semibold ">Latest TV Series</h3>
      <MovieCardList type="tv-series" />
    </div>
  );
};

export default LatestTVSeries;
