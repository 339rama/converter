import React from 'react';
import MainMenu from './MainMenu';
import LngSets from './LngSets';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Navbar = ({data}) => {

    return (
        <nav>
            <MainMenu data={data}/>
            <a href="/" id="logo">
                <img src={"/images/logo.svg"} />
            </a>
            <LngSets data={data}/>
        </nav>
    )

}

export default Navbar;