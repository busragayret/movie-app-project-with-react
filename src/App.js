import './App.css';
import React from 'react';
import NavBar from './layouts/Navbar';
import About from './components/about';
import SearchBar from './components/searchbar/searchbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import MovieDetail from './components/moviedetail';
import Login from './components/login';
import { useSelector } from 'react-redux';
import Profile from './components/profile';
import FilterMovie from './components/filtermovies';


function App() {

  const login = useSelector((state) => state.login);

  return (
    <>
      <NavBar />
      {
        login ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/moviedetail/:id" element={<MovieDetail />} />
            <Route path="/filter-movies/:category" element={<FilterMovie />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
      }
    </>
  );
}

export default App;
