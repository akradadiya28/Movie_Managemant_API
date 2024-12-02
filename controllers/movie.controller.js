import Movie from "../models/movie.model.js"
import Genre from "../models/genre.model.js"
import fs from "fs"
import path from "path";

export const addMovie = async (req, res) => {
    try {
        const { name, genreId, releaseDate, ratings } = req.body;

        const movie = await Movie.create({ name, genreId, poster: req?.file?.path, releaseDate, ratings });
        console.log("Movie", movie);

        return res.status(201).json({ message: "Movie added successfully" })

    } catch (error) {
        console.log("add-movie-error", error);
        return res.status(401).json({ message: "Add movie error" });
    }
}

export const addGenre = async (req, res) => {
    try {
        const { name } = req.body;

        const genre = await Genre.create({ name });
        console.log("Genre", genre);

        return res.status(201).json({ message: "Genere added successfully" });

    } catch (error) {
        console.log("genre-error", error);
        return res.status(401).json({ message: "Genre error" });
    }
}

export const getMovie = async (req, res) => {
    try {
        const { name, genre, rating, releaseDate, sortBy, sortOrder } = req.query;

        const filter = {};

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (genre) {
            filter.genreId = genre;
        }

        if (rating) {
            filter.rating = { $gte: Number(rating) };
        }

        if (releaseDate) {
            filter.releaseDate = releaseDate;
        }

        const sort = {};
        if (sortBy) {
            const validSortFields = ["releaseDate", "rating"];
            if (validSortFields.includes(sortBy)) {
                sort[sortBy] = sortOrder === "asc" ? 1 : -1;
            }
        }
        const movie = await Movie.find(filter)
            .populate("genreId")
            .sort(sort);

        if (!movie || movie.length === 0) {
            return res.status(404).json({ message: "No movies found" });
        }

        return res.status(201).json({ message: "Movie fetched successfuly", movie });

    } catch (error) {
        console.log("get-movie-error", error);
        return res.status(401).json({ message: "Get movie error" })
    }
}

export const updateMovie = async (req, res) => {
    try {
        const { name, genreId, releaseDate, ratings } = req.body;
        const { id } = req.params;

        const movie = await Movie.findByIdAndUpdate(id, { name, genreId, releaseDate, ratings, poster: req?.file?.path });
        console.log(movie);

        const oldPoster = movie.poster;
        if (oldPoster && fs.existsSync(path.join(process.cwd(), oldPoster))) {
            fs.unlinkSync(path.join(process.cwd(), oldPoster))
        }

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json({ message: "Movie updated successfully", movie });

    } catch (error) {
        console.log("update-movie-error", error);
        return res.status(401).json({ message: "Update movie error" })
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findByIdAndDelete(id);
        console.log(movie);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const posterPath = movie.poster;
        if (posterPath && fs.existsSync(path.join(process.cwd(), posterPath))) {
            fs.unlinkSync(path.join(process.cwd(), posterPath));
        }

        return res.status(201).json({ message: "Movie deleted successfully" })

    } catch (error) {
        console.log("delete-error", error);
        return res.status(401).json({ message: "Delete movie error" })
    }
}