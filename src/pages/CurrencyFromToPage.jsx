import React from "react";
import GetTime from "../components/GetTime";
import AnotherCurrencyForm from "../components/AnotherCurrencyForm";
import RatesChart from "../components/RatesChart";
import TestChart from "../components/TestChart";
import SeveralRates from "../components/SeveralRates";

const CurrencyFromToPage = ({ data }) => {

  let numbersArr = [1, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000];

  return (
    <>
      <h1>{data.text.h1}</h1>
      <p>{data.text.p_after_h1}</p>

      <div>
        <GetTime />
        <AnotherCurrencyForm data={data} />
      </div>

      <RatesChart data={data} />
      {/* <TestChart data={data}/> */}

      <SeveralRates
        data={data}
        numbersArr={numbersArr}
        reverse={false}
      />
      <SeveralRates
        data={data}
        numbersArr={numbersArr}
        reverse={true}
      />
    </>
  );
};

export default CurrencyFromToPage;
