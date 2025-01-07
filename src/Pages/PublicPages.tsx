import React from 'react';
import {Route, Routes} from "react-router-dom";
import PublicPriceList from "../Components/Public/PriceList/PublicPriceList.tsx";

const PublicPages = () => {
    return (
        <Routes>
            <Route path="price-list" element={<PublicPriceList />} />
        </Routes>
    );
};

export default PublicPages;