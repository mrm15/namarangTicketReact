import HeaderMenu from "./HeaderMenu.tsx";
import {useEffect, useRef, useState} from "react";
import {FaUserCircle} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import Modal from "../../Modal/Modal.tsx";
import {toast} from "react-toastify";

const STATUS = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    AWAY: 'away',
    BUSY: 'busy',
}

function UserStatus() {


    const getCurrentStatusUrl = 'userStatus/getUserStatus'
    const setNewStatusUrl = 'userStatus/setUserStatus'
    const [userStatus, setUserStatus] = useState(undefined);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false)


    const myAxios = useAxiosPrivate()
    useEffect(() => {
        const getStatus = async () => {
            try {
                const result = await myAxios.get(getCurrentStatusUrl);
                if (result.data) {
                    setUserStatus(result?.data?.userStatus);

                }
            } catch (error) {
                console.log(error.toString())
            }
        }

        void getStatus()
    }, []);


    const changeUserStatusHandler = async (newStatus) => {
        let tId
        try {

            tId = toast.loading('در حال آپدیت استاتوس')
            const result = await myAxios.post(setNewStatusUrl, {userStatus: newStatus});
            toast.dismiss(tId)
            console.log(result.data)
            if (result.data) {
                setUserStatus(result?.data?.userStatus);
                closeModal()
            }
        } catch (error) {
            toast.dismiss(tId)
            console.log(error.toString())
        }
    }

    try {

        return (
            <>
                {isOpenModal && <Modal
                  showButtons={false}
                  closeModal={closeModal}
                  title={"تغییر وضعیت کاربر"}
                    // onSubmit={submitAddGroupKala}
                >
                  <>
                    <div
                      className="flex flex-col justify-end items-start gap-4"
                    >
                      <button title={'آنلاین'}
                              onClick={() => changeUserStatusHandler(STATUS.ONLINE)}
                      >
                        🟢
                        آنلاین
                      </button>


                      <button title={'آفلاین'}
                              onClick={() => changeUserStatusHandler(STATUS.OFFLINE)}
                      >
                        🔴
                        آفلاین
                      </button>

                      <button
                        onClick={() => changeUserStatusHandler(STATUS.BUSY)}
                        title={'مشغول'}>
                        ⛔
                        مشغول
                      </button>

                      <button
                        onClick={() => changeUserStatusHandler(STATUS.AWAY)}
                        title={'همین دو رو برا'}>
                        ⏳
                        همین دو رو برا
                      </button>


                    </div>

                  </>

                </Modal>}
                <div className={'flex cursor-pointer px-3'}
                     onClick={() => setIsOpenModal(true)}
                >

                    <>
                        {userStatus === STATUS.ONLINE && <div>
                          <div title={'آنلاین'}>
                            🟢
                          </div>
                        </div>}
                        {userStatus === STATUS.OFFLINE && <div>
                          <div title={'آفلاین'}>
                            🔴
                          </div>
                        </div>}
                        {userStatus === STATUS.BUSY && <>
                          <div title={'مشغول'}>
                            ⛔
                          </div>
                        </>}
                        {userStatus === STATUS.AWAY && <>
                          <div title={'همین دو رو برا'}>
                            ⏳
                          </div>
                        </>}
                        {userStatus === undefined && <>.</>}
                    </>


                </div>
            </>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default UserStatus;
