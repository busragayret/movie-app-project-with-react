import React, { useEffect, useState } from 'react';
import MovieThumb from './moviethumb';



function TrendingSection() {

    const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = process.env.REACT_APP_API_KEY;
    const TRENDING_BASE_URL = `${API_URL}trending/all/day?api_key=${API_KEY}`;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState(true);
    const [thisWeek, setthisWeek] = useState(false);

    const [url, setUrl] = useState(TRENDING_BASE_URL)

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                    setLoading(false);
                });
        }, 500);
    }, [url]);

    function todayTrending() {
        setToday(true)
        setthisWeek(false)
    }

    function thisWeekTrending() {
        setToday(false)
        setthisWeek(true)
    }
    useEffect(() => {
        if (today) {
            setUrl("https://api.themoviedb.org/3/trending/all/day?api_key=1049fd941cd2e947ed04ba7c0abf256b")
        } else {
            setUrl("https://api.themoviedb.org/3/trending/all/week?api_key=1049fd941cd2e947ed04ba7c0abf256b")
        }
    }, [thisWeek, today]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


    return (
        <>
            <h1 className='text-center'>Trending Movies</h1>
            <div className='text-center'>
                <button onClick={todayTrending} type="button" className={`${today ? "btn-dark" : "btn-outline-dark"} btn ms-2`}>🆕Today</button>
                <button onClick={thisWeekTrending} type="button" className={`${thisWeek ? "btn-dark" : "btn-outline-dark"} btn ms-2`}>📅This Week</button>
            </div>
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
export default TrendingSection;