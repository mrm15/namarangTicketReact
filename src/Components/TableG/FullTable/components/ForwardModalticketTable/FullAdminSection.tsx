import React from 'react';
import SelectOptionListView from "./SelectOptionListView.tsx";

const FullAdminSection = ({ mode, departmentList, setSelectedData, userList }) => {
    return (
        <div className="max-w-lg mx-auto" title={"دسترسی به کل سازمان"}>
            <div className="flex flex-wrap ">
                <div className="w-full ">
                    <div className=" p-3 rounded-md ">
                        <SelectOptionListView
                            myOptions={departmentList}
                            myKey="department"
                            setSelectedData={setSelectedData}
                            defaultLabel={"انتخاب دپارتمان"}
                        />
                    </div>
                </div>
                {mode === 'admin' && (
                    <div className="w-full">
                        <div className=" p-3 rounded-md ">
                            <SelectOptionListView
                                myOptions={userList}
                                myKey="user"
                                setSelectedData={setSelectedData}
                                defaultLabel={"انتخاب کاربر"}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FullAdminSection;
