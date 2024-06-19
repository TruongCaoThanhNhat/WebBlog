import React, { useState } from 'react';
import SideBar from './components/sideBar/SideBar';
import Header from './components/header/Header';
import UserManager from './components/Manager/UserManager';
import './dashboard.scss';

function DashboardLayout() {
    const [isUserManagementVisible, setIsUserManagementVisible] = useState(false);

    const handleUserManagementClick = () => {
        setIsUserManagementVisible(!isUserManagementVisible);
    };

    return (
        <div className="dashboard-layout">
            <Header />
            <div className="main-content">
                <SideBar onUserManagementClick={handleUserManagementClick} />
                <div className="content">
                    {isUserManagementVisible && <UserManager />}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
