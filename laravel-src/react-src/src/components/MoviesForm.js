import React, {useState, useEffect} from "react";
import {createMovie, updateMovie, getMovie, deleteMovie} from "../services/movieService";
import {useParams} from "react-router-dom";
import {createProjection, deleteProjection} from "../services/projectionService";

export default function MovieForm({movies, setMovies}) {

    const [title, setTitle] = useState("")
    const [projections, setProjections] = useState([])
    const [description, setDescription] = useState("")
    const [ageRestriction, setAgeRestriction] = useState(6)
    const [language, setLanguage] = useState("English")
    const [image, setImage] = useState(null)
    const [imagePath, setImagePath] = useState("/shared/default.jpg")
    const [when, setWhen] = useState({});
    const [seats, setSeats] = useState({});

    const {movieId} = useParams()

    const editingMovie = {};

    const handleProjectionCreate = (e) => {
        e.preventDefault();
        const formData = new FormData
        formData.append('when', when)
        formData.append('seats', seats)
        formData.append('movie_id', movieId)
        createProjection(formData)
        .then((result) =>
            setProjections([...projections, result.data])
        )
    }

    function handleProjectionDelete  (id){
        deleteProjection(id)
            .then((result) => setProjections(projections.filter((projection) => projection.id !== id)))
    }

    const fetchData = function () {
        if (movieId) {
            getMovie(movieId).then((result) => {
                setProjections(result.data.projections)
                setTitle(result.data.title)
                setDescription(result.data.description)
                setImagePath(`/shared/${result.data.imagePath}`)
                setLanguage(result.data.language)
                setAgeRestriction(result.data.ageRestriction)
            })
        } else {
            setTitle("")
            setDescription("")
            setAgeRestriction(6)
            setLanguage("English")
            setImage("/shared/default.jpg")
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (movieId) {
            editMovie()
            fetchData()
        } else {
            addMovie()
        }

    }

    const handleDelete = (e) => {
        e.preventDefault()
        deleteMovie(movieId).then(() => {
            window.location.href = '/'
        })
    }

    const addMovie = () => {
        const formData = new FormData
        formData.append('title', title)
        formData.append('language', language)
        formData.append('ageRestriction', ageRestriction)
        formData.append('image', image)
        formData.append('description', description)
        createMovie(formData)
            .then((response) => {
                window.location.href = `/editMovie/${response.data.id}`
            })
            .catch((err) => console.log(err));
    }

    const editMovie = () => {
        const formData = new FormData
        formData.append('title', title)
        formData.append('language', language)
        formData.append('ageRestriction', ageRestriction)
        if (image) {
            formData.append('image', image)
        }
        formData.append('description', description)
        updateMovie(movieId, formData)
            .then((response) => {
                setMovies(movies.map(movie => movie.id === editingMovie.id ? response.data : movie))
            })
            .catch((err) => console.log(err));
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        setImage(file)
        setImagePath(URL.createObjectURL(file));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="movie-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="language">Language</label>
                    <input type="text" id="language" value={language} onChange={(e) => setLanguage(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="age-restriction">Age Restriction</label>
                    <select id="age-restriction" value={ageRestriction}
                            onChange={(e) => setAgeRestriction(e.target.value)}>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={handleImageChange}/>
                    <img src={imagePath} alt="Selected Movie"/>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description}
                              onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <button type="submit" className="submit-btn">{movieId ? "Update Movie" : "Create Movie"}</button>
                {movieId && <button type="button" className="delete-btn" onClick={handleDelete}>Delete Movie</button>}
            </form>

            <div className={`container movie-form ${movieId ? "" : "d-none"}`}>
                <h1>Handle Projections</h1>

                <div className="projection-section">
                    <h2>Existing Projections</h2>
                    <table className="projection-table">
                        <thead>
                        <tr>
                            <th>Projection Time</th>
                            <th>Available Seats</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projections.map((projection) =>
                            <tr key={projection.id}>
                                <td>{projection.when}</td>
                                <td>{projection.seats}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleProjectionDelete(projection.id)}>Delete</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>

                    <div className="add-projection-form">
                        <h3>Add New Projection</h3>
                        <form onSubmit={handleProjectionCreate}>
                            <input type="datetime-local" name="when" value={when} onChange={(e) => setWhen(e.target.value)} required/>
                            <input type="number" name="seats" min="1" placeholder="Available Seats" value={seats} onChange={(e) => setSeats(e.target.value)} required/>
                            <input type="hidden" name="movieId" value={movieId}/>
                            <button type="submit" className="submit-btn">Add Projection</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
