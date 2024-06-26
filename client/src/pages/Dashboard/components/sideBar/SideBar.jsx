import { Link } from 'react-router-dom';
import './sidebar.scss';

function SideBar({ onUserManagementClick, onDashboardClick, onArticleManagementClick, onPostManagementClick }) {
    return (
        <aside id="sidebars" className="sidebars">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link" href="/" onClick={onDashboardClick}>
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/UserManager" onClick={onUserManagementClick}>
                        <i className="bi bi-person"></i>
                        <span>Quản lý user</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/ArticleManager" onClick={onArticleManagementClick}>
                        <i className="bi bi-stickies"></i>
                        <span>Quản lý danh mục</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/PostManager" onClick={onPostManagementClick}>
                        <i className="bi bi-layout-text-window-reverse"></i>
                        <span>Quản lý bài viết</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default SideBar;
