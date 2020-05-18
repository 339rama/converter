import React from 'react'
import SubMenu from './SubMenu';

const Footer = ({data}) => {
    return (
        <footer>
            <div className="content accordeon-menu footer-menu">
                <ul className="accordeon-menu footer-menu">
                    <SubMenu title={'Contacs'} desc={'CONTACS'} />
                    <SubMenu title={data.text.your_language} desc={data.language.name} />
                </ul>
            </div>
            <div className="copyrights">
                {[Object.values(data.text.footer_text)].map((par, index)=>{
                    return (
                        <p key={index}>{ par }</p>
                    )
                })}
            </div>
        </footer>
    )
}

export default Footer;