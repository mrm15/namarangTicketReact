
import React, { createContext, useContext, useState, ReactNode } from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder";

interface ContextProps<T extends object> {
    data: T;
    // setData: (data: T) => void;
    setData: any;
}

function createDynamicContext<T extends object>() {
    const Context = createContext<ContextProps<T> | undefined>(undefined);

    const Provider: React.FC<{ children: ReactNode; initialData: T }> = ({ children, initialData }) => {
        const [data, setData] = useObjectDataHolder<T>(initialData);
        return (
            <Context.Provider value={{ data, setData }}>
                {children}
            </Context.Provider>
        );
    };

    const useDynamicContext = () => {
        const context = useContext(Context);
        if (!context) {
            throw new Error('useDynamicContext must be used within a Provider');
        }
        return context;
    };

    return { Provider, useDynamicContext };
}

export default createDynamicContext;
