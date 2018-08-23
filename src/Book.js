import React, { Component } from 'react';
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
    state = {
        book: {}
    };
    handleChange = (e) => {
        let book = this.state.book;
        book.shelf = e.target.value;
        this.props.onUpdateBook(book);
    };
    componentDidMount = () => {
        BooksAPI
        .get(this.props.book.id)
        .then((book) => {
            this.setState(() => ({
                book
            }));
        })
    };
    render() {
        let book = this.state.book;
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
                        ></div>
                    )}
                    <div className="book-shelf-changer">
                        <select
                            onChange={this.handleChange}
                            value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value=''>None</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
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
    }
}

export default Book;