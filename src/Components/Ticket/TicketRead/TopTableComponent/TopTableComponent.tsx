import {lazy, Suspense} from 'react';
import useAuth from "../../../../hooks/useAuth.tsx";
import { PAGES } from "../../../../Pages/Route-string.tsx";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";
// Lazy load the components
const ForwardTicketContainer = lazy(() => import('./ForwardTicketContainer.tsx'));
const MarkAsReadTicketAssignments = lazy(() => import('./MarkAsReadTicketAssignments.tsx'));

const TopTableComponent = () => {
    const { auth } = useAuth();
    const hasAccessToForwardTickets = auth?.userInfo?.roleAccessList?.includes("forwardTickets");
    const isDepartmentAdmin = auth.userInfo?.isDepartmentAdmin;
    const hasInboxAccess = auth.userInfo?.roleAccessList?.includes('assignTicketsInbox');

    const userIsInInboxPageOrInboxDepartmentPage =
        window.location.href.includes(PAGES.ticket_read_assign_tickets_inbox) ||
        window.location.href.includes(PAGES.ticket_read_department_tickets);

    const hasAccessToButtonMarkAsRead = (isDepartmentAdmin || hasInboxAccess)
        && userIsInInboxPageOrInboxDepartmentPage;

    return (
        <div className={"flex gap-2"}>
            {hasAccessToForwardTickets && (
                <Suspense fallback={<LittleSpinner/>}>
                    <ForwardTicketContainer/>
                </Suspense>
            )}
            {hasAccessToButtonMarkAsRead && (
                <Suspense fallback={<LittleSpinner/>}>
                    <MarkAsReadTicketAssignments/>
                </Suspense>
            )}
        </div>
    );
};

export default TopTableComponent;
