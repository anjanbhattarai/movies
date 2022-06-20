const Movie = require("../models/movies.models");
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

module.exports = {
    getMovies: (req,res)=>{
        Movie.find({}).populate('createdBy','username email')
        .then((movies) =>{
            res.json(movies)
        }).catch(err =>{
            res.status(400).json({message:"Something went wrong in FindAll", error: err})
        });
    },  
    createMovie: (req,res)=>{
        const user = jwt.verify(req.cookies.UserToken, SECRET)
        Movie.create({...req.body,createdBy:user._id})
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