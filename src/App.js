import { useContext } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import MovieDetailPage from './pages/movieDetail/MovieDetailPage';
import HomePage from './pages/homePage/HomePage';
import Header from './shared/components/Header/Header';

import './App.css';
import AddMoviePage from './pages/addMovie/AddMoviePage';

import Auth from './pages/user/Auth';

import { AuthContextWrapper, AuthContext } from './shared/context/AuthContext';
import MovieCollection from './pages/collection/MovieCollection';

import PrivateRoute from './shared/components/PrivateRoute/PrivateRoute';

function App() {
  const auth = useContext(AuthContext);

  return (
    <AuthContextWrapper>
      <BrowserRouter>
        <Header />
        <Switch>
          {/* access for everyone */}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/movie/:movieId' component={MovieDetailPage} />
          <Route exact path='/auth' component={Auth} />
          {/* only for login user*/}
          <PrivateRoute
            exact
            path='/add-movie'
            component={AddMoviePage}
            redirectTo='/'
          />
          <PrivateRoute
            exact
            path='/collection'
            component={MovieCollection}
            redirectTo='/'
          />
          <Redirect to='/' />;
        </Switch>
      </BrowserRouter>
    </AuthContextWrapper>
  );
}
export default App;
