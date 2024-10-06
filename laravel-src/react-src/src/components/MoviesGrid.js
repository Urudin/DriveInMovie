import React from "react";
import '../styles.css';
import {useState} from "react";
import MovieCard from "./MovieCard";

export default function MoviesGrid({movies}) {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const matchesSearchTerm = (movie, genre) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    }


    const filteredMovies = movies.filter(movie =>
        matchesSearchTerm(movie, searchTerm))

    return (
        <div>
            <input
                className="search-input"
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div className="movies-grid">
                {
                    filteredMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id}></MovieCard>
                    ))
                }
            </div>
        </div>
    );
}
