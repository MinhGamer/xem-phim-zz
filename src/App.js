import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import HomePage from './pages/homePage/HomePage';
import Header from './shared/components/Header/Header';

import './App.css';
import AddMoviePage from './pages/addMovie/AddMoviePage';
import MovieFilter from './components/movieFilter/MovieFilter';
import Slider from './shared/components/Slider/Slider';

import Auth from './pages/user/Auth';

import { AuthContextWrapper } from './shared/context/AuthContext';
import MovieCollection from './pages/collection/MovieCollection';

function App() {
  return (
    <BrowserRouter>
      <AuthContextWrapper>
        <Header />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/movie/:movieId' component={MovieDetailPage} />

          <Route exact path='/auth' component={Auth} />
          <Route exact path='/collection' component={MovieCollection} />
          <Route exact path='/add-movie' component={AddMoviePage} />
          <Route exact path='/filter-movie' component={MovieFilter} />
        </Switch>
      </AuthContextWrapper>
    </BrowserRouter>
  );
}
export default App;
