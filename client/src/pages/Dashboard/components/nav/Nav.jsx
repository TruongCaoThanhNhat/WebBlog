import './nav.scss'
import Navnotice from './Navnotice';
import NavAvt from './NavAvt';

function Nav() {
  return (
    <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <Navnotice/>
          <NavAvt />
        </ul>

    </nav>
  );
}

export default Nav;