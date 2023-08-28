import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import MachineLayout from './layouts/dashboard/MachineLayout';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/MachinesPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ForecastsPage from './pages/ForecastsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';
import AlertsPage from './pages/AlertsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const loggedIn = window.localStorage.getItem("isLoggedInCloudWise");
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage/>,
    },
   
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />},
        { path: ':machineId', element: <DashboardAppPage /> },
        { path: 'forecasts', 
          children: [
          { path: ':machineId',
          element:<ForecastsPage/>}
          ]
        },
        { path: 'alerts', 
        children: [
        { path: ':machineId',
        element:<AlertsPage/>}
        ]
      },
        {
          path: 'alerts',
          element: <AlertsPage />,
        },
      ],
    },
    {
      element: <MachineLayout />,
      children: [
       {path: 'managerMachines',
       element: <UserPage />},
      ]
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />},
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '',
       element: loggedIn ? <Navigate to="/managerMachines" replace /> : <Navigate to="/login" replace />, index: true
    },
    {
      path: '*',
       element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
