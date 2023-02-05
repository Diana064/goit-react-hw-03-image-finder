import React from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        );
      })}
    </ul>
  );
}

// export class ImageGallery extends React.Component {
//   state = {
//     page: 1,
//     images: null,
//     status: 'idle',
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     const { pictureName } = this.props;

//     if (pictureName !== prevProps.pictureName) {
//       this.setState({ page: 1, status: 'pending', images: [] });
//       this.getImages(page, pictureName);
//       return;
//     }
//     if (page > prevState.page) {
//       this.getImages(page, pictureName);
//       return;
//     }
//   }

//   getImages = (page, pictureName) => {
//     fetch(
//       `${BASE_URL}q=${pictureName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         return Promise.reject(
//           new Error(`Something wrong with this request ${pictureName}`)
//         );
//       })
//       .then(({ hits }) => {
//         const imagesList = hits.map(
//           ({ id, webformatURL, largeImageURL, tags }) => {
//             return {
//               id,
//               webformatURL,
//               largeImageURL,
//               tags,
//             };
//           }
//         );
//         return imagesList;
//       })
//       .then(imagesList => {
//         this.setState(({ images }) => ({
//           images: [...images, ...imagesList],
//           status: 'resolved',
//         }));
//       })
//       .catch(error => this.setState({ error, status: 'rejected' }));
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   render() {

//   }
// }
