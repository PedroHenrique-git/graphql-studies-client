import { useState } from 'react';
import { useAuthVar } from '../../graphql/reactive-vars/auth';
import Logout from '../Logout/Logout';
import './styles.css';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const authData = useAuthVar();

  return (
    <>
      <button onClick={() => setOpen((prevState) => !prevState)}>
        Show menu
      </button>
      <div className={`side-menu ${open ? 'menu-open' : 'menu-closed'}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          X
        </button>
        {authData.isLoggedIn ? <Logout /> : <></>}
      </div>
    </>
  );
};

export default Menu;
