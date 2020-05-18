import React, {useState, useRef} from "react";
import DatePicker from "./DatePicker";

const AnotherCurrencyForm = ({ data }) => {
  let amount = Number(data.rate.amount) || 1;

  let from_sub = useRef();
  let to_sub = useRef();
  let inputRef = useRef();

  const [arrSet, setArrSet] = useState(data.currencies);

  const [formState, setformState] = useState({
    from: data.currency_from,
    to: data.currency_to,
    amount: amount,
    rate_for_amount: data.rate.rate_for_amount,
    date: ''
  });

  function selectDate(date){
    formState['date'] = date;
    setformState({ ...formState });
  }

  function amountHandler(weight) {
    let sum = formState.amount + weight;
    inputRef.current.value = sum;
    formState.amount = sum <= 0 ? 1 : sum;
    setformState({ ...formState });
  }
  function inputHandler(e) {
    e.persist();
    formState.amount = Number(e.target.value);
    setformState({ ...formState });
  }

  function currencySub(el) {
    document.querySelector("body").scrollTop=0;
    document.querySelector("body").classList.add("unscroll");
    el.classList.add("open");
  }

  function selectHandler(currency, place, el) {
    formState[place] = currency;
    setformState({ ...formState });
    closeSubSet(el);
  }

  const filterArrSet = event => {
    let value = event.target.value.toLowerCase();
    setArrSet(
      data.currencies.filter(
        item => item.name.toLowerCase().indexOf(value) != -1
      )
    );
  };
  function closeSubSet(el) {
    document.querySelector("body").classList.remove("unscroll");
    el.classList.remove("open");
  }

  return (
    <form name="currencyForm" className="currency">
      <div className="st-block currency-index another">
        <input
          ref={inputRef}
          type="number"
          min="1"
          defaultValue={formState.amount}
          onInput={(e) => inputHandler(e)}
        />
        <div
          className="currency-change right first"
          onClick={(e) => currencySub(from_sub.current)}
        >
          <img data-src="/images/double-arrow-black.svg" className="lazy" />
          <img className="change-img" src={formState.from.image} />
          <p className="change-name">{formState.from.code}</p>
        </div>
        <div ref={from_sub} className="sub-sets">
          <div className="inputs-cont">
            <input
              type="text"
              onInput={filterArrSet}
              placeholder={`${data.text.start_typing} / Start typing`}
            />
            <div onClick={() => closeSubSet(from_sub.current)}>
              {data.text.close}/ Close
            </div>
          </div>
          <ul>
            {arrSet.map((currency) => {
              return (
                <li
                  key={currency.code}
                  onClick={() =>
                    selectHandler(currency, "from", from_sub.current)
                  }
                >
                  {currency.name} — {currency.code}
                </li>
              );
            })}
          </ul>
          <p>{data.text.popular_word}</p>
          <ul>
            {data.currencies.slice(0, 3).map((currency) => {
              return (
                <li
                  key={currency.code}
                  onClick={() =>
                    selectHandler(currency, "from", from_sub.current)
                  }
                >
                  {currency.name} — {currency.code}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="st-block currency-index another">
        <input
          type="number"
          readOnly
          defaultValue={formState.rate_for_amount}
        />
        <div
          className="currency-change right second"
          onClick={(e) => currencySub(to_sub.current)}
        >
          <img data-src="/images/double-arrow-black.svg" className="lazy" />
          <img className="change-img" src={formState.to.image} />
          <p className="change-name">{formState.to.code}</p>
        </div>
        <div ref={to_sub} className="sub-sets">
          <div className="inputs-cont">
            <input
              type="text"
              onInput={filterArrSet}
              placeholder={`${data.text.start_typing} / Start typing`}
            />
            <div onClick={() => closeSubSet(to_sub.current)}>
              {data.text.close}/ Close
            </div>
          </div>
          <ul>
            {arrSet.map((currency) => {
              return (
                <li
                  key={currency.code}
                  onClick={() => selectHandler(currency, "to", to_sub.current)}
                >
                  {currency.name} — {currency.code}
                </li>
              );
            })}
          </ul>
          <p>{data.text.popular_word}</p>
          <ul>
            {data.currencies.slice(0, 3).map((currency) => {
              return (
                <li
                  key={currency.code}
                  onClick={() => selectHandler(currency, "to", to_sub.current)}
                >
                  {currency.name} — {currency.code}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {data.date && (
        <DatePicker
          date={data.date}
          selectDate={selectDate}
          language={data.language}
          text={data.text}
        />
      )}
      <a
        href={`/${data.language.code}/currency/${formState.from.code}/${formState.to.code}/${formState.date}`}
        className="btn"
        id="submit"
      >
        <img data-src="/images/convert.svg" className="lazy" />
        {data.text.convert}
      </a>
    </form>
  );
};

export default AnotherCurrencyForm;
