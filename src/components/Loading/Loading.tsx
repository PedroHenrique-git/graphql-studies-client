import loadingGif from '../../assets/images/loading.gif';
import './styles.css';

const LoadingComponent = () => {
  return (
    <div className="loading-component">
      <img src={loadingGif} alt="loading" />
    </div>
  );
};

export default LoadingComponent;
