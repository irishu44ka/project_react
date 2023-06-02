import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { MoviePage } from "./components/MoviePage";
import { PopularMoviesPage } from "./components/PopularMovies";
import { SearchPage } from "./components/Search";
import { Discover } from "./components/Discover";
import { Header } from "./components/Header";
import { ConfigProvider, theme, Button } from "antd";
import { DiscoverByGenre } from "./components/DiscoverByGenre";

const { defaultAlgorithm, darkAlgorithm } = theme;

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <Router>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <div className={`app ${isDarkMode ? "dark-theme" : "light-theme"}`}>
          <Header />
          <div className="links">
            <Link to={`/discover`} className="link">
              Discover by categories
            </Link>
            <Link to={`/popular`} className="link">
              Most popular
            </Link>
          </div>

          <div className="theme-toggler">
            <Button onClick={handleClick}>
              Change Theme to {isDarkMode ? "Light" : "Dark"}
            </Button>
          </div>
          <Routes>
            <Route path="/" Component={SearchPage} />
            <Route path="/popular" Component={PopularMoviesPage} />
            <Route path="/movie/:id" Component={MoviePage} />
            <Route path="/discover" Component={Discover} />
            <Route path="/discover/:id" Component={DiscoverByGenre} />
          </Routes>
        </div>
      </ConfigProvider>
    </Router>
  );
};

export default App;
