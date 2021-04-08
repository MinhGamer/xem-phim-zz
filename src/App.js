import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from './shared/components/Header/Header';

import './App.css';

import { AuthContextWrapper } from './shared/context/AuthContext';

import Footer from './shared/components/Footer/Footer';

import PrivateRoute from './routes/PrivateRoute';

import { commonRoutes, privateRoutes, adminRoutes } from './routes/routes';
import HomePage from './pages/homePage/HomePage';

function App() {
  return (
    <AuthContextWrapper>
      <BrowserRouter basename='/xem-phim-zz'>
        <Header />

        <Switch>
          {/* access for everyone */}
          {commonRoutes.map((route) => (
            <Route
              exact={route.exact}
              path={route.path}
              component={route.Component}
            />
          ))}
          {/* only for login user*/}
          {privateRoutes.map((route) => (
            <PrivateRoute
              exact={route.exact}
              path={route.path}
              component={route.Component}
            />
          ))}
          {/* only for admin*/}
          {adminRoutes.map((route) => (
            <PrivateRoute
              isAdmin
              exact={route.exact}
              path={route.path}
              component={route.Component}
            />
          ))}
          {/* <Route exact path='/admin' component={AdminPage} /> */}
          <Redirect to='/' />;
        </Switch>
        <Footer />
      </BrowserRouter>
    </AuthContextWrapper>
  );
}
export default App;
