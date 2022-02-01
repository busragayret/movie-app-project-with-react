import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActorsThumb from './actorsthumb';

function MovieCredit({ id}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1049fd941cd2e947ed04ba7c0abf256b`;
            fetch(URL)
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
                    setLoading(false);
                });
        }, 500);
    }, []);

    console.log(data)

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <h5>🎞Movie Cast:</h5>
                        <div className="container movie-card-group my-5">
                            <div className="row text-center" id="scrollbar">
                                {
                                    data.cast.map((item) => (
                                        <div className="col-md-3">
                                            <ActorsThumb name={item.name} character={item.character} img={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieCredit;
