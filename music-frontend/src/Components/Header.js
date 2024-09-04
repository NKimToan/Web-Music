import React, { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import "../CSS/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faSignInAlt, faList, faMusic } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../Services/TokenServices/TokenService";
import GetUser from "../Services/UserServices/GetUser";
import Setup from "./Setup";
import History from "./History";

function Header({ userLogin, setUserLogin, authenticated, setAuthenticated }) {
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const accessToken = getToken();
    const Navigate = useNavigate();


    useEffect(() => {
        const accessToken = getToken();
        const getMyUser = async (accessToken) => {
            const data = await GetUser(accessToken);
            setUserLogin(data);
        }
        if (accessToken) {
            getMyUser(accessToken);
        }

    }, [setUserLogin, accessToken, Navigate]);

    const handleLogout = () => {
        removeToken();
        setUserLogin(null);
        alert("Logout succesfull");
    }

    const handleUpdateUser = (e) => {
        console.log("Chạy hàm")
        e.preventDefault();
        setShowUpdateUser(true);
    }

    let AddModelUpdateClose = () => setShowUpdateUser(false);

    return (
        <div className="mt-0 header">
            <div className="d-flex justify-content-around align-items-center pt-3 pb-3 ">
                <History />
                <div className="search p-1">
                    <div className="search-input">
                        <div className="search-input-icon">
                            <Search color="#BBBABB" />
                        </div>
                        <input className="search-input-form" type="text" placeholder="Tìm kiếm bài hát, nghệ sĩ..."></input>
                    </div>
                </div>
                <div className="right-header ">
                    <div className="level-up">
                        <p className="mb-0 p-1">Nâng cấp tài khoản</p>
                    </div>
                    <div className="user nav-item dropdown">
                        <div
                            className="user-icon navbar-brand"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false" >
                            <FontAwesomeIcon icon={faUser} size="lg" color="#D6DAE1" />
                        </div>
                        <div className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                            {userLogin ?
                                <>
                                    <li>
                                        <div className="dropdown-item">
                                            <FontAwesomeIcon icon={faUser} size="lg" color="#D6DAE1" />
                                            <span className="ms-2">{userLogin[0].username}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown-item" onClick={handleUpdateUser} style={{ cursor: "pointer" }}>
                                            <FontAwesomeIcon icon={faSignOutAlt} size="1x" color="#E6E6E6"></FontAwesomeIcon>
                                            <span className="ms-2">Đổi mật khẩu</span>
                                        </div>
                                        <Setup
                                            show={showUpdateUser}
                                            onHide={AddModelUpdateClose}
                                            userLogin={userLogin[0]} />
                                    </li>
                                    {userLogin[0].username === "admin" &&
                                        <>
                                            <li>
                                                <NavLink to="/topic-manage" className="dropdown-item" style={{ cursor: "pointer" }}>
                                                    <FontAwesomeIcon icon={faList} size="1x" color="#E6E6E6"></FontAwesomeIcon>
                                                    <span className="ms-2">Quản lý chủ đề</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/music-manage" className="dropdown-item" style={{ cursor: "pointer" }}>
                                                    <FontAwesomeIcon icon={faMusic} size="1x" color="#E6E6E6"></FontAwesomeIcon>
                                                    <span className="ms-2">Quản lý bài hát</span>
                                                </NavLink>
                                            </li>
                                        </>
                                    }
                                    <li>
                                        <div className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                                            <FontAwesomeIcon icon={faSignOutAlt} size="1x" color="#E6E6E6"></FontAwesomeIcon>
                                            <span className="ms-2">Đăng xuất</span>
                                        </div>
                                    </li>
                                </>
                                :
                                <li onClick={() => setAuthenticated(!authenticated)}>
                                    <NavLink className="dropdown-item" to="/login">
                                        <FontAwesomeIcon icon={faSignInAlt} size="1x" color="#E6E6E6"></FontAwesomeIcon>
                                        <span className="ms-2" >Đăng nhập</span>
                                    </NavLink>
                                </li>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;