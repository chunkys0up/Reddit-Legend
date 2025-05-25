import { useState, useEffect } from "react";
import LoginPage from "../RedditAuth/LoginPage";
import MyResponsiveGrid from "./MyResponsiveGrid";

function MainPage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("reddit_access_token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogin = () => {
    const CLIENT_ID = "YOUR_CLIENT_ID_KEY";
    const REDIRECT_URI = "http://localhost:5173/auth/callback";
    const SCOPES = "identity read mysubreddits";
    const DURATION = "temporary";
    const STATE = "random_state_123";

    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=token&state=${STATE}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&duration=${DURATION}&scope=${encodeURIComponent(SCOPES)}`;

    window.location.href = redditAuthUrl;
  };

  return token ? (
    <MyResponsiveGrid token={token} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default MainPage;
