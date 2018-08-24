import React from 'react';
import BookShelf from './BookShelf';

const List = (props) => {
    const { onChangeShelf, books } = props;

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
                        books={books.filter(book => book.shelf === 'currentlyReading')}
                    />
                    <BookShelf
                        title='Want to Read'
                        onChangeShelf={onChangeShelf}
                        books={books.filter(book => book.shelf === 'wantToRead')}
                    />
                    <BookShelf
                        title='Read'
                        onChangeShelf={onChangeShelf}
                        books={books.filter(book => book.shelf === 'read')}
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