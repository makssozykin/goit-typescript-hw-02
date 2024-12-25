import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

type Props = {
  images: Array<{ id: number; urls: { small: string; regular: string }; alt_description: string }>,
  onModal: () => void,
  modalInfo: (image: string, alt: string) => void,
}

const ImageGallery = ({ images, onModal, modalInfo }: Props) => {
  return (
    <ul className={s['gallery-list']}>
      {images.map(({ id, urls, alt_description }) => (
        <li key={id} className={s['gallery-item']} onClick={onModal}>
          <ImageCard urls={urls} alt={alt_description} modalInfo={modalInfo} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
