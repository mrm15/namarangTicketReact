import React, {useState} from 'react';
import SelectOptionListView from "./SelectOptionListView.tsx";

const DepartmentAdminViewSection = ({mode, departmentList, setSelectedData, destinationUserList}) => {
    const [whichView, setWhichView] = useState(1);
    // 0  equal to just send to user
    // 1 just send to users in my department


    const handleChange = (value) => {
        setWhichView(parseInt(value))
        setSelectedData({department: '', user: ''})
    }
    try{
        return (
            <div>
                <div
                title={"دسترسی مدیر دپارتمان"}
                >
                🏬
                </div>
                <div className={'flex'}>
                    <div className={' flex gap-2  border border-2 p-2 rounded cursor-pointer'}>

                        <div className={whichView===1 ? 'bg-amber-500 p-1 rounded' : 'p-1 rounded'} onClick={() => handleChange(1)}>ارسال به دپارتمان</div>
                        <div className={whichView===0 ? 'bg-amber-500 p-1 rounded' : 'p-1 rounded'} onClick={() => handleChange(0)}>ارسال به کاربران</div>

                    </div>
                </div>

                <div className={''}>
                    {whichView === 1 && <div className={''}>
                      <div>انتخاب دپارتمان</div>
                        {<div>
                            <SelectOptionListView
                                myOptions={departmentList}
                                myKey={'department'}
                                setSelectedData={setSelectedData}
                            />
                        </div>}
                    </div>}
                    {whichView === 0 && <div className={'w-full'}>
                      <div> انتخاب کاربر</div>
                      <SelectOptionListView
                        myOptions={destinationUserList}
                        myKey={'user'}
                        setSelectedData={setSelectedData}
                      />
                    </div>}
                </div>
            </div>
        );
    }catch (error){
        return <>{error.toString()}</>
    }
};

export default DepartmentAdminViewSection;
