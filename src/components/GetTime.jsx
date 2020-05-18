import React from 'react';


const GetTime = ()=> {

    function getTime() {
        let date = new Date();
        let options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            timezone: "UTC",
            hour: "numeric",
            minute: "numeric"
        };
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        let time = `${year}-${month}-${day} ${hour}:${minute} UTC`;
        return time;
    }

    return <p id="time">{getTime()}</p>;
}

export default GetTime;