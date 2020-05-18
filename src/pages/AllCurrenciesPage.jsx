import React from "react";

const AllCurrenciesPage = ({ data }) => {
  return (
    <>
      <h1>{ data.text.full_list }</h1>
      <div className="currencies-list">
          {data.currencies.map((currency, index)=>{
            return (
              <a 
                key={currency.code} 
                className="currency-list-item" 
                href={`/${data.language.code}/currency/${currency.code}`}
                >
                  <span>{index+1}</span>
                  <img src={currency.image}/>
                  {currency.code} — {currency.name}
              </a>
            )
          }) }
      </div>
    </>
  )
};

export default AllCurrenciesPage;
