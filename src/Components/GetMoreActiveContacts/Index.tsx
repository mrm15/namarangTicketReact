import React from 'react';
import createDynamicContext from "../DynamicContext/DynamicContext.tsx";
import GetData from "./GetData.tsx";
import ShowTableData from "./ShowTableData.tsx";

export const {
    Provider: GetMoreActiveContactsProvider,
    useDynamicContext: useMoreActiveContactsContext
} = createDynamicContext<any>();

const Index = () => {


    return (
        <GetMoreActiveContactsProvider initialData={
            {
                factorList: [],
                mostUserData: [],
            }
        }>
            <GetData/>
            <ShowTableData />
        </GetMoreActiveContactsProvider>
    );
};

export default Index;