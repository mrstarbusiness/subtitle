import Link from "next/link";

const SeeMoreBtn = ({ type }) => {
  let link = "/all-subtitle";
  if (type == "Latest") {
    link = "/search?type=latest";
  } else if (type == "top-movies") {
    link = "/search?type=top-movies";
  } else if (type == "tv-series") {
    link = "/search?type=tv-series";
  } else if (type == "Most Downloded") {
    link = "/search?type=download";
  } else if (type == "Most Popular" || type == "top-subttile") {
    link = "/search?type=popular";
  }
  
  return (
    <Link
      href={link}
      target="_blank"
      className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none"
    >
      See More
    </Link>
  );
};

export default SeeMoreBtn;
