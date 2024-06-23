"use client";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CardList from "../card/CardList";


const TabSubTitle = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const res = await fetch('/api/subtitle/tabsdata', {method : "GET"});
      const data = await res.json();

      setData(data);
      setLoading(false);
    }

    getData();

  },[])


  return (
    <div className="">
      {loading && <p>Loading...</p>}
      {!loading && <Tabs id="custom-animation" value="Latest">
      <TabsHeader>
        {data.map(({ label }) => (
          <Tab
            key={label}
            value={label}
            activeClassName="bg-gray-500 rounded-md text-red-800"
            className="text-2xl font-semibold"
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, label }) => (
          <TabPanel key={label} value={label}>
            <CardList subtitles={value} type={label} />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>}
    </div>
  );
};

export default TabSubTitle;
