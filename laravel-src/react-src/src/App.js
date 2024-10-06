import logo from './logo.svg';
import './App.css';
import './styles.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import MoviesForm from "./components/MoviesForm";
import MovieDetails from "./components/MovieDetails";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovies, deleteMovie, createMovie, updateMovie} from "./services/movieService"


function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies()
            .then((result) => {
                setMovies(result.data)
            })
            .catch((err) => console.error(err))
    }, []);


    return (
        <div className="App">
            <div className='container'>
                <Header></Header>

                <Router>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Movies</Link>
                            </li>
                            <li>
                                <Link to="/registerMovie">Add Movie</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<MoviesGrid movies={movies}/>}></Route>
                        <Route path="/registerMovie" element={<MoviesForm movies={movies}/>}></Route>
                        <Route path="/editMovie/:movieId" element={<MoviesForm movies={movies}/>}></Route>
                        <Route path="/movieDetails/:movieId" element={<MovieDetails></MovieDetails>}></Route>
                    </Routes>
                </Router>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
