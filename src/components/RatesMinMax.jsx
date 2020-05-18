import React, { useState } from "react";

const RatesMinMax = ({ data }) => {
  const [minMax, setMinMax] = useState(data.minMax);

  const URL = `/${data.language.code}/currency/${data.currency_code}/${data.currency_code_to}`;

  function getMonthName(year, month) {
    let monthString = new Date(year, month, 0).toLocaleDateString(
      data.language.code,
      {
        month: "long",
      }
    );
    monthString = monthString[0].toUpperCase() + monthString.slice(1);
    return monthString;
  }


  return (
    <>
      <div className="info-blocks">
        <h2>{data.text.months}</h2>
        {Object.keys(minMax.yearMonthsRates).map((key) => {
          let [y, m] = key.split("-");
          return (
            <a href={`${URL}/${key}-00`} className="item min-max" key={key}>
              <p className="period">{getMonthName(y, m)}</p>
              <div>
                <p>{data.text.min}</p>
                <p>{minMax.yearMonthsRates[key]["min"]}</p>
              </div>
              <div>
                <p>{data.text.max}</p>
                <p>{minMax.yearMonthsRates[key]["max"]}</p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="info-blocks">
        <h2>{data.text.years}</h2>
        {Object.keys(minMax.yearsRates).map((key) => {
          return (
            <a href={`${URL}/${key}-00-00`} className="item min-max" key={key}>
              <p className="period">{key}</p>
              <div>
                <p>{data.text.min}</p>
                <p>{minMax.yearsRates[key]["min"]}</p>
              </div>
              <div>
                <p>{data.text.max}</p>
                <p>{minMax.yearsRates[key]["max"]}</p>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default RatesMinMax;
