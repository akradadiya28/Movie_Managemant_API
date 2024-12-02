import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;