import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieInfo({ id }) {
    
    const [data, setData] = useState([]);
    const [crewData, setCrewData] = useState([]);
    const [creditsData, setCreditsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const params = useParams();

    useEffect(() => {
        setTimeout(() => {
            const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=1049fd941cd2e947ed04ba7c0abf256b`;
            fetch(URL)
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
                    setLoading(false);
                });
        }, 500);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1049fd941cd2e947ed04ba7c0abf256b`;
            fetch(URL)
                .then((response) => response.json())
                .then((json) => {
                    setCrewData(json);
                    setLoading2(false);
                });
        }, 500);
    }, []);

    if (loading && loading2) {
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
            <div className='movieBg container-fluid'>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} width="300px" className="img-fluid" alt="..." />
                    </div>
                    <div className="col-md-6">
                        <p>{data.original_title}</p>
                        {data.genres.map(e => (
                            <p className="badge bg-dark p-2 me-2">{e.name}</p>
                        ))}
                        <p>{data.release_date}</p>
                        <p>{data.overview}</p>
                        <h5>🎟Movie Crew:</h5>
                        {
                            crewData.crew &&
                            crewData.crew.slice(0, 3).map(a => (
                                <p>{a?.name}</p>
                            ))
                        }
                    </div>
                </div>
            </div>

            </div>
            
        </>
    );
}

export default MovieInfo;
