import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, { timestamps: true, versionKey: false })

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;