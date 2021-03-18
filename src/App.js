import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import HomePage from './pages/homePage/HomePage';
import Header from './shared/components/Header/Header';

import './App.css';
import AddMoviePage from './pages/addMovie/AddMoviePage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/movie' component={MovieDetailPage} />
        <Route exact path='/add-movie' component={AddMoviePage} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
