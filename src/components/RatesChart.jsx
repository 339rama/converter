import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart } from "react-chartkick";
import "chart.js";
import axios from "axios";
const moment = require("moment");
moment.defaultFormat = "YYYY-MM-DD";
import Loader from '../components/Loader';

const RatesChart = ({ data }) => {

  let date = !data.date ? new Date() : data.date;
  if(data.date){
    let [year, month, day] = date.split("-");
    month = month === "00" ? "01" : month;
    day = day === "00" ? "01" : day;
    date = new Date(`${year}-${month}-${day}`);
  }
  let options = {weekday: 'short', year: "numeric", month: "short",day: "2-digit"};
  let formatedDate = date.toLocaleDateString(data.language.code, options);
  
  const [chartData, setChartData] = useState(data.historic);
  const [filterState, setfilterState] = useState({key: 1, value: `${data.text.year_select}`});

  const filters = {
    1: `${data.text.year_select}`,
    0.5: `${data.text.six_month}`,
    0.25: `${data.text.three_month}`,
    0.083333: `${data.text.month_select}`,
  };

  let min = Math.min(...Object.values(chartData));
  let max = Math.max(...Object.values(chartData));
  min = !(min < 10) 
    ? Math.floor(min) - 1 
    : !(min < 0.1) 
    ? (min*0.95).toFixed(2) 
    : min.toFixed(4);
  max = !(max < 10) 
    ? Math.ceil(max) + 1 
    : !(max < 0.1) 
    ? (max*1.05).toFixed(2) 
    : max.toFixed(4);
  let stepSize = !(max-min < 10) ? 2 : !(max < 0.1) ? ((max-min)/10).toFixed(2) : 0.001;
  let maxYTicks = !( (max-min) > 10) ? Object.values(chartData).length : '';

  function filterData(el) {
    let filter = el.dataset.value;
    let rates = {};
    let keys = Object.keys(data.historic).filter(key => diffDates(date, key, filter));
    keys.forEach(key => (rates[key] = data.historic[key]));
    setChartData(rates);
    setfilterState({key: Number(filter), value: filters[filter]})
  }

  function diffDates(day_one, day_two, diffNumber = 1) {
    [day_one, day_two] = [moment(day_one), moment(day_two)];
    let result = day_one.diff(day_two, "years", true);
    return result >= 0 && result <= diffNumber;
  }

  return (
    <>
      <h2>{data.text.chart_header}</h2>
      <div className="chart-buttons">
        {Object.keys(filters)
          .map((filterKey) => {
            let active = Number(filterKey) === filterState.key ? "active" : "";
            return (
              <button
                key={filterKey}
                className={active}
                onClick={(e) => filterData(e.currentTarget)}
                data-value={filterKey}
              >
                {filters[filterKey]}
              </button>
            );
          })}
      </div>
      <div className="chart-container">
        {Object.keys(chartData).map(key=>{
          let url = `/${data.language.code}/currency/${data.currency_from.code}/${data.currency_to.code}/${key}`;
          return(
          <a href={url} key={key} id={key}>{key}</a>
          )
        })}
        <LineChart
          data={chartData}
          min={min}
          max={max}
          curve={false}
          dataset={{
            borderColor: "#fff",
            borderWidth: 1,
            radius: 1,
            pointRadius: 0.5,
            pointHoverRadius: 7.6,
            pointHoverBackgroundColor: '#000',
            pointHoverBorderColor: "#00AEFF",
            pointHoverBorderWidth: 2.4
          }}
          round={2}
          library={{
            onClick: function(e, item) {
              if(item.length){
                let key = item[0]._xScale._timestamps.datasets[0][item[0]._index];
                let id = new Date(key).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }).split('.').reverse().join('-');
                document.location.pathname = document.getElementById(id).getAttribute('href')
              }
            },
            legend: {
              labels: {
                fontSize: 25,
                fontColor: "red",
              },
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: "#1C1C1E",
                    lineWidth: 1,
                    tickMarkLength: 0,
                  },
                  ticks: {
                    maxTicksLimit: `${maxYTicks}`,
                    stepSize: `${stepSize}`,
                    padding: 7,
                    fontFamily: "Roboto",
                    fontSize: 14,
                    fontColor: "#8D8C92",
                    // callback: function(value, index, values) {
                    //   return `${value} ${data.currency_to.sign}`;
                    // },
                    suggestedMax: `${max}`,
                    suggestedMin: `${min}`,
                  },
                  scaleLabel: { fontColor: "#fff" },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    autoSkip: false,
                    fontFamily: "Roboto",
                    fontSize: 14,
                    fontColor: "#8D8C92",
                  },
                  type: "time",
                },
              ],
            },
          }}
        />
      </div>
      <div className="historic-rate">
        {formatedDate}
        <p>{`${data.rate.rate} ${
          data.currency_to.sign || data.currency_code_to
        }`}</p>
      </div>
    </>
  );
};

export default RatesChart;
