import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
    const { onChangeShelf, books, title, getBook } = props;
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                getBook={getBook}
                                onChangeShelf={onChangeShelf}
                            />
                        </li>
                    ))}
                    {!books.length > 0 && (
                        <li>Nothing to show.</li>
                    )}
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;
