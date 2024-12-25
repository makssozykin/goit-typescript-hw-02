import s from './ImageCard.module.css';

type Props = {
  urls: {
    small: string;
    regular: string;
  };
  alt: string;
  modalInfo: (url: string, alt: string) => void;
 };


const ImageCard = ({ urls, alt, modalInfo }: Props) => {
  return (
    <div onClick={() => modalInfo(urls.regular, alt)}>
      <img className={s['card-image']} src={urls.small} alt={alt} />
    </div>
  );
};

export default ImageCard;
