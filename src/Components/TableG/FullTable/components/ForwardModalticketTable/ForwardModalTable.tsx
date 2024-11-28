import "./style.scss"
import SelectedTicketsInModal from "./SelectedTicketsInModal.tsx";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import React, {useEffect, useState} from "react";
import FullAdminSection from "./FullAdminSection.tsx";
import DepartmentAdminViewSection from "./DepartmentAdminViewSection.tsx";
import UsualUserViewSection from "./UsualUserViewSection.tsx";
import useObjectDataHolder from "../../../../../hooks/UseObjectDataHolder.tsx";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.tsx";
import Modal from "../../../../Modal/Modal.tsx";
import useAuth from "../../../../../hooks/useAuth.tsx";


function ForwardModalTable({selectedItems, setReload, ...rest}) {

    const requestUrl = '/forward/submit'
    const [selectedData, setSelectedData] = useObjectDataHolder({
        ticketIdsArray: [],
        department: '',
        user: '',
    });
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        setSelectedData({ticketIdsArray: [...selectedItems]})
    }, [selectedItems, setSelectedData])

    const [userList, setUserList] = useState([])

    const myAxiosPrivate= useAxiosPrivate()
    const {auth} = useAuth()
    const queryFn = () => {
        return myAxiosPrivate.get('/forward/getConfig/')
    }
    const isEnableForwarding = auth.userInfo.roleAccessList.includes('forwardTickets')

    const {data, isLoading, error} =useQuery({
        queryKey: ['forwardConfig'],
        queryFn,
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: isEnableForwarding,
    })


    const [isSending, setIsSending] = useState(false)
    const onSubmit = async () => {

        const tempSelectedData = {...selectedData}
        tempSelectedData.ticketIdsArray = [...selectedItems]


        if (tempSelectedData.department === '' && tempSelectedData.user === '') {
            toast.error('حداقل یک مورد را انتخاب کنید.')
            return;
        }

        if (tempSelectedData.ticketIdsArray.length === 0) {
            toast.error('حداقل یک تیکت را انتخاب کنید.')
            return;
        }
        tempSelectedData.ticketIdsArray = tempSelectedData.ticketIdsArray.map(row => row._id)

        try {
            const tid= toast.loading("در حال ارسال...")
            setIsSending(true)
            const myResult = await axiosPrivate.post(requestUrl, tempSelectedData);
            toast.success(myResult?.data?.message);
            toast.dismiss(tid)
            setReload()
            rest?.closeModal()


        } catch (error) {
            toast.error(error.toString)
            toast.dismiss()
        }

    }


    const listView = data?.data?.list;
    const mode: 'admin' | 'departmentAdmin' | 'usualUser' | undefined = data?.data?.list?.mode;

    const departmentList = data?.data?.list?.departmentList;
    const destinationUserList = data?.data?.list?.destinationUserList;


    useEffect(() => {

        if (mode === 'admin') {
            const temp = departmentList.find((row: { id: any; }) => row.id === selectedData.department)

            setUserList(temp?.userList)
        }

    }, [selectedData]);


    useEffect(() => {
        setSelectedData({...selectedData, user: ''})
    }, [selectedData.department]);


    try {
        return (
            <div>
                <Modal {...rest}

                       showButtons={!isSending}
                       onSubmit={onSubmit}
                >
                    <div
                        className={"sm:min-w-640 "}
                    >


                        {data ?
                            <>
                                <SelectedTicketsInModal
                                    selectedItems={selectedItems}
                                />

                                {mode === 'admin' && <FullAdminSection
                                    mode={mode}
                                    departmentList={departmentList}
                                    setSelectedData={setSelectedData}
                                    userList={userList}
                                />}
                                {mode === 'departmentAdmin' && <DepartmentAdminViewSection
                                    mode={mode}
                                    departmentList={departmentList}
                                    setSelectedData={setSelectedData}
                                    destinationUserList={destinationUserList}
                                />
                                }
                                {mode === 'usualUser' && <UsualUserViewSection
                                    mode={mode}
                                    setSelectedData={setSelectedData}
                                    destinationUserList={destinationUserList}
                                />
                                }

                            </> :
                            <div>اطلاعات مربوط به ارجاع یافت نشد لطفا مجددا تلاش کنید. </div>
                        }

                        {/*<div className={'h-6'}>کاربر مقصد : {selectedData.user}</div>*/}
                        {/*<div className={'h-6'}>دپارتمان مقصد : {selectedData.department}</div>*/}
                    </div>
                </Modal>
            </div>
        );
    } catch (error) {

        return <>{error.toString()}</>
    }
}

export default ForwardModalTable;