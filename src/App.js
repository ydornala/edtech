import React from 'react';
import './App.scss';

import Header from './components/header';
import BookDetails from './components/book-details';
import MoreBooks from './components/more-books';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <BookDetails />
        <MoreBooks/>
      </div>
    );
  }
}
