import React from 'react';
import Loader3 from "../../../Loader/Loader3.tsx";
import {flexRender} from "@tanstack/react-table";

const LoadInTable = () => {



    try {


        return <div className={""}>
            <div
                className={" center__absolut min-h-40  w-screen opacity-80"}
            >
                <Loader3 text={"در حال بروز رسانی جدول..."}/>
            </div>
        </div>

    } catch (error) {
        return <tr>
            <td>{error.toString()}</td>
        </tr>
    }
};

export default LoadInTable;
