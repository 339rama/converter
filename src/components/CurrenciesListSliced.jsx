import React from 'react';

const CurrenciesListSliced = ({data}) => {
    return (
        <div className="currencies-list">
            <h2>{data.text.popular_currencies}</h2>
            {data.currencies.slice(0,5).map(currency=>{
                return (
                    <a 
                        key={currency.code}
                        className="currency-list-item" 
                        href={`/${data.language.code}/currency/${currency.code}`}
                        >
                            <img data-src={currency.image} className="lazy"/>
                            {currency.code} — {currency.name}
                    </a>
                )
            })}
            <a className="more" href={`/${data.language.code}/currency`}>
                {data.text.more }
                <img data-src="/images/arrow-rigth.svg" className="lazy"/>
            </a>
        </div>
    )
}

export default CurrenciesListSliced;