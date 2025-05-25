import React, { useState, useEffect } from "react";

const HeaderWithPopup = ({ createGrid, accessToken }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSubreddit, setSelectedSubreddit] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showPopup && accessToken) {
      setLoading(true);
      setError("");
      
      console.log("Making request with token:", accessToken.substring(0, 10) + "...");
      
      fetch("https://oauth.reddit.com/subreddits/mine/subscriber", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "MyRedditApp/1.0 by YourActualRedditUsername", // Replace with your username
        },
      })
        .then((res) => {
          console.log("Response status:", res.status);
          console.log("Response headers:", res.headers);
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          
          return res.json();
        })
        .then((data) => {
          console.log("Full response:", data);
          
          if (data.data && data.data.children) {
            const names = data.data.children.map(
              (child) => child.data.display_name
            );
            console.log("Extracted subreddit names:", names);
            setSubreddits(names);
          } else {
            console.error("Unexpected response structure:", data);
            setError("Unexpected response from Reddit API");
          }
        })
        .catch((err) => {
          console.error("Error fetching subreddits:", err);
          setError(`Failed to fetch subreddits: ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [showPopup, accessToken]);

  const handleAdd = () => {
    if (selectedSubreddit) {
      createGrid(selectedSubreddit);
      setShowPopup(false);
      setSelectedSubreddit("");
    }
  };

  return (
    <>
      <div className="bg-black border-b-2 border-neutral-800 flex justify-between items-center h-full w-full px-8">
        <h1 className="text-xl font-semibold text-white">Reddit Legends</h1>
        <div className="flex gap-2">
          <button
            className="text-black bg-white px-3 py-1 rounded-lg"
            onClick={() => setShowPopup(true)}
          >
            + Subreddit
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Subreddit</h2>

            {loading && (
              <div className="text-center py-4">
                <p>Loading your subreddits...</p>
              </div>
            )}

            {error && (
              <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && (
              <select
                className="w-full border px-3 py-2 mb-4 rounded"
                value={selectedSubreddit}
                onChange={(e) => setSelectedSubreddit(e.target.value)}
              >
                <option value="" disabled>
                  {subreddits.length > 0 ? "Select a subreddit" : "No subreddits found"}
                </option>
                {subreddits.map((sub) => (
                  <option key={sub} value={sub}>
                    r/{sub}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => {
                  setShowPopup(false);
                  setError("");
                  setSelectedSubreddit("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                onClick={handleAdd}
                disabled={!selectedSubreddit || loading}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderWithPopup;