import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import serializeForm from 'form-serialize';

class Search extends Component {
    state = {
        books: []
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });

        if (values.query) {
            console.log(`Searching for ${values.query}`);
            BooksAPI
            .search(values.query)
            .then((books) => {
                if (books.error) {
                    console.log(`No books found.`);
                    this.setState(() => ({
                        books: []
                    }));
                } else {
                    this.setState(() => ({
                        books
                    }));
                }
            });
        } else {
            alert('Please type the title or author.');
        }
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
            <div className="search-books">
                <form onSubmit={this.handleSubmit} className="search-books-bar">
                    <a className="close-search" href='/'>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" name='query' placeholder="Search by title or author"/>
                    </div>
                </form>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    onUpdateBook={(book) => this.updateBook(book)}
                                    book={book}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;