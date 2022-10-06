import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Pagination from './common/Pagination'
import { Paginate } from '../utils/Paginate'
import ListGroup from './common/ListGroup'
import MoviesTable from './MoviesTable'
import _ from 'lodash'

class Movies extends Component {
    state = { 
        movies: [], //initially it was set to getMovies
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc'}
    }
    
    componentDidMount() {
       const genres = [{ _id:'', name: 'All Genres'}, ...getGenres()] 
      this.setState({movies: getMovies(), genres})  
      //OR this.setState({movies: getMovies(), genres: genres})  
    }

    
    handleDelete = movie => {
        alert('Are you sure ?')
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies })
        // OR  this.setState({ movies: movies })
        // the properties defined here will override the properties of our state object
    }

    handleLike = movie => {
        // console.log("Like clicked", movie)
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
    }

    handleSort = sortColumn => {
        // console.log(path)
        // this.setState({ sortColumn:{ path, order: 'asc'}})
        this.setState({sortColumn})
    }

    handlePageChange = page => {
        // console.log(page)
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        // console.log(genre)
        this.setState({ selectedGenre: genre, currentPage: 1 })
        //whenever we filter we should set the page to 1
    }

    getPageData = () => {
        const {pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state  
                
        //FILTER
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies
        //filter(x => x.what is to be filtered === selected)
        //const movies = Paginate(allMovies, currentPage, pageSize)
        
        //SORT
       const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        //PAGINATION
        const movies = Paginate(sorted, currentPage, pageSize)

        return { totalCount: filtered.length, data: movies}
    }
    
     render() { 
        const { length: count} = this.state.movies
        const {pageSize, currentPage, sortColumn } = this.state  

        if(count === 0) return <p>There are no movies in the Database</p>
        
        const { totalCount, data: movies } = this.getPageData()

        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                        items={this.state.genres} 
                        onItemSelect={this.handleGenreSelect} 
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                {/* <p>Showing {count} movies in the database</p> */}
                <p>Showing {totalCount} movies in the database</p>
                <MoviesTable 
                    movies={movies}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                />
                <Pagination 
                    // itemsCount={count} 
                    itemsCount={totalCount} 
                    pageSize={pageSize} 
                    onPageChange={this.handlePageChange}
                    currentPage ={currentPage}
                />
                {/* count has been destructured above, so this means: this.state.movies.length  */}
                </div>
            </div>
        );
    }
}
 
export default Movies;