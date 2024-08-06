import React from 'react';
import "./loader3.scss"

const Loader3 = () => {
    return (
        <div className={"flex justify-center items-center "}>
            <div
                className={"loader3"}
            >
                <div className="lds-dual-ring"></div>
                <div>
                    در حال به روز رسانی
                </div>
            </div>

        </div>
    );
};

export default Loader3;
