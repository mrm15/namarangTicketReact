import React from 'react';
import MyLineChart from "../Rechart/LineChart/MyLineChart.tsx";

const ShowSingleReport = (props:any) => {

    console.log(props)
    if(props?.type==="reChart"){

        return   <>
            {JSON.stringify(props)}


            <MyLineChart
                width={700}
                height={500}
                data={props?.data} dataKey={props?.dataKey}
                         keyArray={props?.keyArray}
            />

        </>
    }

};

export default ShowSingleReport;
