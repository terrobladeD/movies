
import './App.css';
import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4f870358b9a1d192e492353b7a28cd02&page=1";
// const IMAGES_API = "https://image.tmdb.org/t/p/w1280/";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=4f870358b9a1d192e492353b7a28cd02&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [canback, setCanback] = useState(false);

  useEffect(() => {
    getMovies(FEATURED_API);
  }, [])

  const getMovies = (API) => {
    fetch(API).then(res => res.json()).then(data => {
      setMovies(data.results);
    });
    setCanback(false);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
    setCanback(true);

  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const hangleOnClick = ()=>{
    getMovies(FEATURED_API);
  }

  const isDispalyBack = ()=>{
    if (!canback){
      return "canback"
    }
    else{
      return ""
    }
  }

  return (
    <>
      <header>
        <div className={['back',isDispalyBack()].join(' ')} onClick={hangleOnClick} >
        <button className='back_icon'>&lt;&nbsp;back</button></div>
        <form onSubmit={handleOnSubmit}>
          <input className='search' type="text" placeholder="Search..."
            value={searchTerm} onChange={handleOnChange}
          />
        </form>


      </header>
      <div className='movie-container'>

        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>);
}

export default App;
