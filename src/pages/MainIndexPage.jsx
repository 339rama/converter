import React from "react";
import MainCurrencyForm from "../components/MainCurrencyForm";
import GetTime from "../components/GetTime";
import { useParams } from "react-router-dom";
import CurrenciesListSliced from "../components/CurrenciesListSliced";

const MainIndexPage = ({ data }) => {
  return (
    <>
      <h1>{data.text.index_h1}</h1>
      <div>
        <MainCurrencyForm data={data} />
      </div>
      <div className="info-blocks">
        <h2>{data.text.currencies_pairs}</h2>
        <GetTime />
        {data.currencies_pairs.map((pair, index) => {
          return (
            <div className="item" key={index}>
              <div>
                <p>
                  <img src={pair.from.image} />
                  {pair.from.code}
                </p>
                <p>{pair.amount}</p>
              </div>
              <img className="reverse" src="/images/exchange-arrows.svg" />
              <div>
                <p>
                  <img src={pair.to.image} />
                  {pair.to.code}
                </p>
                <p>{pair.rate}</p>
              </div>
              <a
                href={`/${data.language.code}/currency/${pair.from.code}/${pair.to.code}`}
                className="link-img"
              >
                <img src="/images/arrow-rigth-white.svg" />
              </a>
            </div>
          );
        })}
      </div>
      <CurrenciesListSliced data={data} />
    </>
  );
};

export default MainIndexPage;
