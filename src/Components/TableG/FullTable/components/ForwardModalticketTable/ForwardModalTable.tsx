import "./style.scss"
import SelectedTicketsInModal from "./SelectedTicketsInModal.tsx";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import React, {useEffect, useState} from "react";
import FullAdminSection from "./FullAdminSection.tsx";
import DepartmentAdminViewSection from "./DepartmentAdminViewSection.tsx";
import UsualUserViewSection from "./UsualUserViewSection.tsx";
import useObjectDataHolder from "../../../../../hooks/UseObjectDataHolder.tsx";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.tsx";
import Modal from "../../../../Modal/Modal.tsx";


function ForwardModalTable({ selectedItems, setReload, ...rest}) {

    const requestUrl = '/forward/submit'
    const [selectedData, setSelectedData] = useObjectDataHolder({
        tickets: [],
        department: '',
        user: '',
    });
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        setSelectedData({tickets: [...selectedItems]})
    }, [selectedItems]);

    const [userList, setUserList] = useState([])


    const {data, isLoading, error} = useQuery<any>({
        queryKey: ['forwardConfig'],
        staleTime:8600000,
    });



    const onSubmit = async () => {

        const tempSelectedData = {...selectedData}
        tempSelectedData.tickets = [...selectedItems]


        if (tempSelectedData.department === '' && tempSelectedData.user === '') {
            toast.error('حداقل یک مورد را انتخاب کنید.')
            return;
        }

        if (tempSelectedData.tickets.length === 0) {
            toast.error('حداقل یک تیکت را انتخاب کنید.')
            return;
        }


        try {
            const myResult = await axiosPrivate.post(requestUrl, tempSelectedData);
            toast.success(myResult?.data?.message);
            setReload()
            rest?.closeModal()


        } catch (error) {
            toast.error(error.toString)
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

                       onSubmit={onSubmit}
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

                </Modal>
            </div>
        );
    } catch (error) {

        return <>{error.toString()}</>
    }
}

export default ForwardModalTable;