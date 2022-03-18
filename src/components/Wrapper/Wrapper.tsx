import Footer from '../Footer/Footer';
import Header from '../Header/Head';
import './styles.css';

type WrapperProps = {
  children: React.ReactNode;
  hasHeader: boolean;
  hasFooter: boolean;
};

const Wrapper = ({ children, hasFooter, hasHeader }: WrapperProps) => {
  return (
    <>
      {hasHeader ? <Header /> : <></>}
      <main className="wrapper">{children}</main>
      {hasFooter ? <Footer /> : <></>}
    </>
  );
};

export default Wrapper;
