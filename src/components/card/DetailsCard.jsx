
const DetailsCard = () => {
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Left side: Movie Image */}
        <div className="w-1/2">
          <img src="https://via.placeholder.com/400x400" alt="Movie Poster" className="w-full h-full object-cover"/>
        </div>

        {/* Right side: Movie Details */}
        <div className="w-1/2 p-6">
          <h2 className="text-3xl font-semibold mb-4">Movie Title</h2>
          <div className="mb-4">
            <span className="text-yellow-500 font-semibold">Rating:</span>
            <span className="ml-2">8.5/10</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Year:</span>
            <span className="ml-2">2023</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Type:</span>
            <span className="ml-2">Action, Adventure</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Categories:</span>
            <span className="ml-2">Thriller, Sci-Fi</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
