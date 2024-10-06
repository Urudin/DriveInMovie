import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/cinema",
});

const multiPartConfig = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

const getMovies = () => api.get("/movies")
const getMovie = (id) => api.get(`/movies/${id}`)
const deleteMovie = (id) => api.post(`/movies/delete/${id}`)
const createMovie = (movie, config = multiPartConfig) => {
    return api.post('/movies', movie, config);
};

const updateMovie = (id, movie, config = multiPartConfig) => {
    return api.post(`/movies/update/${id}`, movie, config);
};

export {getMovies, getMovie, deleteMovie, createMovie, updateMovie};
