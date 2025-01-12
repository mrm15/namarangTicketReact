import React from 'react';
import axios from "../../../api/axios.tsx";
import {useQuery} from "@tanstack/react-query";
import ShowMenuAndSubMenus from "./ShowMenuAndSubMenus.tsx";

const PublicPriceList = () => {

    return (
        <div className={"p-2"}>
            <div><ShowMenuAndSubMenus/></div>
        </div>
    );
};

export default PublicPriceList;
