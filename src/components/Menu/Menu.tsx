import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthVar } from '../../graphql/reactive-vars/auth';
import Logout from '../Logout/Logout';
import './styles.css';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const authData = useAuthVar();

  if (!authData.isLoggedIn) {
    return <></>;
  }

  return (
    <>
      <button onClick={() => setOpen((prevState) => !prevState)}>
        Show menu
      </button>
      <div className={`side-menu ${open ? 'menu-open' : 'menu-closed'}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          X
        </button>
        <ul className="menu-links">
          <li className="link">
            <Link to="/create-post">create post</Link>
          </li>
        </ul>
        {authData.isLoggedIn ? <Logout /> : <></>}
      </div>
    </>
  );
};

export default Menu;
