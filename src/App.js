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

function App() {
  const auth = useContext(AuthContext);

  const routes = () => {
    //only for NOT login user
    if (!auth.isLoggedIn) {
      return (
        <>
          <Route exact path='/auth' component={Auth} />
          <Redirect to='/' />
        </>
      );
    }

    //only for  login user
    return (
      <>
        <Route exact path='/collection' component={MovieCollection} />
        <Route exact path='/add-movie' component={AddMoviePage} />
        <Redirect to='/' />;
      </>
    );
  };

  return (
    <BrowserRouter>
      <AuthContextWrapper>
        <Header />
        <Switch>
          {/* access for everyone */}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/movie/:movieId' component={MovieDetailPage} />

          {/* only for login user or NOT login user */}
          {routes()}
        </Switch>
      </AuthContextWrapper>
    </BrowserRouter>
  );
}
export default App;
