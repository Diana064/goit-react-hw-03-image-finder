import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './imageGallery/ImageGallery';

export class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  // state = {
  //   picture: null,
  //   loading: false,
  // };
  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?key=31465649-f1ff204e289e0f72e30576924&q=yellow+flowers&image_type=photo'
  //   )
  //     .then(res => res.json())
  //     .then(picture => this.setState({ picture }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  render() {
    const { pictureName } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <h1>Привет</h1>
        {/* {this.state.loading && <h1>Loading</h1>}
        {this.state.picture && <h1>1</h1>} */}
        <ImageGallery pictureName={pictureName} />
        <ToastContainer />
        {/* Same as */}
      </>
    );
  }
}
