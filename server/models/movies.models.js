const mongoose = require("mongoose");

const MovieSchema= new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "*Movie Title is required*"],
            minLength: [3, "Must have atleast 3 characters"],
            unique: true,
        },
        genre: {
            type: String,
            required: [ true, "*Genre is required*"],
            minLength: [3, "Must have atleast 3 characters"],
            enum: ["Comedy", "Drama", "Action", "Scifi", "Horror", "Family","Animated"],
        },
        boxArt: {
            type: String,
            required: [true, "*Movie picture is required*"],
        },
        rating: {
            type: String,
            enum: ["G", "PG", "PG-13", "R", "NR"],
            required: [true, "*Need the Rating*"]
        },
        actors:{
            type: [String], //[String] (meaning it is an array of String)
        },
        isKidFriendly:{
            type: Boolean,
            default: false,
        },
        releaseYear:{
            type: Number,
            minLength: [1950, "Nothing too old"]
        },
        createdBy:{ 
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }, 
    { timestamps: true}
);

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;