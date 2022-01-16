import React from 'react';
import {Movies} from '../Movies';
import {Search} from '../Search';

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    state = {
        movies: [],
    }

    componentDidMount(){
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
        .then(response => response.json())
        .then(data => this.setState({movies: data.Search}))
    } 
    searchMovies = (str,type = 'all') => {
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all'?`&type=${type}`: '' }`)
        .then(response => response.json())
        .then(data => this.setState({movies: data.Search}))
    }

    render() {
        const {movies = [] } = this.state;

        return <main className='container content'>
        <Search searchMovies={this.searchMovies}/>
        {
           movies.length ? (
            <Movies movies={this.state.movies}/>
           ) : <h3> Nothing found... </h3>
        }
        
    </main>
}
}

export {Main}