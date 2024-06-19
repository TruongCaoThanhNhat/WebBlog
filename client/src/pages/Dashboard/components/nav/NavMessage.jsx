import React, { useState } from 'react'

function NavMessage() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" onClick={toggleDropdown}>
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
            </a>
            <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow messages ${dropdownOpen ? 'show' : ''}`}>
                <li className="dropdown-header">
                    You have 3 new messages
                    <a href="#">
                        <span className="badge rounded-pill bg-primary p-2 ms-2">
                            View all
                        </span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                        <h4>Maria Hudson</h4>
                        <p>
                            Velit asperiores et ducimus soluta repudiandae labore officia est ut...
                        </p>
                        <p>4 hrs. ago</p>
                    </div>

                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                    <i className="bi bi-exclamation-circle text-success"></i>
                    <div>
                        <h4>Anna Nelson</h4>
                        <p>
                            Velit asperiores et ducimus soluta repudiandae labore officia est ut.....
                        </p>
                        <p>6 hrs. ago</p>
                    </div>

                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                    <i className="bi bi-exclamation-circle text-success"></i>
                    <div>
                        <h4>Anna Nelson</h4>
                        <p>
                            Velit asperiores et ducimus soluta repudiandae labore officia est ut.....
                        </p>
                        <p>8 hrs. ago</p>
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
    )
}

export default NavMessage;