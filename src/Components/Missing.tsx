import {Link, useNavigate} from "react-router-dom"
import {useCallback, useEffect, useState} from "react";

const Missing = () => {

    const [counter, setCounter] = useState(15)
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
        <div
        className={'w-full min-h-screen bg-fuchsia-300 flex justify-center align-middle'}
        >
            <article style={{padding: "100px"}}
                     className={''}
            >
                <h1>صفحه ی مورد نظر وجود نداره

                </h1>
                <p className={'p-5 ltr'}>Page Not Found</p>
                <div className="btn-submit-mir w-fit">
                    <Link to="/">رفتن به صفحه ی اصلی
                        <span>({counter})</span>
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default Missing
