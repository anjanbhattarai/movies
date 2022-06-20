
import React from 'react';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import{useState} from "react";

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function Login(props) {
    const navigate= useNavigate()
    const {setIsLoggedIn, setUserMeta}= props;
    const [user, setUser] = useState({})

const handleChange= (e)=>{
    setUser({...user,[e.target.name]: e.target.value})
}

const handleSubmit= (e)=>{
    e.preventDefault()
    axios.post('http://localhost:8000/login',user)
    .then(res =>{
        console.log("RES",res.data.user)
        setIsLoggedIn(true)
        setUserMeta(res.data.user)
        navigate('/')
    })
    .catch(err =>{
        console.log("Error in Register",err)
    })

}

return (
    <div className="details">
    <Card sx={{ maxWidth:450}} className="boxDetails" >
    <form onSubmit= {handleSubmit}>
    <br/>
    <Box
    sx={{
        width: 500,
        maxWidth: '80%',
    }}>
        <br />
    <TextField fullWidth label="Email" id="Email" name="email" value={user.email} onChange={handleChange} />
    {/* {errors.title && <p className="errorMessage">{errors.title.message}</p>} */}
    </Box>
    <br/>
    <Box
    sx={{
        width: 500,
        maxWidth: '80%',
    }}>
        <TextField
            fullWidth
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            value={user.password} onChange={handleChange}/>
    {/* {errors.title && <p className="errorMessage">{errors.title.message}</p>} */}
    </Box>
    <br/>
    <Stack direction="row" spacing={2} className="button">
    <Button type="submit" variant="contained">Login</Button>
    </Stack>
    <br/>
    </form>
    </Card>
    </div>
)
}


export default Login;