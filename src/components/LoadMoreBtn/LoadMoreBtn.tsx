import s from './LoadMoreBtn.module.css';

type Props = {
  onLoadMore: () => void;
  isActive: boolean;
};

const LoadMoreBtn = ({ onLoadMore, isActive }: Props) => {
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
