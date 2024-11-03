import React from 'react';
import MyLineChart from "../../../Rechart/LineChart/MyLineChart.tsx";

const ShowSingleReport = (props:any) => {

    if(props?.type==="reChart"){

        return   <>


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
