/* eslint-disable @next/next/no-img-element */
"use client";
import SearchSubtitleMechanism from "@/components/upload/SearchSubtitleMechanism";
import UploadForm from "@/components/upload/UploadForm";
import { useState } from "react";

const ReleasePage = () => {
  const [searchData, setSearchData] = useState(null);
 
  return (
    <div className="ml-8 w-full">
      <div className="flex justify-between gap-12 rounded-md bg-gray-100 p-8">
        <div className="w-1/2 flex justify-center ml-8">
          <div>
            {searchData ? <h3 className="text-2xl font-bold p-2 mb-4 "> Found this movie </h3>  :  <h3 className="text-2xl font-bold p-2 mb-4 ">Search Subtitle</h3>}
            {searchData ? (
              <>
                <img
                  src={searchData?.Poster}
                  alt="Release Image"
                  className="w-full h-80 object-cover mb-4 rounded-md"
                />
                <h2 className="text-2xl font-bold mb-2">More Information</h2>
                <div className="grid grid-cols-2 gap-3">
                  <p className="text-sm font-semibold">
                    Title : {searchData?.Title} 
                  </p>
                  <p className="text-sm font-semibold">
                    Year : {searchData?.Year}
                  </p>
                  <p className="text-sm font-semibold">
                    Box Office : {searchData?.BoxOffice}
                  </p>
                  <p className="text-sm font-semibold">
                    Imdb Rating : {searchData?.imdbRating}
                  </p>
                  <p className="text-sm font-semibold">
                    Awards : {searchData?.Awards}
                  </p>
                  
                  <p className="text-sm font-semibold">
                    Genre : {searchData?.Genre}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-sm font-semibold">{searchData?.Plot}</p>
                </div>
              </>
            ) : (
              <SearchSubtitleMechanism setSearchData={setSearchData} />
            )}
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center p-8">
          {searchData && <UploadForm basicData={{title: searchData?.Title, year: searchData?.Year, genre: searchData?.Genre, language : searchData?.Language, thumbnail: searchData?.Poster}} />}
        </div>
      </div>
    </div>
  );
};

export default ReleasePage;
