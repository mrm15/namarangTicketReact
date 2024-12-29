import {configureStore} from "@reduxjs/toolkit";
import {requestToGetCategoryListReducer} from "./requestTogetCategoryList.tsx";
import {productListReducer} from "./ProductList/ProductList.tsx";
import {sellFactorSlice} from "./SellFactor/SellFactor.tsx";
import {sidebarReducer} from "./sidebarReducer/sidebarReducer.tsx";
import websocketSlice from "./websocket/websocketSlice.tsx";

const store = configureStore({
    reducer: {
        requestToGetCategoryListReducer: requestToGetCategoryListReducer.reducer,
        productListReducer: productListReducer.reducer,
        sellFactorReducer:sellFactorSlice.reducer,
        sidebarReducer : sidebarReducer.reducer,
        websocket: websocketSlice, // اضافه کردن WebSocket Slice



    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
