import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HOME_URL, REGISTER_URL, LOGIN_URL } from '../lib/routes';
import { PublicRoute } from '../components/PublicRoute/PublicRoute';
import { Layout } from '../components/Layout/Layout';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { FeedPage } from '../pages/FeedPage/FeedPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={HOME_URL}
            element={
              <PrivateRoute>
                <FeedPage />
              </PrivateRoute>
            }
          />

          <Route
            path={REGISTER_URL}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path={LOGIN_URL}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
