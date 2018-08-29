import React from 'react';
import BookShelf from './BookShelf';

const List = (props) => {
    const CURRENTLY_READING = 'currentlyReading'
    const WANT_TO_READ = 'wantToRead'
    const READ = 'read'

    const { onChangeShelf, books, getBook } = props;

    const filterBy = (shelf) => books.filter(book => book.shelf === shelf)

    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf
                        title='Currently Reading'
                        onChangeShelf={onChangeShelf}
                        getBook={getBook}
                        books={filterBy(CURRENTLY_READING)}
                    />
                    <BookShelf
                        title='Want to Read'
                        onChangeShelf={onChangeShelf}
                        getBook={getBook}
                        books={filterBy(WANT_TO_READ)}
                    />
                    <BookShelf
                        title='Read'
                        onChangeShelf={onChangeShelf}
                        getBook={getBook}
                        books={filterBy(READ)}
                    />
                </div>
            </div>
            <div className="open-search">
                <a href='/search'>Add a book</a>
            </div>
        </div>
    );
};

export default List;