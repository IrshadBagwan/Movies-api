import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
 

  const [movies, setmovies] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
  const [retrycount,setretrycount] = useState(0);
  const [cancel,setCancel] = useState(false);



   const fetchMoviesHandler= useCallback(async ()=> {
    setisloading(true);
    seterror(null);

    const maxRetries = 3;
    const retryInterval = 5000;
   
    try {
      const response = await fetch("https://react-http-5e9cc-default-rtdb.firebaseio.com/movies.json");
  
 

      if (!response.ok) {
        throw new Error("Something went Wrong .....Retrying");
      }

      const data = await response.json();
      console.log(data)

      const loadedmovies = [];

      for(const key in data) {
        loadedmovies.push({
          id: key,
          title:data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,

        });
      }

     
      setmovies(loadedmovies);
    
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
  },[]);

  const handleCancel = ()=>{
    setCancel(true);
  }


  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler])
 
  async function addMovieHandler(movie){
  const response = await fetch('https://react-http-5e9cc-default-rtdb.firebaseio.com/movies.json',{
     method: 'POST',
     body: JSON.stringify(movie),
     headers:{
       'Content-Type':'application/json'
     }
   });
   const data = await response.json();
   console.log(data);
    
  }
  

  return (
    <React.Fragment>
      <section>
        {/* <button onClick={fetchMoviesHandler}>Fetch Movies</button> */}
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && !error && <p>found not movies</p>}
        {!isloading && error && <p>{error}</p>}
        
        {isloading && <p>Loading....</p>}
        <button onClick={handleCancel}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
