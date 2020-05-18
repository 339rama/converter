import React, { useState, useRef, useEffect } from "react";

const DatePicker = ({ date, selectDate, language, text }) => {

  let [year, month, day] = date.split("-");
  const parsedDate = new Date(date);

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  function getMonthName(year, month) {
    let monthString = new Date(year, month, 0).toLocaleDateString(language.code, {
      month: "long"
    });
    monthString = monthString[0].toUpperCase() + monthString.slice(1);
    return monthString;
  }
  function prepareMonthNames(year, monthsArr) {
    let monthsObj = {};
    monthsArr.forEach(month => (monthsObj[month] = getMonthName(year, month)));
    return monthsObj;
  }
  const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const YEARS = [2018, 2019, 2020];

  function getWeekName(year, month, day) {
    return new Date(year, month, day).toLocaleDateString(language.code, {
      weekday: "short"
    });
  }
  function prepareDayNames(year, month) {
    let daysObj = {};
    for (let i = 1; i < getDaysInMonth(year, month + 1); i++) {
      daysObj[i] = getWeekName(year, month, i);
    }
    return daysObj;
  }

  const [dateState, setDateState] = useState({
    year: year,
    month: month,
    day: day
  });

  const [years, setYears] = useState({
    2018: "2018",
    2019: "2019",
    2020: "2020"
  });
  const [months, setMonths] = useState(prepareMonthNames(year, MONTHS));
  const [weekdays, setWeekDays] = useState(prepareDayNames(year, month));

  let div = useRef();

  function setDay(el) {
    let elWidth = el.offsetWidth;
    let day = Number(el.getAttribute("value"));
    let halfEl = (div.current.offsetWidth / elWidth) / 2;
    let scrollL = Number((day - halfEl) * elWidth) - elWidth/2;
    div.current.scrollLeft = scrollL;

    dateState["day"] = day;
    setDateState({ ...dateState });
    selectDate(
      Object.values(dateState)
        .map(d => {
          if (Number(d) < 10) {
            return `0${Number(d)}`;
          }
          return d;
        })
        .join("-")
    );
  }

  function setMonthYear(el, key) {
    closeSelect(el);
    let value = el.getAttribute("value");
    dateState[key] = value;
    setDateState({ ...dateState });
    selectDate(
      Object.values(dateState)
        .map(d => {
          if (Number(d) < 10) {
            return `0${Number(d)}`;
          }
          return d;
        })
        .join("-")
    );
  }

  function openSelect(el) {
    el.nextElementSibling.style.display = "block";
  }
  function closeSelect(el) {
    el.parentNode.removeAttribute("style");
  }

  function scrollDay(step) {
    div.current.scrollLeft += step;
  }
  function unScrollBody(){
    document.querySelector('body').classList.toggle('unscroll');
  }
  function scrollContainer(event){
    console.log(event.deltaY);
    div.current.scrollLeft += event.deltaY*2;
    
  }

  if (day === "00") {
    return (
      <div className="st-block date-container select">
        <div className="select" onClick={e => openSelect(e.currentTarget)}>
          <div>
            <label>{text.year_select}</label>
            <input readOnly type="text" value={dateState.year} />
          </div>
          <img data-src="/images/double-arrow-black.svg" alt="double-arrow" className="lazy"/>
        </div>
        <ul>
          {Object.keys(years).map(item => {
            let active = item === dateState.year ? "active" : "";
            return (
              <li
                key={item}
                value={item}
                className={active}
                onClick={e => setMonthYear(e.currentTarget, "year")}
              >
                {years[item]}
              </li>
            );
          })}
        </ul>
        <div className="select" onClick={e => openSelect(e.currentTarget)}>
          <div>
            <label>{text.month_select}</label>
            <input
              readOnly
              type="text"
              value={getMonthName(year, dateState.month)}
            />
          </div>
          <img src="/images/double-arrow-black.svg" alt="double-arrow" />
        </div>
        <ul>
          {Object.keys(months).map(item => {
            let active =
              Number(item) === Number(dateState.month) ? "active" : "";
            return (
              <li
                key={item}
                value={item}
                className={active}
                onClick={e => setMonthYear(e.currentTarget, "month")}
              >
                {months[item]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="st-block date-container">
      <img
        data-src="/images/arrow-left.svg"
        alt="arrow-left"
        className="lazy"
        onClick={() => scrollDay(-div.current.offsetWidth)}
      />
      <div 
        ref={div} 
        className="weekdays-wrapper" 
        onMouseEnter={()=>unScrollBody()}
        onMouseLeave={()=>unScrollBody()}
        onWheel={event=>scrollContainer(event)}
        >
        <ul className="weekdays">
          {Object.keys(weekdays).map((weekday) => {
            let active =
              Number(weekday) === Number(dateState.day) ? "active" : "";
            return (
              <li
                key={weekday}
                value={weekday}
                onClick={(e) => setDay(e.currentTarget)}
              >
                <p>{weekdays[weekday]}</p>
                <p className={active}>{weekday}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <img
        data-src="/images/arrow-left.svg"
        alt="arrow-right"
        className="lazy"
        style={{ transform: "rotate(-180deg)" }}
        onClick={() => scrollDay(div.current.offsetWidth)}
      />
    </div>
  );
};

export default DatePicker;
