import React, { useState } from 'react';
import SideBar from './components/sideBar/SideBar';
import UserManager from './components/Manager/UserManager';
import './dashboardLayout.scss';
import Main from './components/dashboard/Main';
import ArticleManager from './components/Manager/ArticleManager';
import PostManager from './components/Manager/PostManager';
import HeaderDashboard from './components/header/HeaderDashboard';

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
            <div className="main-content">
                <SideBar 
                    onDashboardClick={handleDashboardClick}
                    onUserManagementClick={handleUserManagementClick} 
                    onArticleManagementClick={handleArticleManagementClick}
                    onPostManagementClick={handlePostManagementClick}
                />
                <div className="content">
                    {activeComponent === 'dashboard' && <Main/>}
                    {activeComponent === 'userManager' && <UserManager />}
                    {activeComponent === 'articleManager' && <ArticleManager/>}
                    {activeComponent === 'postManager' && <PostManager/>}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
