const Banner = ({ imageUrl, title, description }) => (
  <div
    className="w-full h-60 bg-cover bg-center"
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl font-bold">{title}</h1>
      <p className="text-white text-sm font-semibold">{description}</p>
    </div>
  </div>
);

export default Banner;
