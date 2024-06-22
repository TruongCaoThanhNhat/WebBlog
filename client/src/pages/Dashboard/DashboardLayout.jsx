import React, { useState } from 'react';
import SideBar from './components/sideBar/SideBar';
import UserManager from './components/Manager/UserManager';
import './dashboardLayout.scss';
import Main from './components/dashboard/Main';
import PostManager from './components/Manager/PostManager';
import HeaderDashboard from './components/header/HeaderDashboard';
import CategoryManager from './components/Manager/CategoryManager';

function DashboardLayout() {
    const [activeComponent, setActiveComponent] = useState('dashboard');

    const handleDashboardClick = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        setActiveComponent('dashboard');
    };

    const handleUserManagementClick = () => {
        setActiveComponent('userManager');
    };

    const handleArticleManagementClick = () => {
        setActiveComponent('articleManager');
    };

    const handlePostManagementClick = () => {
        setActiveComponent('postManager');
    };

    return (
        <div className="dashboard-layout">
            <HeaderDashboard/>
            <div className="main-contents">
                <SideBar 
                    onDashboardClick={handleDashboardClick}
                    onUserManagementClick={handleUserManagementClick} 
                    onArticleManagementClick={handleArticleManagementClick}
                    onPostManagementClick={handlePostManagementClick}
                />
                <div className="contents">
                    {activeComponent === 'dashboard' && <Main/>}
                    {activeComponent === 'userManager' && <UserManager />}
                    {activeComponent === 'articleManager' && <CategoryManager />}
                    {activeComponent === 'postManager' && <PostManager/>}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
