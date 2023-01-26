import React from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Button } from 'components/button/Button';
import css from './ImageGallery.module.css';
import { Loader } from 'components/loader/Loader';

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
      this.getImages(page, pictureName);
      return;
    }
    if (page > prevState.page) {
      this.getImages(page, pictureName);
      return;
    }
  }

  getImages = (page, pictureName) => {
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
          ({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
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
      return <Loader />;
    }
    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }
    if (status === 'resolved') {
      return (
        <>
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
          <Button onClick={this.loadMore}>Load More</Button>
        </>
      );
    }
  }
}
