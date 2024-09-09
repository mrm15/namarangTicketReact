import {Outlet} from "react-router-dom"
import SideBar from "./SideBar/SideBar.tsx";
import HeaderDashboard from "./Dashboard/DashboardBody/HeaderDashboard.tsx";
import FooterDashboard from "./Dashboard/DashboardBody/FooterDashboard.tsx";
import './layout.scss'
import useWindowSize from "../hooks/useWindowSize.tsx";
import React from "react";

const Layout = () => {


    const {heightWindowSize} = useWindowSize();
    const styles: React.CSSProperties = {
        height: `${heightWindowSize - 80}px`,
        overflowY: 'scroll',
        padding: '0 25px',
    }


    const number = 1;
    if (number === 1) {
        return <main className="main-dashboard prevent__horizontal__scroll">
            {/*<HeaderDashboard/>*/}
            <div className={'dashboard-layout'}>
                <SideBar/>
                <div className="content-area">
                        <HeaderDashboard/>
                        <div style={styles} >
                            <Outlet/>
                        </div>
                        <FooterDashboard/>
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
