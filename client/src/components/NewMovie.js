import React from 'react'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function NewMovie() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [boxArt, setBoxArt] = useState('');
  const [rating, setRating] = useState('');
  const [actors, setActors] = useState([]);
  const [isKidFriendly, setIsKidFriendly] = useState(false);
  const [releaseYear, setReleaseYear] = useState('');
  const [errors, setErrors] = useState({})

const navigate= useNavigate();
const submitHandler = (e) =>{
  e.preventDefault();
  axios.post('http://localhost:8000/api/movies',
  {title,genre,boxArt,rating,actors,isKidFriendly,releaseYear})
    .then(res =>{
      navigate('/')
    }).catch(err =>{
      console.log(err.response.data)
      setErrors(err.response.data.error.errors)
    })
}

  return (
  
    <div className="details">
    <Card sx={{ maxWidth:450}} className="boxDetails" >
      <form onSubmit= {submitHandler}>
        <br/>
    <Box
      sx={{
        width: 500,
        maxWidth: '80%',
      }}
    >
      <h2 className="newMovie">Add a New Movie </h2>
      <br/>
      <TextField fullWidth label="Title" id="Title" value={title} onChange={(e)=> setTitle(e.target.value)}/>
    {errors.title && <p className="errorMessage">{errors.title.message}</p>}
    </Box>
        <br/>
      <Box
      sx={{
        width: 500,
        maxWidth: '80%',
      }}>
      <TextField fullWidth label="BoxArt" id="boxArt"  value={boxArt} onChange={(e)=>setBoxArt(e.target.value)} />
    </Box>
    {errors.boxArt && <p className="errorMessage">{errors.boxArt.message}</p>}
      <br/>
      <Box
      sx={{
        width: 500,
        maxWidth: '80%',
      }}>
      <TextField fullWidth label="Actors" id="Actors" value={actors} onChange={(e)=>setActors(e.target.value.split(','))} />
    </Box>
      <br/>
      <Box
      sx={{
        width: 500,
        maxWidth: '80%',
      }}>
      <TextField fullWidth label="Release Year" id="releaseYear" value={releaseYear} onChange={(e)=>setReleaseYear(e.target.value)} />
    </Box>
      <br/>
      <input type="Checkbox" checked={isKidFriendly} onChange={(e) => setIsKidFriendly(e.target.checked)}/>
      <label>Is Kid Friendly</label>
      <br/>
      <br/>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <label>Genre </label>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={genre}
          onChange={(e)=>setGenre(e.target.value)}
          autoWidth
          label="Genre">

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Scifi">Scifi</MenuItem>
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Family">Family</MenuItem>
          <MenuItem value="Animated">Animated</MenuItem>
        </Select>
      {errors.genre && <p className="errorMessage">{errors.genre.message}</p>}
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <label>Rating</label>
        <Select
          labelId="rating"
          id="rating"
          value={rating}
          onChange={(e)=>setRating(e.target.value)}
          autoWidth
          label="">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="G" >G</MenuItem>
          <MenuItem value="PG" >PG</MenuItem>
          <MenuItem value="PG-13"> PG-13</MenuItem>
          <MenuItem value="R"> R</MenuItem>
          <MenuItem value="NR" > NR</MenuItem>
        </Select>
      {errors.rating && <p className="errorMessage">{errors.rating.message}</p>}
      </FormControl>
    <br/>
    <br/>
      <Stack direction="row" spacing={2} className="button">
      <Button type="submit" variant="contained">Add a Movie</Button>
      </Stack>
      <br/>
    </form>
    </Card>
    </div>
  );
}



      


export default NewMovie;