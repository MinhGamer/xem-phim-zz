import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import HomePage from './pages/homePage/HomePage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className='app'>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/movie' component={MovieDetailPage} />
        </div>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
