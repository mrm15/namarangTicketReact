import React, {useContext} from 'react';
import {PackSendContext} from "../PackSendContext.tsx";
import TableG from "../../TableG/TableG.tsx";

const PackSendMain = () => {
    const context = useContext(PackSendContext);
    const { myData, setMyData } = context;
    return (
        <div>
            <TableG
            url={"/hesabfa/getBillListData"}
            />
        </div>
    );
};

export default PackSendMain;
