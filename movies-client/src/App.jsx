import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import "./index.css";
import Header from "./Components/header/Header";
import Trailer from "./Components/trailer/trailer";
import Reviews from "./Components/reviews/reviews";
import Login from "./Login";
import RequireAuth from "./RequireAuth";
function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();
  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        {/* Login Page */}
        <Route path="/Login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Home movies={movies} />} />
          <Route path="Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Review/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                reviews={reviews || []}
                movie={movie}
                setReviews={setReviews}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
