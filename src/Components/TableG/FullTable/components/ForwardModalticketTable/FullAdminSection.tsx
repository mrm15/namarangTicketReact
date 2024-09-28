import React from 'react';
import SelectOptionListView from "./SelectOptionListView.tsx";

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
                        <SelectOptionListView
                            myOptions={departmentList}
                            myKey={'department'}
                            setSelectedData={setSelectedData}
                        />
                    </div>
                </div>
                <div className={'w-full'}>
                    <div> انتخاب کاربر</div>
                    {mode === 'admin' && <SelectOptionListView
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
