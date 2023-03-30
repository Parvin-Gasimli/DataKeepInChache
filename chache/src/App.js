import * as React from "react";

export default function App() {
  const [cacheData, setCacheData] = React.useState();
  // Function to add our give data into cache
  const addDataIntoCache = (cacheName, url, response) => {
    const data = new Response(JSON.stringify(response));

    if ("caches" in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
        alert("Data Added into cache!");
      });
    }
  };

  const getAllCacheData = async () => {
    var url = "https://localhost:300";

    // List of all caches present in browser
    var names = await caches.keys();

    var cacheDataArray = [];

    // Iterating over the list of caches
    names.forEach(async (name) => {
      // Opening that particular cache
      const cacheStorage = await caches.open(name);

      const cachedResponse = await cacheStorage.match(url);
      var data = await cachedResponse.json();

      cacheDataArray.push(data);
      setCacheData(cacheDataArray.join(", "));
    });
  };
  const DataChache = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div style={{ height: 500, width: "80%" }}>
      <h4>Set Data Into the Chache</h4>
      <button
        onClick={() =>
          addDataIntoCache("MyCache", "https://localhost:300", DataChache)
        }
      >
        Add Data Into Cache
      </button>
      <h2>GET DATA IN CHACHE</h2>
      <button onClick={() => getAllCacheData()}>Get All Cache Data</button>{" "}
      <br />
      <h6>All Cache Data is: {cacheData}</h6>
    </div>
  );
}
