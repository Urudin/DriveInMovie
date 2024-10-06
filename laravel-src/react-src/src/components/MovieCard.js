import React, {useState, useEffect} from "react";
import '../styles.css';
import {Link} from "react-router-dom";
import {getMovie} from "../services/movieService";

export default function MovieCard({movie}) {

    const handleError = (e) => {
        e.target.src = "shared/default.jpg"
    }

    const getRatingClass = (rating) => {
        if (rating === 6) return 'rating-good'
        else if (rating === 12) return 'rating-ok'
        else return 'rating-bad'
    };

    return (
        <div key={movie.id} className="movie-card">
            <Link className="link-card" to={`/movieDetails/${movie.id}`}>
                <img src={`shared/${movie.imagePath}`} alt={movie.title} onError={handleError}/>
                <div className="movie-card-info">
                    <h3 className="movie-card-title">{movie.title}</h3>
                    <div>
                        <span className="movie-card-genre">{movie.language}</span>
                        <span
                            className={`movie-card-rating ${getRatingClass(movie.ageRestriction)}`}>{movie.ageRestriction}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
