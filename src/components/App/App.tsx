import { useEffect, useState, useMemo, useRef } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { fetchImages } from '../../services/api';
import { Toaster } from 'react-hot-toast';
import './App.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { Image } from './App.types';

interface ImageData {
  total_pages: number;
  results: Image[];

}

export const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [isOpenModal, openModal, closeModal] = useToggle();
  const [modalImage, setModalImage] = useState<string>('');
  const [alt, setAlt] = useState<string>('');

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query === '') return;
    const getData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(false);
        const dataImages: ImageData | undefined = await fetchImages(query, page);
        console.log(dataImages);
        if (!dataImages) {
        throw new Error("No data received from the API");
      }
        setImages((prevImages: Image[]): Image[] => [...prevImages, ...dataImages.results]);
        setTotalPages(dataImages.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleLoadMore = (): void => {
    setPage(prev => prev + 1);
  };

  const isActive: boolean = useMemo(
    () => (totalPages === page ? true : false),
    [totalPages, page]
  );

  useEffect(() => {
    if (page === 1) return;
    console.log(divRef.current)
    divRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [page, images]);

  const handleSubmitQuery = (query: string) => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const modalInfo = (src: string, alt: string) => {
    setModalImage(src);
    setAlt(alt);
  };

  return (
    <div ref={divRef}>
      <SearchBar onSubmit={handleSubmitQuery} />
      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && !error && (
        <LoadMoreBtn onLoadMore={handleLoadMore} isActive={isActive} />
      )}

      <ImageGallery
        images={images}
        onModal={openModal}
        modalInfo={modalInfo}
      />

      {error && <ErrorMessage />}
      <ImageModal
        isOpenModal={isOpenModal}
        onCloseModal={closeModal}
        image={modalImage}
        alt={alt}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
