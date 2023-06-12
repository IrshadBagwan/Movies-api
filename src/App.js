import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies,setmovies] = useState([]);
  const [isloading,setisloading] = useState(false);

  async function fetchMoviesHandler (){
    setisloading(true);
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
     
    const transformedMovies = data.results.map(moviedata =>{
        return {
          id:moviedata.episode_id,
          title:moviedata.title,
          openingText: moviedata.opening_crawl,
          releaseDate:moviedata.release_date
        };
      });
      setmovies(transformedMovies)
      setisloading(false);
    
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length>0 && <MoviesList movies={movies} />}
        {!isloading && movies.length===0 && <p>found not movies</p>}
        {isloading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
