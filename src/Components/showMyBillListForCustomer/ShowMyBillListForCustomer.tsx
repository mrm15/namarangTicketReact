import React from 'react';
import useAuth from "../../hooks/useAuth.tsx";
import TableG from "../TableG/TableG.tsx";

const ShowMyBillListForCustomer = () => {

    const {auth} = useAuth()

    const ContactCode = auth.userInfo.userData.contactCode
    const defaultFilter = [
        {property: "Contact.Code", operator: "=", value: ContactCode}
    ]

    console.log(ContactCode)

    return (
        <div>
            <TableG
                url={"/hesabfa/getBillListData?"} // علامت سوال برای اینکه صرفا هدر جدول رو از یه جای دیگه بگیرم و این توی ارسال درخواست تاثیری نداره
                    filters={defaultFilter}
                />
        </div>
    );
};

export default ShowMyBillListForCustomer;