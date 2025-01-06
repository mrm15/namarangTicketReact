import {Outlet} from "react-router-dom"
import SideBar from "./SideBar/SideBar.tsx";
import HeaderDashboard from "./Dashboard/DashboardBody/HeaderDashboard.tsx";
import FooterDashboard from "./Dashboard/DashboardBody/FooterDashboard.tsx";
import './layout.scss'
import useWindowSize from "../hooks/useWindowSize.tsx";
import React from "react";
import DummyData from "./DummyData.tsx";
import {useDispatch, useSelector} from "react-redux";
import WebSocketComponent from "./WebSocketComponent/WebSocketComponent.tsx";

const Layout = () => {

    // @ts-ignore
    const isOpenMenu = useSelector(s => s.sidebarReducer.isOpen);

    console.log(isOpenMenu ? "منو بازه" : "منو بسته ")
    const {heightWindowSize} = useWindowSize();
    const styles: React.CSSProperties = {
        //height: `${heightWindowSize - 80}px`,
        // overflowY: 'scroll',
        // padding: '0 25px',
    }


    const number = 1;

    if (number === 1) {
        return <main className="main-dashboard0 prevent__horizontal__scroll000 wrapperAllSite">
            {/*<HeaderDashboard/>*/}
            <div className={'dashboard-layout'}>
                {/**/}
                <div className={"layout__header"}>
                    <HeaderDashboard/>

                </div>
                <div className="layout__body">
                    <SideBar/>
                    {/**/}
                    <div style={styles} className={"main-content"}>
                        <div
                            className={ isOpenMenu ? " myResponsiveWidthMenuOpen" : " myResponsiveWidth" }
                        >
                            <Outlet/>
                            {/*<DummyData/>*/}

                        </div>
                    </div>
                </div>
                <div className={"layout__footer"}>
                    <FooterDashboard/>
                </div>
            </div>
        </main>
    } else {
        return (
            <main className="App">
                {/*<Outlet/>*/}
            </main>
        )
    }

}

export default Layout
