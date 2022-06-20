import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";


function MovieList(props) {
  const {isLoggedIn,setIsLoggedIn}= props;
  const[movies,setMovies] = useState([]);
  
  const renderContent=()=>{
    console.log(isLoggedIn);
    switch(isLoggedIn){
        case true:
            return displayLoggedInContent();
        default:
            return;
    }
}

const displayLoggedInContent= ()=>{
  return (
    <div className="outerBox">
      {movies.map ((movie)=>(
        <div key={movie._id} className="flexing" > 
        <Card sx={{ maxWidth:500}} className="box">
      <CardMedia
        component="img"
        height="210"
        image={movie.boxArt}
        alt="Movie Image"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/movie/${movie._id}`}>Details</Link>
          </Button>
        <Button size="small">
        <Link to={`/movie/edit/${movie._id}`}>Update</Link>
        </Button>
      </CardActions>
    </Card>
        </div>
  ))}
    </div>
  )
}



  useEffect(()=>{
    axios.get("http://localhost:8000/api/movies")
    .then((res)=>{
      setMovies(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[]);

  return (
    <div>
      {renderContent()}
    </div>
  )
}

export default MovieList;