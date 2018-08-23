import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onUpdateBook={this.props.onUpdateBook}
                                />
                            </li>
                        ))}
                        {!this.props.books.length > 0 && (
                            <li>Nothing to show.</li>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;
