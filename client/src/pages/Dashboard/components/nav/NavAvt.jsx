import React, { useState }  from 'react'

function NavAvt() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                onClick={toggleDropdown}
            >
                <img src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/aec845906a1911ec8130097cb62284e8.png"
                    alt="Profile"
                    className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">F.David</span>
            </a>
            <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${dropdownOpen ? 'show' : ''}`}>
                <li className="dropdown-header">
                    <h6>David</h6>
                    <span>Web Developer</span>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item d-flex align-items-center"
                        href="users-profile.html">
                        <i className="bi bi-person"></i>
                        <span>My Profile</span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a
                        className="dropdown-item d-flex align-items-center"
                        href="users-profile.html">
                        <i className="bi bi-gear"></i>
                        <span>Account Settings</span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a
                        className="dropdown-item d-flex align-items-center"
                        href="pages-faq.html">
                        <i className="bi bi-question-circle"></i>
                        <span>Need Help?</span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </a>
                </li>
            </ul>
        </li >
    )
}

export default NavAvt;