import Menu from '../Menu/Menu';
import './styles.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Simple blog</h1>
      <Menu />
    </header>
  );
};

export default Header;
