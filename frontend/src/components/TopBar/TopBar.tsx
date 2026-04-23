import {Avatar, IconBtn, Logo, LogoIcon, Nav, NavLink, NavRight, SearchBar} from "./TopBar.styled.ts";
import {FaArrowTrendUp, FaMagnifyingGlass} from "react-icons/fa6";
import {FaBell} from "react-icons/fa";

const TopBar = () => {
    return (
        <Nav>
            <Logo>
                <LogoIcon>
                    <FaArrowTrendUp size={20} />
                </LogoIcon>
                TrendTrack
            </Logo>

            <SearchBar>
               <FaMagnifyingGlass /> Search brands, items...
            </SearchBar>

            <NavRight>
                <NavLink>Dashboard</NavLink>
                <NavLink>Analytics</NavLink>
                <IconBtn>
                    <FaBell size={20} />
                </IconBtn>
                <Avatar>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4751/4751706.png"
                    alt="profile"
                    width={28}
                    height={28}
                  />
                </Avatar>
            </NavRight>
        </Nav>
    );
};

export default TopBar;
