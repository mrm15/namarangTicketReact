import React from 'react';
import axios from "../../../api/axios.tsx";
import {useQuery} from "@tanstack/react-query";
import ShowMenuAndSubMenus from "./ShowMenuAndSubMenus.tsx";

const PublicPriceList = () => {

    return (
            <div><ShowMenuAndSubMenus/></div>
    );
};

export default PublicPriceList;
