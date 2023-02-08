/* eslint-disable no-sequences */
import React, { Component } from 'react';
import { Loader } from './loader/Loader';
import { Searchbar } from './searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './imageGallery/ImageGallery';
import css from './App.module.css';
import { Button } from './button/Button';
import pictureApi from './services/PictureApi';
// const API_KEY = '31465649-f1ff204e289e0f72e30576924';
// const BASE_URL = 'https://pixabay.com/api/?';

export class App extends Component {
  state = {
    status: 'idle',
    page: 1,
    pictureName: '',
    images: [],
    showModal: false,
    largeImageURL: '',
    error: '',
    showButton: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, pictureName } = this.state;

    if (pictureName !== prevState.pictureName || page > prevState.page) {
      this.setState({ page: 1, status: 'pending', images: [] });
      this.getImages(page, pictureName);
      return;
    }
  }
  getImages = (page, pictureName) => {
    pictureApi
      .fetchPicture(pictureName, page)
      .then(({ hits, totalHits }) => {
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
        this.setState(({ images }) => ({
          images: [...images, ...imagesList],
          status: 'resolved',
          totalHits,
          showButton: this.state.page < Math.ceil(totalHits / 12),
        }));
      })

      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onSubmitFormHandler = pictureName => {
    if (pictureName) {
      this.setState({ pictureName });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, status, error } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmitFormHandler} />
          <ImageGallery images={images} />
          {this.state.showButton && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
        </div>
      );
    }

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmitFormHandler} />
        <ToastContainer />
        {/* {showButton && <Button onClick={this.loadMore}>Load More</Button>} */}
      </div>
    );
  }
}
