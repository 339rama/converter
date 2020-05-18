import React from 'react'

const SubMenu = ({title, desc}) => {

    const toggleHandler = (element) => {
        element.classList.toggle('open')
    }

    return (
        <li 
            onClick={e=>toggleHandler(e.currentTarget)}
            >
            <span>{title}
                <img data-src="/images/down-arrow.svg" className="lazy"/>
            </span>
            <div>{desc}</div>
        </li>
    )

}

export default SubMenu;