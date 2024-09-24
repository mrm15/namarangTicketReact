import './DashboardBody.scss';
import {useEffect, useState} from "react";
import {getCurrentDate} from "../../../utils/utilsFunction.tsx";

const FooterDashboard = () => {

    const [currentTime, setCurrentTime] = useState({
        date:new Date(),
        persianStringDateTime:"",
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const persianStringDateTime = getCurrentDate(true);
            setCurrentTime({
                date: new Date(),
                persianStringDateTime
            });
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    try {
        return (
            <div className="text-center thisIsFooterToKnow flex justify-center gap-2">
                <div>
                    &nbsp;
                </div>
                <div>
                    تمامی حقوق محفوظ است. نمارنگ ©
                </div>
                <div className={"ltr min-w-32 max-w-32  w-32 overflow-hidden font-mono"}>

                    <time dateTime={currentTime.date.toISOString()}>
                        {currentTime.persianStringDateTime}
                    </time>
                </div>
            </div>
        );
    } catch (error) {
        return (<>{error.toString()}</>)
    }

};

export default FooterDashboard;