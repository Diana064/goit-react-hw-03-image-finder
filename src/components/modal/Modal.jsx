// Під час кліку на елемент галереї повинно відкриватися модальне вікно з темним оверлеєм і відображатися велика версія зображення. Модальне вікно повинно закриватися по натисканню клавіші ESC або по кліку на оверлеї.

// Зовнішній вигляд схожий на функціонал цього VanillaJS-плагіна, тільки замість білого модального вікна рендериться зображення (у прикладі натисніть Run). Анімацію робити не потрібно!
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
    const { largePictureLink, tags } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.onClick}>
        <div className={css.Modal}>
          <img src={largePictureLink} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
