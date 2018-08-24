import React from 'react';

const Book = (props) => {
    const { onChangeShelf, book } = props;
    return(
        <div className="book">
            <div className="book-top">
                {book.imageLinks && (
                    <div
                        className="book-cover"
                        style={{
                            width: 128, height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                    >
                    </div>
                )}
                <div className="book-shelf-changer">
                    <select
                        onChange={(event) => onChangeShelf(book, event.target.value)}
                        value={book.shelf ? book.shelf : 'none'}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value='none'>None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
                {book.authors && (
                    book.authors.map((author) => (
                        <span key={author}> {author} </span>
                    ))
                )}
            </div>
        </div>
    );
};

export default Book;