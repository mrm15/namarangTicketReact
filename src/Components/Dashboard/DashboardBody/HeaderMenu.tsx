import useAuth from "../../../hooks/useAuth.tsx";
import useLogout from "../../../hooks/useLogout.tsx";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../../Pages/Route-string.tsx";


function HeaderMenu() {


    const {auth} = useAuth();
    const name = auth?.userInfo?.userData?.name || "کاربر"
    const roleName = auth?.userInfo?.userData?.roleName || ""
    const departmentName = auth?.userInfo?.userData?.departmentName || ""
    console.log(auth)

    const logout = useLogout();
    const navigateTo = useNavigate()


    const signOut = async () => {

        const yes = confirm("آیا میخواهید از سایت خارج شوید؟")
        if (yes) {
            await logout();
            navigateTo(PAGES.LOGIN);
        }

    }

    return (
        <ul className={'absolute left-0 w-44 flex flex-col p-5 bg-white border border-black text-gray-950 rounded z-10'}>

            <li>
                <div> 👨🏿 {name} </div>
                <div> 🏬 {departmentName} </div>
                <div> 🎭 {roleName} </div>
            </li>
            <li
                // onClick={signOut}
                className={'cursor-pointer block  rounded px-4 hover:bg-blue-400 text-center btn-gay-mir'}>
                ویرایش پروفایل
            </li>
            <li
                onClick={signOut}
                className={'cursor-pointer block  rounded px-4 hover:bg-blue-400 text-center btn-gay-mir'}>
                خروج از سایت
            </li>
        </ul>
    );
}

export default HeaderMenu;