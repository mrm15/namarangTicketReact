import React, {useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from '../api/axios';
import LoginRegisterParent from "./Login_register_parent.tsx";
import {toast} from "react-toastify";
import {PAGES} from "../Pages/Route-string.tsx";
import useRefreshToken from "../hooks/useRefreshToken.tsx";
import Loader from "./Loader";
import {MdEdit} from "react-icons/md";

const LOGIN_URL = '/login/new';
const LOGIN_URL_verify = '/login/verify';

const LoginSMS :React.FC = () => {
    const {setAuth} = useAuth();
    const navigateTo = useNavigate();
    const tryToRefresh = useRefreshToken()
    const myLocation = useLocation()
    const from = myLocation?.state?.from?.pathname || PAGES.DASHBOARD;
    const userRef = useRef();
    const errRef = useRef();
    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // بخش ورود شماره نشون داده بشه یا بخش ورود کدپیامکی
    const [sectionView, setSectionView] = useState('number') // number | code
    const [secretMode,setSecretMode] = useState(false)
    /*
     مقدار
     persist
     فالز بود ولی من اینو از عمد ترو میزارم تا همیشه توی ورود های بعدی
      این تیک باشه و همیشه تا وقتی کاربر خروج دستی نزده بود از سایت با رفرش خارج نشه
     */
    const [check, toggleCheck] = useToggle('persist', true);

    useEffect(() => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        userRef?.current?.focus();
    }, [isLoading])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const sendLoginCode = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {

            const loginPayload = {
                phoneNumber: user,
                secretMode,
            };

            const axiosConfig = {
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: true, // Uncomment if needed
            };

            const response = await axios.post(LOGIN_URL, JSON.stringify(loginPayload), axiosConfig);

            console.log(response)
            if (response.data.status) {
                toast.success(response?.data?.message)
                response?.data?.text && toast.info(response?.data?.text)
                setSectionView('code')
            } else {
                toast.error(response?.data?.message)
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('هیچ پاسخی از سمت سرور دریافت نشد');
            } else if (err.response?.status === 400) {
                setErrMsg('شماره یا کد یافت نشد');
            } else if (err.response?.status === 401) {
                setErrMsg('اطلاعات ورود صحیح نیست');
            } else {
                setErrMsg('ورود ناموفق!');
                console.log(err)
                toast.error(err.response.data.message)
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const loginPayload = {
                phoneNumber: user,
                loginCode: pwd,
                secretMode,
            };

            const axiosConfig = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            };

            const response = await axios.post(LOGIN_URL_verify, JSON.stringify(loginPayload), axiosConfig);



            const accessToken = response?.data?.accessToken;
            const userInfo = response?.data?.userInfo;

            //localStorage.setItem("3319173716", JSON.stringify({user, roles, accessToken}))
            setAuth({userInfo, accessToken});
            resetUser();
            setPwd('');
            navigateTo(from, {replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('اطلاعات ورود صحیح نیست');
            } else {
                setErrMsg('Login Failed');
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }


    useEffect(() => {
        void tryToRefresh().then(r => {
            console.log(r)
            navigateTo(from)
        }).catch((err:Error) => {
            console.log(err?.toString())
            setIsLoading(false)
        })
    }, [from, navigateTo, tryToRefresh]);

    if (isLoading) {
        return <Loader/>
    }
    const handleSecretMode = (e: { detail: number; }) => {
        console.log(e.detail)
        if (e.detail === 3) {
            setSecretMode(true)
            toast("حالت مخفی فعال شد")
        }
        if(secretMode && e.detail===4){
            setSecretMode(false)
            toast("حالت مخفی غیر فعال شد")
        }
    }
    return (<>
        <LoginRegisterParent>
            <section>
                <div ref={errRef} className={errMsg ? "myErrorMessageClass" : "offscreen"} aria-live="assertive">{errMsg}</div>
                <h1
                    onClick={handleSecretMode}
                    className={"select-none"}
                >ورود به پنل نمارنگ</h1>
                {sectionView === 'number' && <>
                  <form>
                    <label htmlFor="username">شماره موبایل:</label>
                    <input
                      type="text"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      {...userAttribs}
                      required
                    />

                    <button
                      onClick={sendLoginCode}
                      className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
                    >
                      ارسال کد
                    </button>


                    <div className="persistCheck">
                      <input

                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                      />
                      <label htmlFor="persist">اعتماد به این دستگاه</label>
                    </div>
                  </form>
                </>}

                {sectionView === 'code' && <>
                  <form>
                    <div className={'flex'}>
                      <div>
                        کد ورود به شماره
                        <span>&nbsp;{user}&nbsp;</span>
                        پیامک شد
                      </div>
                      <div className={'flex '}
                           onClick={() => setSectionView('number')}
                      >
                        <MdEdit size={24} color="black"/>
                        <div>ویرایش</div>
                      </div>
                    </div>


                    <label htmlFor="password">کد ورود:</label>
                    <input
                      type="number"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                    />
                    <button
                      onClick={handleSubmit}
                      className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
                    >ورود به سایت
                    </button>
                    <div className="persistCheck">
                      <input

                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                      />
                      <label htmlFor="persist">اعتماد به این دستگاه</label>
                    </div>
                  </form>
                </>}


                <div>
                    اگر حساب کاربری ندارید<br/>
                    <span className="line">
                    <Link to="/register">
                        <div className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>
                            ثبت نام در سایت
                        </div>
                    </Link>
                </span>
                </div>
            </section>
        </LoginRegisterParent>
    </>)
}

export default LoginSMS
