import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
 

  const [movies, setmovies] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
  const [retrycount,setretrycount] = useState(0);
  const [cancel,setCancel] = useState(false);
 

  async function fetchMoviesHandler() {
    setisloading(true);
    seterror(null);

    const maxRetries = 3;
    const retryInterval = 5000;
   
    try {
      const response = await fetch("https://swapi.dev/api/film/");
  
 

      if (!response.ok) {
        throw new Error("Something went Wrong .....Retrying");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((moviedata) => {
        return {
          id: moviedata.episode_id,
          title: moviedata.title,
          openingText: moviedata.opening_crawl,
          releaseDate: moviedata.release_date,
        };
      });
      setmovies(transformedMovies);
    
    } catch (error) {
      seterror(error.message);
      if(retrycount < maxRetries){
        setretrycount(retrycount+1);
        setTimeout(fetchMoviesHandler, retryInterval);
          
       
      }else{
        seterror(new Error('Api request failed after multiple requests'));
      }
    }

    setisloading(false);
  }

  const handleCancel = ()=>{
    setCancel(true);
  }



  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && !error && <p>found not movies</p>}
        {!isloading && error && <p>{error}</p>}
        <button onClick={handleCancel}>Cancel</button>
        {isloading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
