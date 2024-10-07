import React from 'react';
import ForwardTicketContainer from "./ForwardTicketContainer.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";

const TopTableComponent = () => {
    const {auth} = useAuth();
    const hasAccessToForwardTickets = auth?.userInfo?.roleAccessList?.includes("forwardTickets")



    return (
        <div>
            {hasAccessToForwardTickets && <ForwardTicketContainer/>}
        </div>
    );
};

export default TopTableComponent;
