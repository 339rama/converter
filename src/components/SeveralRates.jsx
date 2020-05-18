import React from "react";

const SeveralRates = ({ data, numbersArr, reverse }) => {
  
  let from = data.currency_from;
  let to = data.currency_to;
  let header = reverse ? data.text.rates_text_reverse : data.text.rates_text;

  if(reverse) { 
    [from, to] = [to, from];
  };
  let rate = reverse ? 1/data.rate.rate : data.rate.rate;

  return (
    <div className="info-blocks">
      <h2>{header}</h2>
      {numbersArr.map((number, index) => {
        let amount_from = number;
        let amount_to = (number * rate).toFixed(4);
        return (
          <div className="item" key={number}>
            <div>
              <p>
                <img data-src={from.image} className="lazy" />
                {from.code}
              </p>
              <p>{amount_from}</p>
            </div>
            <img className="reverse" src="/images/exchange-arrows.svg" />
            <div>
              <p>
                <img data-src={to.image} className="lazy" />
                {to.code}
              </p>
              <p>{amount_to}</p>
            </div>
            <a
              href={`/${data.country_code}/currency/${from.code}/${to.code}/${amount_from}`}
              className="link-img"
            >
              <img data-src="/images/arrow-rigth-white.svg" className="lazy" />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SeveralRates;
