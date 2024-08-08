import React, { useEffect } from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import { TableGContext } from "./TableGContext.tsx";
import FullTable from "./FullTable/FullTable.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {IMyData} from "./myTableGTypes.tsx";

const TableG = ({ url = "/user/read" }) => {
    const [myData, setMyData] = useObjectDataHolder<IMyData>({
        url: url,
        pageNumber: 1,
        currentPage: 1,
        numberOfRows: 5,
        columns: [],
        tableData: [],
        filter: [],
        totalRows: 75,
        reload: "",
        isLoading: false,
        errorMessage: "",
    });

    const myAxios = useAxiosPrivate();

    useEffect(() => {
        setMyData({ url });
    }, [setMyData, url]);

    useEffect(() => {
        const updateData = async () => {
            if (myData.isLoading) return;

            setMyData({ isLoading: true });
            const data = {
                page: myData.pageNumber,
                pageSize: myData.numberOfRows,
                filters: myData.filter,
            };

            try {
                const res = await myAxios.post(url, data);
                if (res.status === 200) {
                    const responseObject = res.data;
                    setMyData({
                        errorMessage: "",
                        totalRows: responseObject.totalDocuments,
                        tableData: responseObject.results,
                        pageNumber: responseObject.currentPage,
                        isLoading: false,
                    });
                } else {
                    setMyData({ errorMessage: "Error Data Try Again!!!" });
                }
            } catch (error) {
                setMyData({ errorMessage: "Error Data Try Again!!!", isLoading: false });
            }
        };

        void updateData();
    }, [myAxios, myData.reload, setMyData, url]);

    const loaderHandle = () => {
        setMyData({ isLoading: !myData.isLoading });
    };

    return (
        <TableGContext.Provider value={{ myData, setMyData }}>
            <div>
                <button onClick={loaderHandle}>loader</button>
                <FullTable />
            </div>
        </TableGContext.Provider>
    );
};

export default TableG;
