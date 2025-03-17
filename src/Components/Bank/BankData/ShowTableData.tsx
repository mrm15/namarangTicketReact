import React from 'react';
import SingleItemInTable from "./SingleItemInTable.tsx";

const ShowTableData = ({ data }) => {
    try {
        if (!data || !data.data || data.data.length === 0) {
            // نمایش اسکلتی برای زمان لود شدن
            return (
                <div>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="p-4 border rounded-md my-2 bg-gray-200 animate-pulse">
                            در حال بارگذاری...
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                {data.data?.details && <SingleItemInTable contactsValue={data.data?.details}  />}
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800">
                    <tr>
                        <th className="py-3 px-6 text-right text-sm font-medium text-white uppercase tracking-wider">نام</th>
                        <th className="py-3 px-6 text-right text-sm font-medium text-white uppercase tracking-wider">مقدار</th>
                        {
                            data?.data[0]?.contactsValue &&
                            <th
                            className="py-3 px-6 text-right text-sm font-medium text-white uppercase tracking-wider">جزئیات</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {data?.data && data?.data.length>0 && data?.data?.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-100 transition duration-150">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.name}</td>
                            <td className="py-4 px-6 text-sm text-gray-700">{item.value}</td>
                            {item?.contactsValue && <SingleItemInTable contactsValue={item?.contactsValue}  />}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        console.error('Error rendering ShowTableData:', error);
        return (
            <div className="p-4 text-red-500">
                ...
            </div>
        );
    }
};

export default ShowTableData;
