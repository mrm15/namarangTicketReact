import React from 'react';
import MyDatePicker2 from '../../myDatePicker2/MyDatePicker2.tsx';
import { useAccountingReportsContext } from '../AccountingReportsContext.tsx';

const ReportFilters = () => {
    const { data, setData } = useAccountingReportsContext();

    const filterData = {
        startDate: data?.filters?.find(r => r['uniqId'] === 'startDate')?.showValue || null,
        endDate: data?.filters?.find(r => r['uniqId'] === 'endDate')?.showValue || null,
        status: data?.filters?.find(r => r['uniqId'] === 'status')?.Value ?? null,
    };

    const handleChangeDate = ({ dateFrom, uniqId }) => {
        const updatedFilters = data.filters.filter(r => r["uniqId"] !== uniqId);

        if (dateFrom && dateFrom.jsDate !== null) {
            updatedFilters.push({
                uniqId,
                Property: 'Date',
                Operator: uniqId === 'startDate' ? '>=' : '<',
                Value: dateFrom.hesabfaFormatDate,
                showValue: dateFrom.jsDate,
            });
        }

        setData({ filters: updatedFilters });
    };
    const handleStatusChange = (status) => {
        const updatedFilters = data.filters.filter(r => r["uniqId"] !== 'status');

        if (status !== null) {
            updatedFilters.push({
                uniqId: 'status',
                Property: 'Status',
                Operator: '=',
                Value: status,
            });
        }

        setData({ filters: updatedFilters });
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex space-x-2">
                <button
                    onClick={() => handleStatusChange(null)}
                    className={`px-4 py-2 rounded ${
                        filterData.status === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    همه ی فاکتور ها
                </button>
                <button
                    onClick={() => handleStatusChange(1)}
                    className={`px-4 py-2 rounded ${
                        filterData.status === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    فقط تایید شده ها
                </button>
                <button
                    onClick={() => handleStatusChange(0)}
                    className={`px-4 py-2 rounded ${
                        filterData.status === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    فقط تایید نشده ها
                </button>
            </div>

            <div className={"flex gap-2"}>
                <div className="mb-4">
                    <label className="block text-gray-700">تاریخ شروع</label>
                    <MyDatePicker2
                        value={filterData.startDate}
                        onChange={(date) => handleChangeDate({dateFrom: date, uniqId: 'startDate'})}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">تاریخ پایان</label>
                    <MyDatePicker2
                        value={filterData.endDate}
                        onChange={(date) => handleChangeDate({dateFrom: date, uniqId: 'endDate'})}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportFilters;
