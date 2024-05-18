import {Link, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import notFoundPhoto from "../../assets/images/403-error.png"

const Unauthorized = () => {

    const [counter, setCounter] = useState(10)
    const navigateTo = useNavigate();

    const handleFunction = useCallback(() => {
        if (counter < 1) {
            navigateTo(-1);
        } else {
            setCounter(ps => ps - 1);
        }

    }, [counter]);

    useEffect(() => {
        const temp = setInterval(handleFunction, 1000);
        return () => {
            clearInterval(temp)
        }
    }, [handleFunction]);


    return (
        <div>
            <div>
                <div className={'p-5 leading-6'}>
                    کاربر عزیز
                    <br/>
                    شما مجوز دسترسی به این صفحه رو ندارید!

                </div>
                <div><Link to={"/"}
                           className={'cursor-pointer bg-blue-400 p-2 rounded' +
                               ' ltr  ' +
                               'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
                >


                    برو به داشبورد

                    ({counter})

                </Link></div>
                <br/>
                <img className="w-full h-auto" src={notFoundPhoto} alt="یافت نشد"/>
            </div>

        </div>

    );
};

export default Unauthorized
