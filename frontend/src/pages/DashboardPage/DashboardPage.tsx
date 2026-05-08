import {Global} from "@emotion/react";
import {globalStyles} from "../MainPage/MainPage.styled.ts";
import Topbar from "../../components/TopBar/TopBar.tsx";

const DashboardPage = () => {

    return (
        <>
            <Global styles={globalStyles}/>
            <Topbar/>
            dashboard 페이지
        </>
    )

}

export default DashboardPage;
