import React, { useState, useReducer, useRef } from "react";

function focusReducer(state, action) {
  return action.payload;
}

const LngSubSet = ({ data, setStandart }) => {

  let subRef = useRef();

  function addClass(el, e){
    if(e.currentTarget===e.target){
      el.classList.add('open')
    }
  }
  function removeClass(el, e){
    el.classList.remove("open");
  }

  const [arrSet, setArrSet] = useState(data.languages);

  const [focus, focusDispatch] = useReducer(focusReducer, "sub-sets");

  const filterArrSet = event => {
    let value = event.target.value.toLowerCase();
    setArrSet(data.languages.filter(item => `${item.name} - ${item.localname}`.toLowerCase().indexOf(value) != -1));
  };

  return (
    <>
      <p>{data.text.language_word} / Language:</p>
      <div
        className="item"
        onClick={(e)=>addClass(subRef.current, e)}
      >
        <span>{data.language.name} — {data.language.localname} </span>
        <img data-src={"/images/double-arrow-grey.svg"} className="lazy"/>
        <div ref={subRef} className="sub">
          <div className="head">
            <button
              onClick={(e)=>removeClass(subRef.current, e)}
            >
              <img data-src={"/images/arrow-left-white.svg"} className="lazy"/>
              {data.text.back}
            </button>
          </div>
          <p className="sub">{data.text.lang_selection}/ Language Selection</p>
          <div className={focus}>
            <div className="inputs-cont">
              <input
                type="text"
                onInput={filterArrSet}
                onFocus={() =>
                  focusDispatch({ type: "toggle", payload: "sub-sets open" })
                }
                placeholder={`${data.text.start_typing} / Start typing`}
              />
              <div
                onClick={() =>
                  focusDispatch({ type: "toggle", payload: "sub-sets" })
                }
              >
                {data.text.close}/ Close
              </div>
            </div>
            <ul>
              {arrSet.map(language => {
                return (
                  <li key={language.code}>
                    <a href={`/${language.code}`}>
                      {language.name} — {language.localname}({language.code.toUpperCase()})
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="popular-header">{data.text.popular_word}</p>
            <ul>
              {arrSet.slice(0, 3).map(language => {
                return (
                  <li key={language.code}>
                    <a href={`/${language.code}`}>
                      {language.name} — {language.localname}({language.code.toUpperCase()})
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <button 
            className="btn"
            onClick={()=> setStandart('id', 1)}
            >
            {data.text.set_standart}/ Set standard
          </button>
        </div>
      </div>
    </>
  );
};

export default LngSubSet;
