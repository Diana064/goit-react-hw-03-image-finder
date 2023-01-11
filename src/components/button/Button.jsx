// При натисканні на кнопку Load more повинна довантажуватись наступна порція зображень і рендеритися разом із попередніми. Кнопка повинна рендеритися лише тоді, коли є якісь завантажені зображення. Якщо масив зображень порожній, кнопка не рендериться.

import css from './Button.module.css';
export const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={css.Button} type="button">
      {children}
    </button>
  );
};
