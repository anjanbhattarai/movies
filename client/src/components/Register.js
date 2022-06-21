import React from 'react';
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import{useState} from "react";

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function Register(props) {
const {setIsLoggedIn, setUserMeta}= props;
const navigate = useNavigate()
const [user,setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',

});
const [errors, setErrors] = useState({})

const handleChange= (e)=>{
    setUser({...user,[e.target.name]: e.target.value})
}

const handleSubmit= (e)=>{
    e.preventDefault()
    axios.post('http://localhost:8000/register',user, {withCredentials: true})
    .then(res =>{
        setUserMeta(res.data.user)
        setIsLoggedIn(true)
        navigate('/')
    })
    .catch(err =>{
        console.log("Error in Register",err)
        setErrors(err.response.data.error.errors)
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
    <h2 className="register"> Register </h2>

    <br />
    <TextField fullWidth label="Username" id="name" name="username" value={user.username} onChange={handleChange}/>
    {/* {errors.user.username && <p className="errorMessage">{errors.user.message}</p>} */}
    </Box>
    <Box
    sx={{
        width: 500,
        maxWidth: '80%',
    }}>
        <br />
    <TextField fullWidth label="Email" id="Email" name="email" value={user.email} onChange={handleChange} />
    {/* {errors.user && <p className="errorMessage">{errors.user.message}</p>} */}
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
            name="password" value={user.password} onChange={handleChange}/>
    {/* {errors.user && <p className="errorMessage">{errors.user.message}</p>} */}
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
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
    {/* {errors.user && <p className="errorMessage">{errors.user.message}</p>} */}
    </Box>
    <br/>
    <br/>
    <Stack direction="row" spacing={2} className="button">
    <Button type="submit" variant="contained">Register</Button>
    </Stack>
    <br/>
    </form>
    </Card>
    </div>
)
}

export default Register;