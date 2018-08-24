import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import Search from './Search';
import List from './List';
import * as BooksAPI from "./BooksAPI";
import {debounce} from "throttle-debounce";
import serializeForm from "form-serialize";

class BooksApp extends React.Component {
    state = {
        books: [],
    };
    componentDidMount = () => {
        BooksAPI
        .getAll()
        .then((books) => {
            this.setState((state) => ({
                books
            }));
        })
    };
    changeShelf = (book, shelf) => {
        book.shelf = shelf;

        BooksAPI
        .update(book, shelf)
        .then(() => {
            this.setState((state) => ({
                books: state.books
                    .filter((b) => b.id !== book.id )
                    .concat(book)
            }));
        });
    };
    searchBooks = (query) => {
        BooksAPI
        .search(query)
        .then((books) => {
            if (books.error) {
                this.setState(() => ({
                    books: []
                }));
            } else {
                this.setState(() => ({
                    books
                }));
            }
        });
    };
    debounceSearchBooks = debounce(500, this.searchBooks);
    handleOnChange = (e) => {
        const query = e.target.value;

        if (query) {
            this.debounceSearchBooks(query);
        } else {
            this.setState(() => ({
                books: []
            }));
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });

        if (values.query) {
            this.searchBooks(values.query);
        } else {
            alert('Please type the title or author.');
        }
    };
    render() {
        return (
            <div className="app">
                <Route path='/search' render={() => (
                    <Search
                        books={this.state.books}
                        onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                        handleOnChange={this.handleOnChange}
                        handleSubmit={this.handleSubmit}
                        getBooks={this.getBooks}
                    />
                )}/>
                <Route exact path='/' render={() => (
                    <List
                        books={this.state.books}
                        onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
