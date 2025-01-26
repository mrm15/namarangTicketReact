import React, {useEffect, useState} from 'react';
import useObjectDataHolder from "../../../../../hooks/UseObjectDataHolder";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "../../../../Modal/Modal";
import SelectedTicketsInModal from "../ForwardModalticketTable/SelectedTicketsInModal";

const ChangeTicketStatusModal = ({selectedItems, setReload, ...rest}) => {

    const requestUrl = '/ticket/changeStatus'
    const [selectedData, setSelectedData] = useObjectDataHolder({
        ticketIdArray: [],
        newStatus: '',
    });
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        setSelectedData({ticketIdArray: [...selectedItems]})
    }, [selectedItems, setSelectedData])


    const myAxiosPrivate = useAxiosPrivate()
    const {auth} = useAuth()
    const queryFn = () => {
        return myAxiosPrivate.get('/status/statusList/')
    }
    const isEnableForwarding = auth.userInfo.roleAccessList.includes('forwardTickets')

    const {data, isLoading, error} = useQuery({
        queryKey: ['statusList'],
        queryFn,
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: isEnableForwarding,
    })


    const [isSending, setIsSending] = useState(false)
    const onSubmit = async () => {

        const tempSelectedData = {...selectedData}
        tempSelectedData.ticketIdArray = [...selectedItems]


        if (tempSelectedData.newStatus === '' && tempSelectedData.ticketIdArray.length !== 0) {
            toast.error('حداقل یک مورد را انتخاب کنید.')
            return;
        }

        tempSelectedData.ticketIdArray = tempSelectedData.ticketIdArray.map(row => row._id)

        try {
            const tid = toast.loading("در حال ارسال...")
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
                                <div className={"flex gap-2 flex-col  w-full  justify-center items-center "}>{
                                    data?.data?.list?.map(row => <button
                                        onClick={()=>setSelectedData({newStatus: row.value})}
                                        className={`w-60  py-2  rounded   ${selectedData.newStatus ===row.value ? " bg-blue-300  " :   "  bg-gray-300 "} `}
                                        key={row.value}>{row.key}</button>)
                                }</div>
                            </> :
                            <div>اطلاعات مربوط به استاتوس یافت نشد لطفا مجددا تلاش کنید. </div>
                        }
                    </div>
                </Modal>
            </div>
        );
    } catch (error) {

        return <>{error.toString()}</>
    }
}

export default ChangeTicketStatusModal;