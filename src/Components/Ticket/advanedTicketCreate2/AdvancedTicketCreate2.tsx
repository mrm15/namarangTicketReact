import React from 'react';
import {AdvancedTicketContextProvider} from "./AdvancedTicketContext";
import AdvancedTicketCreateComponent from "./AdvancedTicketCreateComponent/AdvancedTicketCreateComponent";
import {initialDataAdvancedTicketCreate2} from "./AdvancedTicketTypes.tsx";

const AdvancedTicketCreate2 = () => {
    return (
        <AdvancedTicketContextProvider initialData={initialDataAdvancedTicketCreate2}>
            <AdvancedTicketCreateComponent/>
        </AdvancedTicketContextProvider>
    );


};

export default AdvancedTicketCreate2;