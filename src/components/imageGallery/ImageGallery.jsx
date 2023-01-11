import React from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';

import { Button } from 'components/button/Button';

import css from './ImageGallery.module.css';

const API_KEY = '31465649-f1ff204e289e0f72e30576924';
const BASE_URL = 'https://pixabay.com/api/?';
export class ImageGallery extends React.Component {
  state = {
    page: 1,
    images: null,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { pictureName } = this.props;

    if (pictureName !== prevProps.pictureName) {
      this.setState({ page: 1, status: 'pending', images: [] });
      this.getPictures(page, pictureName);
      return;
    }
    if (page > prevState.page) {
      this.getPictures(page, pictureName);
      return;
    }
  }

  getPictures = (page, pictureName) => {
    fetch(
      `${BASE_URL}q=${pictureName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Something wrong with this request ${pictureName}`)
        );
      })
      .then(({ hits }) => {
        const imagesList = hits.map(
          ({ id, webformatURL, largePictureLink, tags }) => {
            return {
              id,
              webformatURL,
              largePictureLink,
              tags,
            };
          }
        );
        return imagesList;
      })
      .then(imagesList => {
        this.setState(({ images }) => ({
          images: [...images, ...imagesList],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, status, error } = this.state;
    if (status === 'pending') {
      //   return <Loader />;
      return <div>Loading</div>;
    }
    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, largePictureLink, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largePictureLink={largePictureLink}
                  tags={tags}
                />
              );
            })}
          </ul>
          <Button onClick={this.loadMore}>Load More</Button>
        </>
      );
    }
  }
}
