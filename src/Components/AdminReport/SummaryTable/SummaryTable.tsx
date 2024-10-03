import "./SummaryTable.scss"
import {useContext} from "react";
import {AdminReportContext} from "../AdminReportContext.tsx";
import {calculateTable1} from "./calculateTable1.tsx";
import SingleRowViewOfReport from "./SingleRowViewOfReport.tsx";
import DropDown from "./DropDown/DropDown.tsx";

const SummaryTable = () => {

    const context = useContext(AdminReportContext)
    const {myData} = context;
    console.log(myData);
    console.table(myData.titleData);

    const sumAll = myData.titleData.find(row => row.id === 21)
    const faqat_Chalenium = myData.titleData.find(row => row.id === 15)
    const faqat_suedi = myData.titleData.find(row => row.id === 16)
    const sum_chal_suedi = myData.titleData.find(row => row.id === 7)
    const neonPlastic = myData.titleData.find(row => row.id === 8)
    const neon_flax = myData.titleData.find(row => row.id === 9)

    const faqat_estil = myData.titleData.find(row => row.id === 12)
    const faqat_ahan = myData.titleData.find(row => row.id === 18)


    const joosh_fiber = myData.titleData.find(row => row.id === 19)
    const sum_felezat = myData.titleData.find(row => row.id === 20)


    const temp = [
        {
            title: 'پلکسی کلی',
            value: '2000 متر',
            subItems: [
                {
                    title: 'پلکسی 2.8 میل',
                    value: '120',

                },
                {
                    title: 'پلکسی دوغی 5 میل',
                    value: '120',

                },
                {
                    title: 'پلکسی دوغی 10 میل',
                    value: '120',

                },

            ]
        },
        ////////////////////
        {
            title: 'پی وی سی 10 میل',
            value: '2000 متر',
        },
        /////////
        {
            title: 'پانچ',
            value: '2000 متر',
            subItems: [
                {
                    title: 'ساده ',
                    value: '120',

                },
                {
                    title: 'طرحدار',
                    value: '120',

                },
            ]
        },
        /////////
        {
            title: 'ورق استیل',
            value: '2000 متر',
            subItems: [
                {title: 'طلایی آیینه ای',value: '120',},
                {title: 'طلایی خشدار',value: '120',},
                {title: 'نقره ای آیینه ای',value: '120',},
                {title: 'نقره ای خشدار',value: '120',},
                {title: 'مسی آیینه ای ',value: '120',},
                {title: 'مسی خشدار',value: '120',},
                {title: 'دودی آیینه ای',value: '120',},
                {title: 'دودی خشدار',value: '120',},
            ]
        },
        //////////
        {title: "ورق آهن", value: "120",
            subItems: [
                {title: 'ورق آهن یک میل',value: '120',},
                {title: 'ورق آهن هفت میل',value: '120',},
            ]
        },
        ///////
        // ////////
        {title: "نئون فلکس", value: "120",
            subItems: [
                {title: 'سفید یخی',value: '120',},
                {title: 'زیمسی ( آبی فیروزه ای)',value: '120',},
                {title: 'قرمز:',value: '120',},
                {title: 'آفتابی',value: '120',},
                {title: 'آبی آسمانی',value: '120',},
                {title: 'بنفش',value: '120',},
                {title: 'انبه ای',value: '120',},
                {title: 'لیمویی',value: '120',},
                {title: 'سبز',value: '120',},
                {title: 'صورتی',value: '120',},
                {title: 'کاربنی',value: '120',},
                {title: 'نارنجی',value: '120',},
            ]
        },
        ///////
        // ////////
        {title: "متراژ چلنیوم و سوئدی ", value: "120",
            subItems: [
                {title: 'چلنیوم',value: '120',
                    subItems:[
                        {title: "به نقره ای 9 سانت ساده", value: "120",},
                        {title: "به نقره ای 7 سانت ساده", value: "120",},
                        {title: "به نقره ای پانج 9 سانت", value: "120",},
                        {title: "به نقره ای پانچ 7 سانت", value: "120",},
                        {title: "به نقره ای سوپرساید ", value: "120",},
                        {title: "به نقره ای سنتی", value: "120",},
                        {title: "به طلایی 9 سانت ساده", value: "120",},
                        {title: "به طلایی 7 سانت ساده", value: "120",},
                        {title: "به طلایی پانج 9 سانت", value: "120",},
                        {title: "به طلایی پانچ 7 سانت", value: "120",},
                        {title: "به طلایی سوپرساید ", value: "120",},
                        {title: "به طلایی سنتی", value: "120",},
                        {title: "به مشکی 9 سانت ساده", value: "120",},
                        {title: "به مشکی 7 سانت ساده", value: "120",},
                        {title: "به مشکی 9 سانت پانج", value: "120",},
                        {title: "به مشکی 7 سانت پانچ", value: "120",},
                        {title: "به مشکی سوپر ساید", value: "120",},
                        {title: "به سفید 9 سانت ساده", value: "120",},
                        {title: "به سفید 7 سانت ساده", value: "120",},
                        {title: "به سفید 9 سانت پانچ", value: "120",},
                        {title: "به سفید 7 سانت پانچ", value: "120",},
                        {title: "به بنفش 9 سانت ساده", value: "120",},
                    ]
                },
                {title: 'سوئدی',value: '120',
                    subItems:[
                        {title: "لبه نقره ای 5 سانت براق", value: "120",},
                        {title: "لبه نقره ای 7 سانت براق", value: "120",},
                        {title: "لبه نقره ای 5 سانت خشدار", value: "120",},
                        {title: "لبه نقره ای 7 سانت خشدار", value: "120",},
                        {title: "لبه طلایی 5 سانت براق", value: "120",},
                        {title: "لبه طلایی ای 7 سانت براق", value: "120",},
                        {title: "لبه طلایی 5 سانت خشدار", value: "120",},
                        {title: "لبه طلایی ای 7 سانت خشدار", value: "120",},
                        {title: "لبه مشکی 5 سانت", value: "120",},
                        {title: "لبه مشکی 7 سانت", value: "120",},

                    ]
                },

            ]
        }
        ///////

    ]


    try {
        return (
            <div className={"summaryTable"}>
                <div>

                    <div className={"ul_li_table"}>
                        {<SingleRowViewOfReport

                            style={{
                                background: "black",
                                color: "white"
                            }}
                            title={sumAll?.title}
                            value={sumAll?.value}

                        />}
                        <SingleRowViewOfReport
                            style={{
                                background: "#e6e6e6",
                            }}
                            title={faqat_Chalenium.title}
                            value={faqat_Chalenium.value}
                        />
                        <SingleRowViewOfReport
                            style={{
                                background: "#e6e6e6",
                            }}
                            title={faqat_suedi.title}
                            value={faqat_suedi.value}
                        />
                        <SingleRowViewOfReport
                            style={{
                                background: "#989898",
                            }}
                            title={sum_chal_suedi.title}
                            value={sum_chal_suedi.value}
                        />
                    </div>

                    <div className={"ul_li_table"}>
                        <SingleRowViewOfReport
                            title={neonPlastic.title}
                            value={neonPlastic.value}
                        />
                    </div>


                    <div className={"ul_li_table"}>
                        <SingleRowViewOfReport
                            title={neon_flax.title}
                            value={neon_flax.value}
                        />
                    </div>


                    <div className={"ul_li_table"}>
                        <SingleRowViewOfReport
                            title={faqat_estil.title}
                            value={faqat_estil.value}
                        />
                        <SingleRowViewOfReport
                            title={faqat_ahan.title}
                            value={faqat_ahan.value}
                        />
                        <SingleRowViewOfReport
                            title={joosh_fiber.title}
                            value={joosh_fiber.value}
                        />
                        <SingleRowViewOfReport
                            title={sum_felezat.title}
                            value={sum_felezat.value}
                        />
                    </div>
                    <DropDown data={temp}/>
                </div>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>;
    }
};

export default SummaryTable;