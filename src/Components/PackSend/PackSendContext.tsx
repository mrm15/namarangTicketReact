import {createContext} from 'react';
import {IPackSend, IPackSendContextType} from "./myTypes.tsx";

// export const AdminReportContext = createContext<AdminReportContextType | undefined>(undefined);
export const PackSendContext = createContext<IPackSendContextType | undefined>(undefined);
