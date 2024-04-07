import React from 'react';
import DepartmentList from "./DepartmentList.tsx";

const FullAdminSection = ({mode, departmentList, setSelectedData, userList}) => {
    return (
        <div>
            <div>دسترسی به کل سازمان</div>
            <div className={' flex gap-2'}>
                <div className={'w-full'}>
                    <div>انتخاب دپارتمان</div>
                    {mode === 'admin' || mode === 'departmentAdmin' && <div>
                      <DepartmentList
                        myOptions={departmentList}
                        myKey={'department'}
                        setSelectedData={setSelectedData}
                      />
                    </div>}
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
