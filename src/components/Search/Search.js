import React, { useState } from 'react';
import './Search.scss';

export default function SearchMovies() {
    const [query, setQuery] = useState();
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api_key = process.env.REACT_APP_API_KEY

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        } catch (err) {
            setError('Failed to fetch movies');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="query"
                    value={query}
                    className="input"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search tv shows"
                />
                <button className="button" type="submit">
                    Search
                </button>
            </form>
            {loading && <p className="flash info">Loading...</p>} 
            {error && <p className="flash error">{error}</p>}
            {!loading && !error && (
                <div className="card-list">
                    {movies &&
                        movies
                            .filter((movie) => movie.poster_path)
                            .map((movie) => (
                                movie.name
                            ))}
                </div>
            )}
        </div>
    );
}
