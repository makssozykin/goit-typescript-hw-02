import { useEffect } from 'react';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './ImageModal.module.css';

const ImageModal = ({ isOpenModal, onCloseModal, image, alt }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div
        className={s.modalInfo}
        data-aos="zoom-out-up"
        data-aos-delay="100"
        data-aos-duration="2000"
      >
        <button className={s.closeBtn} onClick={onCloseModal}>
          <IoMdClose className={s.closeBtnSvg} />
        </button>
        <img src={image} alt={alt} />
        <p>{alt}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
