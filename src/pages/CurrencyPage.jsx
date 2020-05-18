import React from 'react';
import GetTime from '../components/GetTime';
import CurrenciesListSliced from '../components/CurrenciesListSliced';

const CurrencyPage = ({data}) => {
    return (
        <>
            <h1>{ data.text.h1 }</h1>
            <p>{ data.text.p_after_h1 }</p>

            <div className="info-blocks">
                <GetTime/>
                {data.several_currencies.map(item=>{
                    return (
                        <a 
                            key={`${data.country_code}|${item.code}`}
                            href={`/${data.country_code}/currency/${data.currency_code}/${item.code}`} 
                            className="item round"
                            >
                            <div>
                                <div className="img" style={{backgroundImage: `url(${item.image})`}}></div>
                                <p>{item.code}</p>
                            </div>
                            <div>
                                <p>1 { data.currency_code }</p>
                                <p>{item.rate}</p>
                            </div>
                            <div>
                                <p>{data.text.in} { data.currency_code }</p>
                                <p>{item.rate_reverse}</p>
                            </div>
                        </a>
                    )
                })}
            </div>

            <CurrenciesListSliced data={data} />
        </>
    )
}

export default CurrencyPage;