import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
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
    this.reset();
  };
  reset = () => {
    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <SearchIcon width="30px" />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            placeholder="Search images and photos"
            value={this.state.pictureName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
