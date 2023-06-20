import React from 'react';

import classes from './Movie.module.css';


const Movie = (props) => {

  async function deletemovie (id) {
    console.log('so id is',id)
   const response = await fetch(`https://react-http-5e9cc-default-rtdb.firebaseio.com/movies/${id}.json`,{
      method: 'DELETE'
    }).then((result)=>{
      result.json().then((resp)=>{
        console.log(resp)
      })
    })
  }
     
  
return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      
      
      <button onClick={()=>deletemovie(props.id)}>Delete Movie</button>
    </li>
  );
};

export default Movie;
