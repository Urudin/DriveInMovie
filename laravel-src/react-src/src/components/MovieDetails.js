import React, {useEffect, useState} from "react";
import '../styles.css';
import {useParams} from "react-router-dom";
import {getMovie} from "../services/movieService";
import {Link} from "react-router-dom";

export default function MovieCard() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState([]);
    const [projections, setProjections] = useState([]);

    useEffect(() => {
        getMovie(movieId)
            .then((result) => {
                setMovie(result.data)
                setProjections(result.data.projections)
            })
            .catch((err) => console.error(err))
    }, [])

    return(
        <div className="container">
                <div className="movie-details">
                    <img src={`/shared/${movie.imagePath}`} alt="Borítókép" className="movie-details-img" />

                        <div className="movie-details-info">
                            <h1 className="movie-details-title">{movie.title}</h1>

                            <p><strong>Age Restriction:</strong> {movie.ageRestriction}</p>
                            <p><strong>Projections:</strong></p>
                            <ul className="defaultList">

                                {projections.map((projection) => <li>{projection.when} (Seats Available: {projection.seats})</li>)}

                                {projections.length === 0 && <p><strong>Not being projected currently</strong></p>}

                            </ul>
                            <p><strong>Language:</strong> {movie.language}</p>

                            <div className="movie-details-description">
                                <h3>Description</h3>
                                <p>{movie.description}</p>
                            </div>
                            <div>
                                <Link to={`/editMovie/${movieId}`} className="button-link">Edit Movie Details</Link>
                            </div>
                        </div>
                </div>
        </div>
    )
}
