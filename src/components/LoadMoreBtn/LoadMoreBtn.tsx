import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore, isActive }) => {
  return (
    <>
      <button
        className={s.loadMore}
        type="button"
        onClick={() => onLoadMore()}
        disabled={isActive}
      >
        Load more
      </button>
    </>
  );
};

export default LoadMoreBtn;
