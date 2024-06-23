/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { GiDuration } from "react-icons/gi";
import { IoTimerOutline } from "react-icons/io5";

const SearchSubtitleMechanism = ({ setSearchData }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchListData, setSearchListData] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getSearchList = async (pageNumber = 1) => {
    setError(null);
    setLoading(true);
    const query = formData?.query;
    try {
      const res = await fetch(
        `/api/subtitle/searchlist?query=${query}&page=${pageNumber}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data?.Error) {
        setError(data?.Error);
      } else {

        if(pageNumber == 1) {
          setSearchListData([...data.Search]);
        }else {
          setSearchListData([...searchListData, ...data?.Search]);
        }
        
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMovie = async (title) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/subtitle/search?title=${title}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data?.Error) {
        setError(data?.Error);
      } else {
        setSearchData(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMoreData = () => {
    getSearchList(page + 1);
    setPage((prev) => prev + 1);
  }

  const handleSearch = () => {
    setSearchListData([]);
    getSearchList(1);
  }

  return (
    <div className="w-full flex flex-col  gap-1">
      {error && <p className="text-red-500"> {error}</p>}
      {loading && <p>Loading...</p>}
      <label htmlFor="">Title of Movie, TV Series, Documentery</label>
      <div className="flex  gap-2 items-center ">
        <input
          type="text"
          name="query"
          onChange={handleChange}
          placeholder="Type Here..."
          className="min-w-[400px] px-2 py-2 border-2 border-gray-500 rounded-md"
        />
        <div className="flex justify-end mt-1 mr-2">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-3 py-2 bg-gray-900 text-white rounded-md cursor-pointer hover:bg-opacity-70 "
          >
            Search
          </button>
        </div>
      </div>

      {searchListData && searchListData.length > 0 &&  (
        <div className="flex flex-col gap-2">
          {searchListData &&
            searchListData.map((data, index) => {
              return (
                <div
                  disabled={loading}
                  onClick={() => getMovie(data.Title)}
                  key={index}
                  className="flex hover:scale-[1.02] hover:border-gray-300 border-2 duration-500 cursor-pointer items-center bg-white shadow-lg rounded-lg overflow-hidden h-24 mb-4"
                >
                  <div className="h-full w-24 flex-shrink-0">
                    <img
                      src={data?.Poster}
                      alt={data?.Title}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow px-4 ">
                    <div>
                      <h2 className="text-md font-semibold text-gray-800 -mt-2">
                        {data?.Title}
                      </h2>
                      <div className="flex gap-3 text-sm mt-2">
                        <div className="flex gap-2 items-center font-semibold bg-gray-300 px-2 py-1 rounded-md">
                          <IoTimerOutline /> <span>{data.Year}</span>{" "}
                        </div>
                        <div className="flex gap-2 items-center font-semibold bg-gray-300 px-2 py-1 rounded-md">
                          <GiDuration /> <span>{data?.Type}</span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="flex justify-center m-2">
            {loading && <p>Loading...</p>}
            <button disabled={loading} onClick={handleMoreData} className="bg-orange-600 px-2 py-1 rounded-md text-white">
              More Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSubtitleMechanism;
