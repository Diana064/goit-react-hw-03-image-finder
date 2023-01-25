import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.onClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
