import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';



function Movie() {
const [movie,setMovie]= useState({});
const {id} = useParams();
const navigate = useNavigate();

useEffect (()=>{
  axios.get(`http://localhost:8000/api/movies/${id}`,{withCredentials: true})
  .then(res =>{
    setMovie(res.data);
  }).catch(err =>{
    console.log(err)
  })
},[])

const handleDelete = ()=>{
  axios.delete(`http://localhost:8000/api/movies/${movie._id}`,{withCredentials: true})
  .then(res =>{
    navigate('/')
  }).catch(err =>{
    console.log(err)
  })
}

  return (
    <div className="details">
      <Card sx={{ maxWidth: 500 }} className="boxDetails">
          <h1>{movie.title}</h1> 
          <br/>
        <h3>Genre: {movie.genre}</h3>
        <br/>
      <CardMedia
        component="img"
        height="300"
        image={movie.boxArt}
        alt="Image"
      />
      <CardContent>
        <h3>Rating: {movie.rating}</h3>
        <br/>
        <h3>Release Year: {movie.releaseYear}</h3>
        <br/>
        <h3>Is Kid Friendly: {movie.isKidFriendly ? <p>Yes</p>: <p>No </p>}</h3>
        <br/>
        <h3>Actors: {movie.actors}</h3>
      </CardContent>
      <CardActions>
      <Button variant="outlined" onClick={()=>handleDelete(movie._id)}>Delete</Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default Movie;