"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSingle from "../card/CardSingle";

const InfiniteList = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getSubtitles = async (page, limit = 20) => {
    const response = await fetch(
      `/api/subtitle/infinity?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();

    console.log(result);
    setData([...data, ...result?.subtitles]);
    setCurrentPage(result?.currentPage);
    if (result?.currentPage < result?.totalPages) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getSubtitles(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = () => {
    console.log('come her');
    if (hasMore) {
      let newPage = currentPage + 1;
      setCurrentPage(newPage);
      getSubtitles(newPage);
    }
  };

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}>Loading...</p>}
        endMessage={""}
      >
        {data.length > 0 &&
          data.map((item, index) => {
            let duration = .7;
            let y = 100;

            return (
              <motion.div initial={{y}} whileInView={{y: 0, transition : {duration }}} key={index}>
                <CardSingle  data={item} />
              </motion.div>
            )
          })}
        {data?.length == 0 && <li>No Record Found</li>}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteList;
