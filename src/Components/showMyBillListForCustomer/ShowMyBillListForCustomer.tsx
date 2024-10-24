import React from 'react';
import useAuth from "../../hooks/useAuth.tsx";
import TableG from "../TableG/TableG.tsx";

const ShowMyBillListForCustomer = () => {

    const {auth} = useAuth()

    const ContactCode = auth.userInfo.userData.contactCode
    const defaultFilter = [
        {property: "ContactCode", operator: "=", value: ContactCode}
    ]

    console.log(ContactCode)

    return (
        <div>
            <TableG
                url={"/hesabfa/getBillListData"}
                    filters={defaultFilter}
                />
        </div>
    );
};

export default ShowMyBillListForCustomer;