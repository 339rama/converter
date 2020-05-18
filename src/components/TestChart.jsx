import React, { useState } from 'react';


const TestChart = ({data}) => {
    const [state, setstate] = useState(Object.values(data.h));

    return (
        <div className="chart-container">

        </div>
    )
}

export default TestChart;