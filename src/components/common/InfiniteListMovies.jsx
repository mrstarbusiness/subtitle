"use client";
import { useEffect, useState } from "react";
import MovieCard from "../card/MovieCard";

const movies = [
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2023",
    name: "Movie Title 1",
    type: "Action",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2022",
    name: "Movie Title 2",
    type: "Drama",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2021",
    name: "Movie Title 3",
    type: "Comedy",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2023",
    name: "Movie Title 1",
    type: "Action",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2022",
    name: "Movie Title 2",
    type: "Drama",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2021",
    name: "Movie Title 3",
    type: "Comedy",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2023",
    name: "Movie Title 1",
    type: "Action",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2022",
    name: "Movie Title 2",
    type: "Drama",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2021",
    name: "Movie Title 3",
    type: "Comedy",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2023",
    name: "Movie Title 1",
    type: "Action",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2022",
    name: "Movie Title 2",
    type: "Drama",
  },
  {
    imageUrl: "https://via.placeholder.com/150x300",
    year: "2021",
    name: "Movie Title 3",
    type: "Comedy",
  },
];

const InfiniteListMovies = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [allFilter, setAllFilter] = useState("active");

  const limit = 10;
  const getNotifications = (offsetData = 1, filter = true) => {
    if (offsetData == 1) {
      setLoading(true);
    }

    let url = `/notifications?limit=${limit}&page=${offsetData}`;
    if (!filter) {
      url = url + `&unread_only=true`;
    }

    authAxios
      .get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        let cloneData = offsetData > 1 ? [...data] : [];
        setData([...cloneData, ...res?.data?.data]);
        setLoading(false);

        if (res?.data?.meta?.current_page == res?.data?.meta?.last_page) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // getNotifications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = () => {
    if (hasMore) {
      let newOffset = offset + 1;
      setOffset(newOffset);
      getNotifications(newOffset, true);
    }
  };
  return (
    <div className="">
      {/* <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}>Loading...</p>}
        endMessage={""}
      >
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => _handleNotification(url, item)}
              ></li>
            );
          })}
        {data?.length == 0 && <li>No Record Found</li>}
      </InfiniteScroll> */}

      <div className="p-4 bg-white rounded-lg shadow-md grid grid-cols-3 gap-4">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            imageUrl={movie.imageUrl}
            year={movie.year}
            name={movie.name}
            type={movie.type}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteListMovies;
