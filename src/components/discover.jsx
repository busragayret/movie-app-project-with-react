import React, { useEffect, useState } from 'react';
import MovieThumb from './moviethumb';

function DiscoverSection() {

    const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = process.env.REACT_APP_API_KEY;
    const DISCOVER_BASE_URL = `${API_URL}discover/movie?api_key=${API_KEY}`;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch(DISCOVER_BASE_URL)
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                    setLoading(false);
                });
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                {/* <strong>Loading...</strong> */}
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


    return (
        <>
            <h1 className='text-center'>Discover Movies</h1>
            <div className="container movie-card-group my-5">
                <div className="row text-center" id="scrollbar">
                    {
                        data.map((item) => (
                            <div className="col-md-3">
                                <MovieThumb genre={item.genre_ids[0]} id={item.id} title={item.title ? item.title : item.original_name} release_date={item.release_date ? item.release_date : item.first_air_date} poster_path={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}
export default DiscoverSection;