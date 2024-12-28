import HeaderMenu from "./HeaderMenu.tsx";
import {useEffect, useRef, useState} from "react";
import {FaUserCircle} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth.tsx";
import {BASE_URL} from "../../../api/axios.tsx";
import WebSocketComponent from "../../WebSocketComponent/WebSocketComponent.tsx";


function ProfileInHeader() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const containerRef = useRef(null);
    const {auth} = useAuth();
    const profilePhoto = auth?.userInfo?.userData?.profilePictureUrl
    const isUserLoggedIn = auth?.userInfo?.userData ?? undefined
    // const profilePhoto = false


    useEffect(() => {
        const handleDocumentClick = (event) => {
            // Check if the clicked element is outside of the container
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        // Attach the event listener
        document.addEventListener("click", handleDocumentClick);

        // Remove the event listener on component unmount
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);


    try {

        return (
            <div className={'relative'}
                //onBlur={() => setOpenMenu(false)}
                 ref={containerRef}
            >


                <button
                    className={'rounded px-1 flex items-center'}
                    //onMouseMove={() => setOpenMenu(true)}
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    {profilePhoto ?
                        <div
                            style={{
                                width:'48px',
                                height:'48px'
                            }}
                            className={"border-2 border-white rounded-full overflow-hidden"}>
                            <img style={{
                                objectFit:"cover",
                            }} src={`${BASE_URL}/download/${profilePhoto}`} alt="عکس پروفایل"/>
                        </div>
                        : < FaUserCircle size={48}/>}

                    <div className={'hidden md:block'}>
                        {auth?.userInfo?.userData?.name ? auth?.userInfo?.name : 'کاربر'}
                        <span>&nbsp;&nbsp;&nbsp;</span>
                    </div>


                </button>
                <div
                    //onMouseMove={() => setOpenMenu(true)}
                    //onMouseLeave={() => setOpenMenu(false)}
                >

                    {/*{isUserLoggedIn && <WebSocketComponent/>}*/}
                    <div className={openMenu ? '' : 'hidden'}>
                        <HeaderMenu setOpenMenu={setOpenMenu}/>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default ProfileInHeader;
