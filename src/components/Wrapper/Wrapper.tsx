import Footer from '../Footer/Footer';
import Header from '../Header/Head';
import './styles.css';

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </>
  );
};

export default Wrapper;
