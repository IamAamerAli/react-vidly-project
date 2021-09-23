import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenereService";
// import Like from "./common/like";
import ListGruop from "./common/listGruop";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 9,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Movies" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDeleteMovie = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePagination = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

  render() {
    if (this.state.movies.length === 0)
      return <p>There are no Movies for you now</p>;

    // const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sort = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sort, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGruop
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary">
            New Movie
          </Link>
          <br />
          <br />
          <p>
            {" "}
            Total Number of Movies {filteredMovies.length} in{" "}
            {selectedGenre ? selectedGenre.name : "All Genres"}{" "}
          </p>
          <MoviesTable
            sortColumn={sortColumn}
            onSort={this.handleSort}
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDeleteMovie}
          />
          <Pagination
            pageSize={pageSize}
            onPageChange={this.handlePagination}
            itemsCount={filteredMovies.length}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
