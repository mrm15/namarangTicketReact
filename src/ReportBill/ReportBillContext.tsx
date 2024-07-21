import  { createContext } from 'react';
import {ReportBillContextType} from "./myTypes.tsx";

export const ReportBillContext = createContext<ReportBillContextType | undefined>(undefined);
