import AdminPage from '../admin/AdminPage';
import AccountPage from '../pages/account/AccountPage';
import MovieCollectionPage from '../pages/collection/MovieCollectionPage';
import FAQPage from '../pages/FAQ/FAQPage';
import HomePage from '../pages/homePage/HomePage';
import MovieDetailPage from '../pages/movieDetail/MovieDetailPage';
import MovieSeriesPage from '../pages/movieSeries/MovieSeriesPage';
import PersonPage from '../pages/person/PersonPage';
import SearchMovie from '../pages/searchMovie/SearchMovie';
import TvSeriesPage from '../pages/tvSeries/TvSeriesPage';
import Auth from '../pages/user/Auth';

export const commonRoutes = [
  { path: '/', exact: true, Component: HomePage },
  { path: '/tv', exact: true, Component: TvSeriesPage },
  { path: '/movie/:movieId', exact: false, Component: MovieDetailPage },
  { path: '/tv/:movieId', exact: false, Component: MovieDetailPage },
  {
    path: '/tv/:movieId/season/:seasonNumber',
    exact: false,
    Component: MovieDetailPage,
  },
  { path: '/faq', exact: false, Component: FAQPage },
  { path: '/series', exact: false, Component: MovieSeriesPage },
  { path: '/series/:seriesId', exact: false, Component: MovieSeriesPage },
  { path: '/auth', exact: false, Component: Auth },
  { path: '/search', exact: false, Component: SearchMovie },
  { path: '/person/:personId', exact: false, Component: PersonPage },
];

export const privateRoutes = [
  { path: '/account', exact: true, Component: AccountPage },
  { path: '/collection', exact: true, Component: MovieCollectionPage },
];

export const adminRoutes = [
  { path: '/admin/', exact: true, Component: AdminPage },
  { path: '/admin/:item', exact: true, Component: AdminPage },
];
