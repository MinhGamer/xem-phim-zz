import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import HomePage from './pages/homePage/HomePage';
import Header from './shared/components/Header/Header';

import './App.css';
import AddMoviePage from './pages/addMovie/AddMoviePage';
import MovieFilter from './components/movieFilter/MovieFilter';
import Slider from './shared/components/Slider/Slider';

import CustomDatePicker from './shared/components/DatePicker/DatePicker';
import Auth from './pages/user/Auth';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/movie/:movieId' component={MovieDetailPage} />

        <Route exact path='/auth' component={Auth} />
        <Route exact path='/slider' component={Slider} />
        <Route exact path='/add-movie' component={AddMoviePage} />
        <Route exact path='/filter-movie' component={MovieFilter} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
