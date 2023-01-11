import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleNameChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.pictureName.trim() === '') {
      toast.error('🖼️ Введіть будь ласка назву картинки!');
      return;
    }
    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };
  reset = () => {
    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            // s
            placeholder="Search images and photos"
            value={this.state.pictureName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
