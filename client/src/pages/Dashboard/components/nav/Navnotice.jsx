import React, { useState } from 'react';

function Navnotice() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" onClick={toggleDropdown}>
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
            </a>
            <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications ${dropdownOpen ? 'show' : ''}`}>
                <li className="dropdown-header">
                    You have 4 new notifications
                    <a href="#">
                        <span className="badge rounded-pill bg-primary p-2 ms-2">
                            View all
                        </span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                        <h4>Lorem Ipsum</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>1 hr. ago</p>
                    </div>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                    <i className="bi bi-check-circle text-success"></i>
                    <div>
                        <h4>Sit rerum fuga</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>2 hrs. ago</p>
                    </div>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                    <i className="bi bi-check-circle text-success"></i>
                    <div>
                        <h4>Sit rerum fuga</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>3 hrs. ago</p>
                    </div>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                    <i className="bi bi-check-circle text-success"></i>
                    <div>
                        <h4>Sit rerum fuga</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>4 hrs. ago</p>
                    </div>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                    <a>Show all notifications</a>
                </li>
            </ul>
        </li>
    );
}

export default Navnotice;
