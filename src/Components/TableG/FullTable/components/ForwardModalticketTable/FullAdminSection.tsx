import React from 'react';
import DepartmentList from "./DepartmentList.tsx";

const FullAdminSection = ({mode, departmentList, setSelectedData, userList}) => {
    return (
        <div>
            <div
            title={"دسترسی به کل سازمان"}
            >🥇</div>
            <div className={' flex flex-wrap'}>
                <div className={'w-full'}>
                    <div>انتخاب دپارتمان</div>
                    <div>
                        <DepartmentList
                            myOptions={departmentList}
                            myKey={'department'}
                            setSelectedData={setSelectedData}
                        />
                    </div>
                </div>
                <div className={'w-full'}>
                    <div> انتخاب کاربر</div>
                    {mode === 'admin' && <DepartmentList
                      myOptions={userList}
                      myKey={'user'}
                      setSelectedData={setSelectedData}
                    />}
                </div>
            </div>
        </div>
    );
};

export default FullAdminSection;
