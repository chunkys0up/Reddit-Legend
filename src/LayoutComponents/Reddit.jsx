import React, { useState, useEffect } from "react";

const DisplaySubreddit = ({ subreddit, token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subreddit || !token) return;

    let isMounted = true; // to avoid state update if unmounted
    const fetchPosts = () => {
      setLoading(true);
      setError(null);

      fetch(`https://oauth.reddit.com/${subreddit}/hot?limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "MyRedditApp/0.1 by YOUR_USERNAME",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (!isMounted) return; // prevent setting state if unmounted
          if (data && data.data && Array.isArray(data.data.children)) {
            setPosts(data.data.children);
          } else {
            setPosts([]);
            setError("No posts found.");
          }
        })
        .catch((err) => {
          if (!isMounted) return;
          setError(err.message);
          setPosts([]);
        })
        .finally(() => {
          if (!isMounted) return;
          setLoading(false);
        });
    };

    fetchPosts(); // initial fetch immediately

    const intervalId = setInterval(fetchPosts, 30000); // every 30 seconds

    return () => {
      isMounted = false; // cleanup flag
      clearInterval(intervalId); // clear timer on unmount
    };
  }, [subreddit, token]);

  return (
    <div className="flex flex-col flex-auto h-full m-2">
      <div className="text-black font-semibold mb-2 text-lg">{subreddit}</div>

      <div className="flex flex-col flex-auto space-y-2 overflow-y-auto pb-4">
        {loading && <div className="text-white">Loading posts...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && posts.length === 0 && (
          <div className="text-white">No posts to display.</div>
        )}

        {!loading &&
          !error &&
          posts.map(({ data: postData }) => (
            <div
              key={postData.id}
              className="bg-zinc-900 text-white items-center border-2 flex rounded-sm"
            >
              <div className="m-1 w-16 h-16 bg-gray-300 rounded-sm flex items-center justify-center overflow-hidden">
                {postData.thumbnail && postData.thumbnail.startsWith("http") ? (
                  <img
                    src={postData.thumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-700 text-xs">No Img</span>
                )}
              </div>

              <div className="flex flex-col p-2">
                <div className="font-semibold">{postData.title}</div>
                <div className="text-sm text-gray-400">
                  by {postData.author}
                </div>
                <div className="text-sm text-yellow-400 font-bold">
                  ▲ {postData.ups} Upvotes
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplaySubreddit;
