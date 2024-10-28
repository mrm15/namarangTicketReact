import useAuth from "./useAuth.js";
import useAxiosPrivate from "./useAxiosPrivate.tsx";

interface PropType {
    ticketType: "ticket" | "assignment";
    newStatus: boolean;
    idArray: any[]
}

const useChangeTicketReadStatus = ({ticketType, idArray, newStatus}: PropType) => {

    let url = "";
    let data = {};
    if (ticketType === "assignment") {
        url = "";
        data = {
            rrr: idArray
        }
    } else {
        url = "/"
        data = {
            rrr: idArray
        }
    }

    const myPrivateAxios = useAxiosPrivate()
    const changeReadStatus = async () => {
        try {
            await myPrivateAxios.post(url, data);
        } catch (err) {
            console.error(err);
        }
    }

    return changeReadStatus;
}

export default useChangeTicketReadStatus