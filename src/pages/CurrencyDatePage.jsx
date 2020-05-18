import React, {useEffect, useState} from "react";
import AnotherCurrencyForm from "../components/AnotherCurrencyForm";
import RatesChart from "../components/RatesChart";
import SeveralRates from "../components/SeveralRates";
import RatesMinMax from "../components/RatesMinMax";

const CurrencyDatePage = ({ data }) => {

  let numbersArr = [1, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000];

  return (
    <>
      <h1>{data.text.h1}</h1>
      <p>{data.text.p_after_h1}</p>

      <div>
        <AnotherCurrencyForm data={data} />
      </div>

      <RatesChart data={data} />

      {data.date.split("-")[2] !== "00" && (
        <SeveralRates
          data={data}
          numbersArr={numbersArr}
          reverse={false}
        />
      )}
      {data.date.split("-")[2] !== "00" && (
        <SeveralRates
          data={data}
          numbersArr={numbersArr}
          reverse={true}
        />
      )}

      {data.date.split("-")[2] === "00" && (
        <RatesMinMax data={data}/>
      )}
    </>
  );
};

export default CurrencyDatePage;
