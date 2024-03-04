import {createSlice} from "@reduxjs/toolkit";
import {fillInput} from "../functions";

const initialState = {
    isOpen: false,
    isMobile: window.innerWidth <= 768
}

const reducerSideBar = {
    fillInput,
}

export const sidebarReducer = createSlice({
    name: 'sidebar',
    initialState,
    reducers: reducerSideBar
});


export const sidebarActions = sidebarReducer.actions
