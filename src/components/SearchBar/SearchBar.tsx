import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const trimSearchQuery = searchQuery.trim();
    if (!trimSearchQuery) {
      toast.error('Please enter the value in the search field');
      return;
    }
    onSubmit(trimSearchQuery);
    setSearchQuery('');
  };

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };
  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s['search-form']}>
        <input
          className={s['search-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className={s['search-btn']} type="submit">
          <IoSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
