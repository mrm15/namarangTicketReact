import React, {useState} from 'react';
import './style.scss';
import {FaPlus, FaTrash} from 'react-icons/fa';
import {toast} from 'react-toastify';
import MoreSetting from "./MoreSetting/MoreSetting.tsx";

interface TicketData {
    title: string;
    description: string;
    files: File[];
}

const MyComponent: React.FC = () => {

    const emptyFile = new File([], 'کلیک کنید +   بکشید و رها کنید')
    const maxNumberOfFiles = 3
    const [ticketData, setTicketData] = useState<TicketData>({
        title: '',
        description: '',
        files: [emptyFile],

    })

    const addNewFileHandler = () => {
        // You can handle the maximum file limit check separately if needed
        const files = [...ticketData.files];
        if (files.length >= maxNumberOfFiles) {
            return
        }
        files.push(emptyFile); // Placeholder for the new file
        setTicketData({...ticketData, files});
    };

    const handleRemoveFile = (index: number) => {
        const files = ticketData.files
        files.splice(index, 1)
        setTicketData({...ticketData, files})

    }

    const assignFileToState = (singleFile: File, index: number) => {
        const files = [...ticketData.files];

        files[index] = singleFile
        setTicketData({...ticketData, files});
    }
    const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 1) {
            toast.info('لطفاً فقط یک فایل انتخاب کنید');
            return;
        }
        const singleFile = droppedFiles[0]
        // const files = [...ticketData.files, ...droppedFiles];
        // setTicketData({...ticketData, files});
        assignFileToState(singleFile, index)

    };


    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }


    const clickHandler = () => {
        console.log(ticketData)
        // at first, we Must Upload File and Then upload Form



    }

    return (
        <div className="flex justify-center ">
            <div className="sm:w-100 md:w-96 ">
                <div className="div__group__input_select w-full">
                    <label htmlFor="ticketTitle">عنوان تیکت</label>
                    <input id="ticketTitle" type="text" className="w-100 rounded border-2"
                           placeholder="تابلو نئون دکتر محمدی"/>
                </div>
                <div className="div__group__input_select w-full">
                    <label htmlFor="ticketDescription">توضیحات</label>
                    <textarea id="ticketDescription" className="w-100 rounded border-2"
                              placeholder="مثلا: فایل چلنیوم تک لبه رینگ به رنگ سبز زیمنسی"/>
                </div>
                {ticketData?.files?.map((file: File, index) => (
                    <>
                        <div key={index} className="div__group__input_select w-full">
                            <label htmlFor={`file${index + 1}`}>بارگزاری فایل</label>
                            <input
                                onChange={(e) => {
                                    assignFileToState(e.target.files[0], index)
                                }}
                                id={`file${index + 1}`} type="file" className="w-100 rounded border-2 hidden"/>

                            <div className={'flex items-center'}>
                                <label htmlFor={`file${index + 1}`}
                                       className={'customFileLabel cursor-pointer w-full'}
                                >
                                    <div
                                        id={`file${index + 1}`}
                                        className="same__input w-full"
                                        onDrop={e => handleDrop(e, index)}
                                        onDragOver={handleDragOver}>
                                        <div>
                                            {file?.name}
                                        </div>
                                    </div>
                                </label>
                                <FaTrash
                                    onClick={() => handleRemoveFile(index)}
                                    className={'text-red-600 ms-2'}/>
                            </div>
                        </div>
                    </>
                ))}
                <div onClick={addNewFileHandler}
                     className="flex items-center rounded border-2 my-2 w-32 p-2 cursor-pointer select-none">
                    <div className="mx-1">افزودن فایل</div>
                    <FaPlus/>
                </div>
                <MoreSetting title={'تنظیمات بیشتر'}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                    حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
                    رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                    داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                    حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                    گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                    حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
                    رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                    داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                    حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                    گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                    حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
                    رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                    داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                    حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                    گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                    حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
                    رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                    داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                    حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                    گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                    حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
                    رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                    داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                    حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                    گیرد.

                </MoreSetting>

                <div className="div__group__input_select w-full">
                    <label htmlFor="ticketTitle"> </label>
                    <input
                        onClick={clickHandler}
                        id="ticketTitle" type="button" className="btn-submit-mir"
                        value={'ارسال'}/>
                </div>
            </div>

        </div>
    );
};

export default MyComponent;
