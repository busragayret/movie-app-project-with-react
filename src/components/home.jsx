import React, { useState } from 'react';
import DiscoverSection from './discover';
import TrendingSection from './trending';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper, Content } from './searchbar/searchbar.styles';

function Home() {

    const navigate = useNavigate();
    const [val, setVal] = useState("");

    let timer = null;
    function time() {
        clearTimeout(timer);
        timer = setTimeout(DoStuff, 500)
    }


    function DoStuff() {
        const val = document.querySelector('#search').value;
        console.log(val)
        if (val !== null && val !== undefined) {
            console.log(val)

            setVal(val);
            navigate(`/search?query=${val}`);
            console.log(val)

        }

    }
    return (
        <>
            <div className='busra'>
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
            <DiscoverSection />
            <TrendingSection />
        </>

    )

}

export default Home;