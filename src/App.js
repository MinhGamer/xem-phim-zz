import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import HomePage from './pages/homePage/HomePage';
import Header from './shared/components/Header/Header';

import './App.css';
import AddMoviePage from './pages/addMovie/AddMoviePage';

import Auth from './pages/user/Auth';

import { AuthContextWrapper } from './shared/context/AuthContext';
import MovieCollectionPage from './pages/collection/MovieCollectionPage';

import PrivateRoute from './shared/components/PrivateRoute/PrivateRoute';
import Account from './pages/account/Account';

import PersonPage from './pages/person/PersonPage';
import SearchMovie from './pages/searchMovie/SearchMovie';
import TvSeriesPage from './pages/tvSeries/TvSeriesPage';
import MovieSeriesPage from './pages/movieSeries/MovieSeriesPage';
import LazyLoadingMovie from './components/lazyLoading/LazyLoadingMovie';
import MovieSeriesDetailPage from './pages/movieSeriesDetailPage/MovieSeriesDetailPage';

function App() {
  return (
    <AuthContextWrapper>
      <BrowserRouter basename='/xem-phim-zz'>
        <Header />
        <Switch>
          {/* access for everyone */}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/tv' component={TvSeriesPage} />
          <Route exact path='/lazy' component={LazyLoadingMovie} />
          <Route exact path='/movie/:movieId' component={MovieDetailPage} />
          <Route exact path='/tv/:movieId' component={MovieDetailPage} />
          <Route
            exact
            path='/tv/:movieId/season/:seasonNumber'
            component={MovieDetailPage}
          />
          <Route exact path='/series' component={MovieSeriesPage} />
          <Route exact path='/series/:seriesId' component={MovieSeriesPage} />
          <Route exact path='/auth' component={Auth} />
          {/* only for login user*/}
          <Route exact path='/search' component={SearchMovie} />
          <Route exact path='/person/:personId' component={PersonPage} />
          <PrivateRoute exact path='/account' component={Account} />
          <PrivateRoute exact path='/add-movie' component={AddMoviePage} />
          <PrivateRoute
            exact
            path='/collection'
            component={MovieCollectionPage}
          />
          <Redirect to='/' />;
        </Switch>
      </BrowserRouter>
    </AuthContextWrapper>
  );
}
export default App;
