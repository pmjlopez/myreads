import React, { Component } from 'react';
import Book from './Book';

class Search extends Component {
    render() {
        const {
            books,
            handleOnChange,
            handleSubmit,
            onChangeShelf,
            getBook
        } = this.props;
        return(
            <div className="search-books">
                <form onSubmit={handleSubmit} className="search-books-bar">
                    <a className="close-search" href='/'>Close</a>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            name='query'
                            placeholder="Search by title or author"
                            onChange={handleOnChange}
                            autoFocus
                        />
                    </div>
                </form>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    onChangeShelf={onChangeShelf}
                                    book={book}
                                    getBook={getBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;