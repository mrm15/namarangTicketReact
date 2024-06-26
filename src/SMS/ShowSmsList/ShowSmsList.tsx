import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import AggridDataShow from "../../Components/AgGridDataShow/AgGridDataShow.tsx";
import Loader from "../../Components/Loader";
import {useParams} from "react-router-dom";

const ShowSmsList = ({type}) => {

    const urlPath = useParams()['*']
    console.log(urlPath)
    let requestUrl = ""
    if (type === "archive") {
        requestUrl = '/sms/getArchive';
    } else {
        requestUrl = '/sms/getPending';
    }
    const [isLoading, setIsLoading] = useState(true)
    const [myTableData, setMyTableData] = useState({
        columnDefs: [],
        rowData: []
    });
    const myAxiosPrivate = useAxiosPrivate();

    useEffect(() => {


        const getList = async () => {
            setIsLoading(true)
            const res = await myAxiosPrivate.get(requestUrl)
            if (res?.data?.list) {
                const tableData = res.data.list;


                setMyTableData(tableData)
                setIsLoading(false)
            }
        }

        void getList()


    }, [urlPath]);
    type MyStateType = {
        [key: string]: any;
    };
    const [myGridRefState, setMyGridRefState] = useState<MyStateType>()


    return (
        <div>
            <div className={'font-bold my-3 '}>
                <div
                    className={'bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'}
                >
                    <div>
                        لیست پیام های
                      &nbsp;
                        {type === "archive" ? "آرشیو شده" : "آماده ارسال"}
                    </div>
                    <div
                        className={'flex flex-wrap justify-center items-center mx-2'}
                    >
                    </div>
                </div>
            </div>

            <div>
                {isLoading && <Loader/>}
                {!isLoading && <AggridDataShow
                    // setMyGridRefState={setMyGridRefState}
                  columnDefs={myTableData?.columnDefs}
                  rowData={myTableData?.rowData}
                    // onCellClicked={onCellClicked}
                    // onSelectionChanged={handleOnSelectionChanged}
                />}
            </div>
        </div>
    );
};

export default ShowSmsList;
