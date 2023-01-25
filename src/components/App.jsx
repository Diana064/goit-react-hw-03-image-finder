import React, { Component } from 'react';

import { Searchbar } from './searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './imageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    pictureName: '',
  };

  onSubmitFormHandler = pictureName => {
    if (pictureName) {
      this.setState({ pictureName });
    }
  };
  render() {
    const { pictureName } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmitFormHandler} />
        <ImageGallery pictureName={pictureName} />
        <ToastContainer />
        {/* Same as */}
      </div>
    );
  }
}
