const Movie = require("../models/movies.models");
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

module.exports = {
    getMovies: (req,res)=>{
        Movie.find({})
        .then((movies) =>{
            res.json(movies)
        }).catch(err =>{
            res.status(400).json({message:"Something went wrong in FindAll", error: err})
        });
    },  
    createMovie: (req,res)=>{
        console.log("Inside Create movie Function")
        // const user = jwt.verify(req.cookies.userToken,SECRET)
        // consol.log("JWT",jwt)
        // console.log("USER =>",user)
        console.log("req.body",req.body)
        const movie= new Movie (req.body)
        const decodedJwt = jwt.decode(req.cookies.UserToken, { complete: true });
        console.log("DecodedJWT",decodedJwt)
        movie.createdBy = decodedJwt.payload._id
        Movie.create(movie)
        .then(newMovies=>{
            res.status(200).json(newMovies)
        }).catch(err =>{
            res.status(400).json({message:"Something went wrong in Create", error: err})
        });
    },
    getMovieById: (req,res)=>{
        Movie.findOne({_id: req.params.id})
        .then(findMovie=>{
            res.status(200).json(findMovie)
        }).catch(err =>{
            res.status(400).json({message:"Something went wrong in getMovieById", error: err})
        });
    },
        findAllMoviesByUsername:(req,res)=>{
            User.findOne({ username: req.params.username})
            .then(user =>{
                Movie.find({CreatedBy: user._id})
                .populate('createdBy','username email')
                    .then(movies =>{
                        res.json(movies)
                    }).catch(err =>{
                        res.status(400).json({message: 'Something went wrong in Find Movie',error:err})
                    })
            }).catch(err =>{
                res.status(400).json({message: 'Something went wrong in Find Movie',error:err});
            })
        },

    deleteMovie: (req,res)=>{
        Movie.deleteOne({_id: req.params.id})
        .then(movie=>{
            res.status(200).json(movie)
        }).catch(err =>{
            res.status(400).json({message:"Something went wrong in DeleteMovie", error: err})
        });
    },
    updateMovie: (req,res)=>{
        Movie.findByIdAndUpdate({_id: req.params.id},req.body,{ new: true, runValidators: true})
        .then(updateMovie=>{
            res.status(200).json(updateMovie)
        }).catch(err =>{
            res.status(400).json({message:"Something went wrong in updateMovie", error: err})
        });
    },
}