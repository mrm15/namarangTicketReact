import React from 'react';
import {useMoreActiveContactsContext} from "./Index";
import "./ShowTableData.scss"

const ShowTableData = () => {
    const {data, setData} = useMoreActiveContactsContext()


    try {
        return (
            <div className={"ShowTableData"}>
                <table>

                    <thead>
                    <tr>
                        <th>{"ردیف"}</th>
                        <th>{"نام و نام خانوادگی"} </th>
                        <th>{"نام نمایشی"}</th>
                        <th>{"عنوان مشتری"}</th>
                        <th>{"موبایل"}</th>
                        <th>{"تعداد سفارش"}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.mostUserData.map((row, index) => <tr>
                        <td>{index}</td>
                        <td>{row.FirstName} {row.LastName} </td>
                        <td>{row.Name}</td>
                        <td>{row.ContactTitle}</td>
                        <td>{row.Mobile}</td>
                        <td>{row.numberOfOrders}</td>


                    </tr>)}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ShowTableData;