import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './styles.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ background: 'none' }}>
        <h1 className="header-title">Simple blog</h1>
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
