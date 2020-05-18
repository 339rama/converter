import React, {useState, useEffect} from 'react';
import SubMenu from './SubMenu';

const MainMenu = ({data}) => {

    const [menustate, setmenustate] = useState('main-menu');
    
    function OpenCloseMenu(){
        document.querySelector("div.main-menu").classList.toggle("open");
        document.querySelector("body").classList.toggle("unscroll");
        document.querySelector("body").scrollTop = 0;
    }

    return (
        <>
            <a id="menu" onClick={()=>OpenCloseMenu()}>
                <img src={"/images/menu-options.svg"} />
            </a>
            <div className='main-menu'>
                <div className="head">
                    <a href="/" className="logo">
                        <img data-src={"/images/logo.svg"} className="lazy"/>
                        Wm—Ex.com
                    </a>
                    <img 
                        data-src={"/images/menuX.svg"}  
                        alt="X" 
                        className="lazy"
                        onClick={()=>OpenCloseMenu()}/>
                </div>
                <div className="body">
                    <div className="accordeon-menu">
                        <ul className="accordeon-menu">
                            <SubMenu title={'Contacs'} desc={'DESC'}/>
                            <SubMenu title={`${data.text.your_language}: ${data.language.name}`} desc={'DESC'}/>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainMenu;