import React from 'react';
import "./loader3.scss"

const Loader3 = ({text = " در حال به روز رسانی"}) => {
    return (
        <div className={"flex justify-center items-center "}>
            <div
                className={"loader3"}
            >
                <div className="lds-dual-ring"></div>
                <div>
                    {text}
                </div>
            </div>

        </div>
    );
};

export default Loader3;
