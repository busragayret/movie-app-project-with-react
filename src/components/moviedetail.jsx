import React from 'react';
import { useParams } from 'react-router-dom';
import MovieInfo from './movieinfo';
import MovieCredit from './moviecredit';


function MovieDetail () {

    const params = useParams();
    
    return (
        <>
            <MovieInfo id={params.id}/>
            <MovieCredit id={params.id}/>
        </>  
    );
}
export default MovieDetail;