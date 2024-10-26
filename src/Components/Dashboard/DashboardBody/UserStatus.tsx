import HeaderMenu from "./HeaderMenu.tsx";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import Modal from "../../Modal/Modal.tsx";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const STATUS = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    AWAY: 'away',
    BUSY: 'busy',
};

function UserStatus() {
    const getCurrentStatusUrl = 'userStatus/getUserStatus';
    const setNewStatusUrl = 'userStatus/setUserStatus';
    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false);

    const myAxios = useAxiosPrivate();

    // Query function for fetching current status
    const queryFn = async ({ signal }) => {
        const result = await myAxios.get(getCurrentStatusUrl, { signal });
        return result.data; // Make sure to return the correct data structure
    };

    // UseQuery hook with loading and error handling
    const { data, isLoading, isError, refetch , isFetching , isRefetching } = useQuery({
        queryKey: ["userStatus"],
        queryFn,
        staleTime: 0,
        enabled: true,
        refetchOnWindowFocus: false,
    });

    // Extract userStatus safely
    const userStatus = data?.userStatus;

    // Function to handle status changes
    const changeUserStatusHandler = async (newStatus) => {
        let tId;
        try {
            tId = toast.loading('در حال آپدیت استاتوس');
            const result = await myAxios.post(setNewStatusUrl, { userStatus: newStatus });
            toast.dismiss(tId);
            if (result.data) {
                void refetch(); // Re-fetch the data after updating status
                closeModal()
            }
        } catch (error) {
            toast.dismiss(tId);
            console.log(error.toString());
        }
    };

    // Loading and error states
    if (isLoading) return <div></div>;
    if (isError) return <div></div>;
    if (isRefetching) return <div></div>;
    if (isFetching) return <div></div>;

    return (
        <>
            {isOpenModal && (
                <Modal
                    showButtons={false}
                    closeModal={closeModal}
                    title={"تغییر وضعیت کاربر"}
                >
                    <div className="flex flex-col justify-end items-start gap-4">
                        <button title={'آنلاین'} onClick={() => changeUserStatusHandler(STATUS.ONLINE)}>
                            🟢 آنلاین
                        </button>
                        <button title={'آفلاین'} onClick={() => changeUserStatusHandler(STATUS.OFFLINE)}>
                            🔴 آفلاین
                        </button>
                        <button title={'مشغول'} onClick={() => changeUserStatusHandler(STATUS.BUSY)}>
                            ⛔ مشغول
                        </button>
                        <button title={'همین دو رو برا'} onClick={() => changeUserStatusHandler(STATUS.AWAY)}>
                            ⏳ همین دو رو برا
                        </button>
                    </div>
                </Modal>
            )}
            <div className={'flex cursor-pointer px-3'} onClick={() => setIsOpenModal(true)}>
                <>
                    {userStatus === STATUS.ONLINE && (
                        <div title={'آنلاین'}>
                            🟢
                        </div>
                    )}
                    {userStatus === STATUS.OFFLINE && (
                        <div title={'آفلاین'}>
                            🔴
                        </div>
                    )}
                    {userStatus === STATUS.BUSY && (
                        <div title={'مشغول'}>
                            ⛔
                        </div>
                    )}
                    {userStatus === STATUS.AWAY && (
                        <div title={'همین دو رو برا'}>
                            ⏳
                        </div>
                    )}
                    {userStatus === undefined && <div>...</div>}
                </>
            </div>
        </>
    );
}

export default UserStatus;
