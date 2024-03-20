import Header from '../Header/Header.jsx';
import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './Dashboard.module.css';

function Dashboard(){
    const navigate = useNavigate();
    useEffect(() => {
        const loggedstatus = localStorage?.getItem("token")?.length > 0 ? true : false;
        if (!loggedstatus) {
            navigate("/login");
        }
    });
    const username = localStorage?.getItem("username");
    const deployProject = () => {
        navigate("/import");
    };
    return (
        <div>
            <Header />
            <div className={styles.dashboard_heading}>
                <div className='bg-slate-50 px-3 py-1 rounded-md font-medium cursor-pointer max-w-24' onClick={deployProject}>
                    Deploy <span className='font-extrabold'>+</span>
                </div>
                {/* cards */}
                <div className='flex'>
                    {/* each card */}
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;