import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import NewMovie from "./components/NewMovie";
import Display from "./components/Display";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import {useState} from 'react';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userMeta, setUserMeta] = useState({})
  console.log(userMeta)
  return (
    <BrowserRouter> 
    <div className="App">
      <Display isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={userMeta}/>
      <Routes>
        <Route path="/" element={<MovieList isLoggedIn={isLoggedIn} />}></Route>
        <Route path="/new" element={<NewMovie/>}></Route>
        <Route path="/movie/:id" element={<Movie/>}></Route>
        <Route path= "/movie/edit/:id" element={<Edit/>}></Route>
        <Route path= "/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserMeta={setUserMeta} />}></Route>
        <Route path= "/register" element={<Register setIsLoggedIn={setIsLoggedIn} setUserMeta={setUserMeta} />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
