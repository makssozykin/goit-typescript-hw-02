import { Circles } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
     <Circles color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
