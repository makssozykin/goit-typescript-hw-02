import s from './ImageCard.module.css';
const ImageCard = ({ urls, alt, modalInfo }) => {
  return (
    <div onClick={() => modalInfo(urls.regular, alt)}>
      <img className={s['card-image']} src={urls.small} alt={alt} />
    </div>
  );
};

export default ImageCard;
