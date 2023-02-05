/* eslint-disable no-sequences */
import React, { Component } from 'react';
import { Loader } from './loader/Loader';
import { Searchbar } from './searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './imageGallery/ImageGallery';
import css from './App.module.css';
import { Button } from './button/Button';

const API_KEY = '31465649-f1ff204e289e0f72e30576924';
const BASE_URL = 'https://pixabay.com/api/?';

export class App extends Component {
  state = {
    status: 'idle',
    page: 1,
    pictureName: '',
    images: null,
    showModal: false,
    largeImageURL: '',
    error: null,
    showButton: true,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, pictureName } = this.state;

    if (pictureName !== prevState.pictureName) {
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

        this.setState({
          totalHits: totalHits,
        });

        console.log(this.state.totalHits);
        return imagesList;
      })
      .then(imagesList => {
        this.setState(({ images }) => ({
          images: [...images, ...imagesList],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));

    console.log(this.state.page < Math.ceil(this.state.totalHits / 12));
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
          {this.state.page < Math.ceil(this.state.totalHits / 12) && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
          {/* <Button onClick={this.loadMore}>Load More</Button> */}
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
