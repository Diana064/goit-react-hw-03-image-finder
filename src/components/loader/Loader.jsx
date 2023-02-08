// Компонент спінера відображається, доки відбувається завантаження зображень. Використовуйте будь-який готовий компонент, наприклад react-loader-spinner або будь-який інший.
import FadeLoader from 'react-spinners/FadeLoader';
import { createPortal } from 'react-dom';
const loaderRoot = document.querySelector('#loader-root');
export const Loader = () => {
  return createPortal(
    <FadeLoader
      color="black"
      size={150}
      cssOverride={{
        margin: '0 auto',
      }}
      aria-label="Loading Spinner"
      data-testid="loader"
    />,
    loaderRoot
  );
};
