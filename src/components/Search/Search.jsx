import React, { useState, useEffect } from 'react';
import './Search.scss';
import TvshowCard from './TvshowCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchMovies() {
    const [query, setQuery] = useState('');
    const [tvshows, setTvshows] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cardAmount, setCardAmount] = useState(4);

    useEffect(() => {
        if (window.screen.width >= 769) {
          setCardAmount(6);
        }
      }, []);

    const api_key = process.env.REACT_APP_API_KEY

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setTvshows(data.results);
        } catch (err) {
            setError('Failed to fetch movies');
            setTvshows([]);
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
                <FontAwesomeIcon icon={faSearch} className="search__icon" />
                </button>
            </form>
            {loading && <p className="flash info">Loading...</p>} 
            {error && <p className="flash error">{error}</p>}
            {!loading && !error && (
                <div className="shows">
                    <div className="shows__list">
                        {tvshows &&
                            tvshows.slice(0, cardAmount)
                                .filter((tvshow) => tvshow.poster_path)
                                .map((tvshow) => (
                                    <TvshowCard tvshow={tvshow} key={tvshow.id} />
                                ))}
                    </div>
                </div>
            )}
        </div>
    );
}
