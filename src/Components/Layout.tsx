import {Outlet} from "react-router-dom"
import SideBar from "./SideBar/SideBar.tsx";
import HeaderDashboard from "./Dashboard/DashboardBody/HeaderDashboard.tsx";
import FooterDashboard from "./Dashboard/DashboardBody/FooterDashboard.tsx";
import './layout.scss'
import useWindowSize from "../hooks/useWindowSize.tsx";
const Layout = () => {


    const { width, height } = useWindowSize();
    console.log("height")
    console.log(height)
    console.log("width")
    console.log(width)


    const number = 1;
    if (number === 1) {
        return <main className="main-dashboard prevent__horizontal__scroll">
            {/*<HeaderDashboard/>*/}
            <div className={'flex'}>
                <SideBar/>
                <div className="w-full">
                    <div className="">
                        <HeaderDashboard/>
                        <div
                            style={{
                                height: `${height-80}px`,
                                overflowY: 'scroll',
                                padding: '0 25px',
                            }}
                        >
                            <Outlet/>
                        </div>
                        <FooterDashboard/>
                    </div>
                </div>
            </div>

        </main>
    } else {
        return (
            <main className="App">
                <Outlet/>
            </main>
        )
    }

}

export default Layout
