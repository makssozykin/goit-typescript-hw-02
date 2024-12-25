import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ articles, onModal, modalInfo }) => {
  return (
    <ul className={s['gallery-list']}>
      {articles.map(({ id, urls, alt_description }) => (
        <li key={id} className={s['gallery-item']} onClick={onModal}>
          <ImageCard urls={urls} alt={alt_description} modalInfo={modalInfo} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
