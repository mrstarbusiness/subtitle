"use client";
import { useEffect, useState } from "react";
import PersonCard from "../card/PersonCard";

const users = [
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    followers: 1234,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    followers: 1234,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    followers: 1234,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    followers: 1234,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    followers: 1234,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    followers: 1234,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    followers: 1234,
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    followers: 5678,
  },
];
const InfiniteListContributor = ({ type }) => {
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

      <div className="grid grid-cols-5 gap-2">
        {users.map((user, index) => (
          <PersonCard
            key={index}
            imageUrl={user.imageUrl}
            name={user.name}
            email={user.email}
            followers={user.followers}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteListContributor;
