import { useState } from 'react';
export const useToggle = (initialState: boolean = false) => {
  const [isOpenModal, setIsOpenModal] = useState(initialState);
  const openModal = () => {
    setIsOpenModal(!initialState);
  };

  const closeModal = () => {
    setIsOpenModal(initialState);
  };
  return [isOpenModal, openModal, closeModal] as const;
};
