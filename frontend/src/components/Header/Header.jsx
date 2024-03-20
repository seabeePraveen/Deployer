import './Header.modules.css';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage?.getItem("token")?.length > 0 ? true : false;
    const fnLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const fnLogin = () => {
        navigate("/login");
    };
    return (
        <header className="header mt-4">
            <h3 className="header_title">Deployer</h3>
            <ul className="navbar__list">
                <li className='navbar__item'>Home</li>
                <li className='navbar__item'>Dashboard</li>
                <li className='navbar__item'>About</li>
                <li className='navbar__item'>Contact</li>

                {isLoggedIn ? <li className='login-button' onClick={fnLogout}>Logout</li> : 
                                <li className='login-button' onClick={fnLogin}>Login</li>}
            </ul>

        </header>
    );
}

export default Header;