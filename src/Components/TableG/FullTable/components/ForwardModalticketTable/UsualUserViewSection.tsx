import React from 'react';
import SelectOptionListView from "./SelectOptionListView.tsx";

const UsualUserViewSection = ({ mode, setSelectedData, destinationUserList }) => {
    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="text-lg font-semibold text-gray-700 mb-2">انتخاب کاربر</div>
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <SelectOptionListView
                    myOptions={destinationUserList}
                    myKey="user"
                    setSelectedData={setSelectedData}
                />
            </div>
        </div>
    );
};

export default UsualUserViewSection;
