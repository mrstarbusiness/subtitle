/* eslint-disable @next/next/no-img-element */
"use client";
import { slugify } from "@/utils/slugify";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";

const SearchCm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const fetchResults = debounce(async (query) => {
    if (query.length >= 2) {
      const response = await fetch(`/api/search?query=${query}`, {
        method: "GET",
      });

      const result = await response.json();
      setResults(result?.data);
    } else {
      setResults([]);
    }
  }, 700);

  useEffect(() => {
    fetchResults(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const hanldeClick = (item) => {
    setResults([]);
    setQuery("");
    router.push(`/bangla-subtitle/${item._id}-${slugify(item.title)}`)
  }

  return (
    <>
      <div className="w-[400px]">
        <ReactTyped
          strings={[
            "Search here ... Bangla Subtitle",
            "Search here ... Movie Title ",
            "Search here ... Relase Year ",
            "Search here ... Language ",
            "Search here ... Genres ",
          ]}
          typeSpeed={100}
          backSpeed={80}
          attr="placeholder"
          loop
        >
          <input
            type="text"
            placeholder="Search here ... "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="py-2 pl-10 pr-4  block w-full rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
          />
        </ReactTyped>
      </div>
      {results.length > 0 && (
        <ul className="absolute left-0 w-[400px] mt-2 bg-white border border-gray-300 duration-500 rounded shadow-lg ">
          {results.map((result, index) => {
            let x = 100;
            let duration = 1 + (index + 1) * 0.3;
            if ((index + 1) % 2) {
              x = -100;
            }

            let y = 100;
            return (
              <motion.li
                initial={{ y }}
                whileInView={{ y: 0, transition: { duration } }}
                key={result._id}
                onClick={() => hanldeClick(result)}
                className="p-2 flex items-center hover:bg-gray-200 cursor-pointer"
              >
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="w-12 h-12 object-cover mr-4 rounded"
                />
                <div>
                  <p className="font-semibold">{result.title} ({result.year})</p>
                  <p className="text-sm text-gray-600">
                    {result.genre} - {result.language}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchCm;
