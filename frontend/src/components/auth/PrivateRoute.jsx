import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useLocalStorage } from '../../utils/hooks';
import { events } from '../../utils/events';
import { logger } from '../../utils/logger';

const PrivateRoute = () => {
  const location = useLocation();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [lastPath, setLastPath] = useLocalStorage('lastPath', '');

  useEffect(() => {
    // Store the last attempted private path
    if (location.pathname !== ROUTES.LOGIN) {
      setLastPath(location.pathname);
    }

    // Log route access attempt
    logger.debug('Private route access attempt:', {
      path: location.pathname,
      isAuthenticated,
      hasToken: !!token,
    });

    // Emit event for analytics
    if (!isAuthenticated) {
      events.emit(events.EVENT_NAMES.AUTH_ERROR, {
        type: 'unauthorized_access',
        path: location.pathname,
      });
    }
  }, [location, isAuthenticated, token, setLastPath]);

  // Check authentication
  if (!isAuthenticated || !token) {
    // Redirect to login with return url
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  // Render child routes
  return <Outlet />;
};

export default PrivateRoute;