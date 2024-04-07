import React, {useState} from 'react';
import DepartmentList from "./DepartmentList.tsx";

const DepartmentAdminViewSection = ({mode, departmentList, setSelectedData, destinationUserList}) => {
    const [whichView, setWhichView] = useState(1);
    // 0  equal to just send to user
    // 1 just send to users in my department

    return (
        <div>
            <div>دسترسی مدیر دپارتمان</div>
            <div className={'flex'}>
                <div>
                    <label htmlFor="selectOneOfThem1">ارسال به دپارتمان</label>
                    <input name={'selectOneOfThem'}
                           type="radio"
                           id={'selectOneOfThem1'}
                           value={1}
                           checked={whichView === 1}
                           onClick={() => setWhichView(1)}
                    />
                </div>
                <div className={'mx-3'}>
                    <label htmlFor="selectOneOfThem2">ارسال به کاربران</label>
                    <input
                        name={'selectOneOfThem'}
                        onClick={() => setWhichView(0)}
                        type="radio"
                        id={'selectOneOfThem2'}
                        value={0}
                        checked={whichView === 0}
                    />
                </div>
            </div>

            <div className={' flex gap-2'}>
                {whichView === 1 &&
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
                }
                {whichView === 0 && <div className={'w-full'}>
                  <div> انتخاب کاربر</div>
                  <DepartmentList
                    myOptions={destinationUserList}
                    myKey={'user'}
                    setSelectedData={setSelectedData}
                  />
                </div>}
            </div>
        </div>
    );
};

export default DepartmentAdminViewSection;
