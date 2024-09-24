import React from 'react';
import Loader3 from "../../../Loader/Loader3.tsx";
import {flexRender} from "@tanstack/react-table";

const LoadInTable = () => {



    try {


        return <div className={""}>
            <div
                className={" center__absolut bg-white min-h-40 h-full w-full opacity-80"}
            >
                <Loader3/>
            </div>
        </div>

    } catch (error) {
        return <tr>
            <td>{error.toString()}</td>
        </tr>
    }
};

export default LoadInTable;
