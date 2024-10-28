// hooks/useChangeTicketReadStatus.tsx
import useAxiosPrivate from "./useAxiosPrivate.tsx";

interface PropType {
    ticketType: "ticket" | "assignment";
    idArray: any[];
    newStatus: boolean;
}

const useChangeTicketReadStatus = () => {
    const myPrivateAxios = useAxiosPrivate()

    const changeReadStatus = async ({ ticketType, idArray, newStatus }: PropType) => {
        let url = "";
        let data = {};

        if (ticketType === "assignment") {
            url = "/ticket/markAsReadTicketAssignments"; // Update to the actual endpoint for assignments
            data = {
                idArray: idArray,
                readStatus: newStatus
            };
        } else if (ticketType === "ticket") {
            url = "/ticket/markAsReadTickets"; // Update to the actual endpoint for tickets
            data = {
                ticketAssignmentIdsArray123: idArray,
                readStatus: newStatus
            };
        }

        try {
            const response = await myPrivateAxios.post(url, data);
            return response?.data?.message
        } catch (err) {
            console.error("Failed to update read status:", err);
            throw err;
        }
    };

    return changeReadStatus;
};

export default useChangeTicketReadStatus;
