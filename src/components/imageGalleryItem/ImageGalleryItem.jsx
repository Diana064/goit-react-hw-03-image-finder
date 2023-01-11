import React from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../modal/Modal';
export class ImageGalleryItem extends React.Component {
  state = {
    largeImageURL: '',
    showModal: false,
  };

  onModalShow = () => {
    const { largeImageURL } = this.props;
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, tags } = this.props;
    const { showModal, largeImageURL } = this.state;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            onClick={this.onModalShow}
            className={css.ImageGalleryItem_image}
            src={webformatURL}
            alt={tags}
          />
        </li>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}
