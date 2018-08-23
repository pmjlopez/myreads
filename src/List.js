import React, { Component } from 'react';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class List extends Component {
    state = {
        books: []
    };
    componentDidMount = () => {
        BooksAPI
        .getAll()
        .then((books) => {
            this.setState((prevState) => ({
                books
            }));
        })
    };
    updateBook = (book) => {
        BooksAPI.update(book, book.shelf);

        let books = [...this.state.books];
        let bookIndex = books.findIndex(b => b.id === book.id);
        books[bookIndex] = book;
        this.setState(() => ({
            books
        }));
    };
    render() {
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf
                            title='Currently Reading'
                            onUpdateBook={(book) => this.updateBook(book)}
                            books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                        />
                        <BookShelf
                            title='Want to Read'
                            onUpdateBook={(book) => this.updateBook(book)}
                            books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                        />
                        <BookShelf
                            title='Read'
                            onUpdateBook={(book) => this.updateBook(book)}
                            books={this.state.books.filter(book => book.shelf === 'read')}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <a href='/search'>Add a book</a>
                </div>
            </div>
        );
    }
}

export default List;