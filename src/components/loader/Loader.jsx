// Компонент спінера відображається, доки відбувається завантаження зображень. Використовуйте будь-який готовий компонент, наприклад react-loader-spinner або будь-який інший.
import FadeLoader from 'react-spinners/FadeLoader';
export const Loader = () => {
  return (
    <FadeLoader
      color="black"
      size={150}
      cssOverride={{
        margin: '0 auto',
      }}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
