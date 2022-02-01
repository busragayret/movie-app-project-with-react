import React, { useState, useEffect, useRef } from 'react';
import MovieThumb from '../moviethumb';
import { Wrapper, Content } from './searchbar.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';


const SearchBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const urlParams = new URLSearchParams(location.search);
    const [val, setVal] = useState(urlParams.get('query'));
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState();
    const [maxIndex, setMaxIndex] = useState();
    const [pageSize, setPageSize] = useState(4);
    const timer = null;
    function time() {
        clearTimeout(timer);
        timer = setTimeout(ImputVal, 500)
    }

    function ImputVal() {
        const val = document.querySelector('#search').value;
        console.log(val)
        if (val != null && val != undefined) {
            setVal(val);
            navigate(`/search?query=${val}`);
            console.log(val)
        }


    }

    function handlePageChange(event, page) {
        setCurrent(page)
        setMinIndex((page - 1) * pageSize)
        setMaxIndex(page * pageSize)
    };



    useEffect(() => {
        setTimeout(() => {
            console.log(val)
            const URL = `https://api.themoviedb.org/3/search/movie?api_key=02581a4d0ea33802e6d1b5670847636a&query=${val}&page=1`;
            console.log(URL)
            fetch(URL)
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                    setMinIndex(0)
                    setMaxIndex(pageSize)
                    setCurrent(1)
                });
        }, 1000);
    }, [val]);

    return (
        <>
            <div className='busra' >
                <Wrapper>
                    <Content>
                        <img src='../search-icon.png' alt='search-icon' />
                        <input
                            name='name'
                            type='text'
                            id="search"
                            placeholder='Search Movie...'
                            onKeyUp={time}
                        />
                    </Content>
                </Wrapper>
            </div>
            <div className="container my-3">
                <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
                    {

                        data.map((item, index) => index >= minIndex && index < maxIndex &&
                            (
                                <div className="col">
                                    <MovieThumb genre={item.genre_ids[0]} id={item.id} title={item.title ? item.title : item.original_name} release_date={item.release_date ? item.release_date : item.first_air_date} poster_path={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                                </div>
                            ))
                    }
                </div >
            </div >
            <div className='container my-4'>
                <Grid container justifyContent="center">
                    {
                        data.length > 0 ?
                            <Pagination page={current} onChange={handlePageChange} count={data.length / pageSize < 1 ? 1 : (data.length / pageSize)} rowsPerPage={pageSize} shape="rounded" variant="outlined" />
                            :
                            <h3 className="text-center text-muted my-5">Oops! Movie not found...</h3>
                    }
                </Grid>
            </div>
        </>
    );
};


export default SearchBar;