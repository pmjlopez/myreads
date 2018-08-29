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
        bookQuery: [],
    }
    async componentDidMount () {
        const books = await BooksAPI.getAll();
        this.setState({
            books
        });
    }
    changeShelf = (book, shelf) => {
        book.shelf = shelf;
        BooksAPI.update(book, shelf);
        this.setState((state) => ({
            books: state.books
                .filter((b) => b.id !== book.id )
                .concat(book)
        }));
    }
    async searchBooks (query) {
        const bookQuery = await BooksAPI.search(query)
        const books = await bookQuery.error ? [] : bookQuery
        this.setState({
            bookQuery: books
        });
    }
    debounceSearchBooks = debounce(500, this.searchBooks)
    handleOnChange = (e) => {
        const query = e.target.value;

        if (query && query !== '') {
            this.debounceSearchBooks(query);
        } else {
            this.setState(() => ({
                bookQuery: []
            }));
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });

        if (values.query) {
            this.searchBooks(values.query);
        } else {
            alert('Please type the title or author.');
        }
    }
    getBook = (id) => {
        BooksAPI
            .get(id)
            .then((book) => {
                this.setState((state) => {
                    const index = state.bookQuery.findIndex((b) => b.id === book.id)
                    const books = state.bookQuery
                    books[index] = book
                    return {
                        bookQuery: books
                    }
                });
            })
    }
    render() {
        return (
            <div className="app">
                <Route path='/search' render={() => (
                    <Search
                        books={this.state.bookQuery}
                        onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                        handleOnChange={this.handleOnChange}
                        handleSubmit={this.handleSubmit}
                        getBook={this.getBook}
                    />
                )}/>
                <Route exact path='/' render={() => (
                    <List
                        books={this.state.books}
                        getBook={this.getBook}
                        onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
