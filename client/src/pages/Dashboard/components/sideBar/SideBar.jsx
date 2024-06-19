import React from 'react';
import './sidebar.scss';

function SideBar({ onUserManagementClick }) {
    return (
        <aside id="sidebars" className="sidebars">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/" >
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={onUserManagementClick}>
                        <i className="bi bi-person"></i>
                        <span>Quản lý user</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/" >
                        <i className="bi bi-stickies"></i>
                        <span>Quản lý bài viết</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/" >
                        <i className="bi bi-layout-text-window-reverse"></i>
                        <span>Quản lý bài đăng</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}

export default SideBar;
