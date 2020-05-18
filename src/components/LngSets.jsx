import React, {useState, useReducer} from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import LngSubSet from './LngSubSet';

function reducer(state, action) {
    switch (action.type) {
        case 'toggle':
            document.querySelector("body").scrollTop = 0;
            document.querySelector('body').classList.toggle('unscroll');
            return action.payload
        default:
            break;
    }
}

const classes ='lng-settings'

const LngSets = ({data}) => {

    const [state, dispatch] = useReducer(reducer, classes);

    function setStandart(value, position){
        let path = document.location.pathname.split('/');
        path[position] = value;
        document.location.href = path.join('/');
    }

    return (
        <>
        <div 
            id="lng" 
            onClick={()=>dispatch({type: 'toggle', payload: 'lng-settings open'})}
            >
            <span>{data.language.code.toUpperCase()}</span>
            <img 
                data-src={data.language.image} 
                alt={data.language.code}
                className="lazy"
                />
            <img data-src={"/images/double-arrow.svg"} className="lazy"/>
        </div>
        <div className={state}>
            <div>
                <LngSubSet data={data} setStandart={setStandart}/>
                <div className="buttons">
                    <button className="btn">{data.text.save}/ Save</button>
                    <button 
                        className="btn" 
                        onClick={()=>dispatch({type: 'toggle', payload: 'lng-settings'})}
                        >{data.text.cancel}/ Cancel
                        </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default LngSets;