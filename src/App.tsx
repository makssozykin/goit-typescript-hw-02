import { useEffect, useState, useMemo, useRef } from 'react';
import { useToggle } from './hooks/useToggle';
import { fetchImages } from './services/api';
import { Toaster } from 'react-hot-toast';
import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { isOpenModal, openModal, closeModal } = useToggle();
  const [modalImage, setModalImage] = useState('');
  const [alt, setAlt] = useState('');

  const ref = useRef();

  useEffect(() => {
    if (query === '') return;
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages } = await fetchImages(query, page);
        if (total_pages === 0) return;
        setArticles(prevArticles => [...prevArticles, ...results]);
        setTotalPages(total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const isActive = useMemo(
    () => (totalPages === page ? true : false),
    [totalPages, page]
  );

  useEffect(() => {
    if (page === 1) return;
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [page, articles]);

  const handleSubmitQuery = query => {
    setArticles([]);
    setQuery(query);
    setPage(1);
  };

  const modalInfo = (src, alt) => {
    setModalImage(src);
    setAlt(alt);
  };

  return (
    <div ref={ref}>
      <SearchBar onSubmit={handleSubmitQuery} />
      {isLoading && <Loader />}

      {articles.length > 0 && !isLoading && !error && (
        <LoadMoreBtn onLoadMore={handleLoadMore} isActive={isActive} />
      )}

      <ImageGallery
        articles={articles}
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
