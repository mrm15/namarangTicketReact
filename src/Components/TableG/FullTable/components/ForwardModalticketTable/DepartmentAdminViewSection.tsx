import React, { useState } from 'react';
import SelectOptionListView from "./SelectOptionListView.tsx";

const DepartmentAdminViewSection = ({ mode, departmentList, setSelectedData, destinationUserList }) => {
    const [whichView, setWhichView] = useState(1);
    // 0: just send to user, 1: send to users in my department

    const handleChange = (value) => {
        setWhichView(parseInt(value));
        setSelectedData({ department: '', user: '' });
    };

    try {
        return (
            <div className="max-w-lg mx-auto" title="دسترسی مدیر دپارتمان">
                <div className="text-center text-2xl text-blue-500 mb-4">🏬</div>
                <div className="flex justify-center mb-4">
                    <div className="flex gap-2 border border-gray-300 p-2 rounded-md cursor-pointer">
                        <div
                            className={`p-1 rounded ${whichView === 1 ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => handleChange(1)}
                        >
                            ارسال به دپارتمان
                        </div>
                        <div
                            className={`p-1 rounded ${whichView === 0 ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => handleChange(0)}
                        >
                            ارسال به کاربران
                        </div>
                    </div>
                </div>

                <div className="p-3 rounded-md bg-white shadow-md">
                    {whichView === 1 && (
                        <div className="mb-4">
                            <div className="text-lg font-semibold text-gray-700 mb-2">انتخاب دپارتمان</div>
                            <SelectOptionListView
                                myOptions={departmentList}
                                myKey="department"
                                setSelectedData={setSelectedData}
                            />
                        </div>
                    )}
                    {whichView === 0 && (
                        <div className="mb-4">
                            <div className="text-lg font-semibold text-gray-700 mb-2">انتخاب کاربر</div>
                            <SelectOptionListView
                                myOptions={destinationUserList}
                                myKey="user"
                                setSelectedData={setSelectedData}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        return <div className="text-red-500">{error.toString()}</div>;
    }
};

export default DepartmentAdminViewSection;
