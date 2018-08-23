import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import Search from './Search';
import List from './List';

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route path='/search' component={Search}/>
                <Route exact path='/' component={List}/>
            </div>
        )
    }
}

export default BooksApp
