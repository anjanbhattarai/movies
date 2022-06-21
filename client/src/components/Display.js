import React, {useState, useEffect} from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import axios from 'axios';


function Display(props) {
    const {isLoggedIn,setIsLoggedIn, user}= props;
    const navigate = useNavigate();

    const renderContent=()=>{
        console.log(isLoggedIn);
        switch(isLoggedIn){
            case true:
                return displayLoggedInContent();
            case false:
                return displayLoggedOutContent();
            case null:
                return ;
            default:
                return  displayLoggedOutContent();
        }
    }
    const displayLoggedOutContent=()=>{
        return(
        <Stack spacing={2} direction="row" className="navbar" >
            <Button variant="contained">
            <NavLink className="nav-link" to= '/login'>Login</NavLink> 
            </Button>
            <Button variant="contained">
            <NavLink className="nav-link" to= '/register'>Register</NavLink> 
            </Button>
            </Stack>
        )}
    const displayLoggedInContent= ()=>{
        return (
        <div>
        <span  className='logoutButton'>
        <p className='welcomeTag'>Welcome {user.username}</p>
        <Button variant="contained" className='logoutButton' onClick={handleLogout}>Logout</Button>
        </span>
        <Stack spacing={2} direction="row" className="navbar" >
    <Button variant="contained">
    <NavLink className="nav-link" to= '/'>Home</NavLink> 
    </Button>
    <Button variant="contained">
    <NavLink className="nav-link" to= '/new'>Add a New Movie</NavLink> 
    </Button>
    </Stack>
    </div>
        )};

    const handleLogout = ()=>{
        axios.post('http://localhost:8000/logout',{})
        .then(res =>{
            Cookies.remove('UserToken');
            setIsLoggedIn(false)
            navigate('/login')
        }).catch(err=> console.log("Logout Error",err))
    }
    return (
    <header>
    <h1>Apex Movie </h1>
    {renderContent()}
    </header>
    )
}

export default Display;


