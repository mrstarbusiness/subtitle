// components/TopContributorCard.js

import Link from "next/link";

const TopContributor = ({ image, name, subs, id }) => {
  return (
    <div className="flex hover:border-gray-300 border-2 hover:scale-[1.02] duration-500 items-center bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto">
      <img
        className="w-16 h-16 rounded-full object-cover mr-4"
        src={image ?? 'https://i.pngimg.me/thumb/f/720/m2H7K9A0b1d3b1m2.jpg'}
        alt={name}
      />
      <div className="flex-1">
        <h2 className="text-md font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">Total Subs: {subs ? subs.length : 3}</p>
      </div>
      <Link href={`/all-contributor/${id}`} className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-1 px-3 rounded-full font-semibold">
        Detail
      </Link>
    </div>
  );
};

export default TopContributor;
