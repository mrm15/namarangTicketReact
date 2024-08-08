import {createContext} from 'react';
import {myTableGContext} from "./myTableGTypes.tsx";



export const TableGContext = createContext<myTableGContext | undefined>(undefined);
