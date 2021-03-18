import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import HomePage from './pages/homePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/movie' component={MovieDetailPage} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
