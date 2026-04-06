import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import DashboardPage from '../../pages/DashboardPage';
import NewWorkoutPage from '../../pages/NewWorkoutPage';
import HistoryPage from '../../pages/HistoryPage';
import ProgressPage from '../../pages/ProgressPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'new-workout', element: <NewWorkoutPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'progress', element: <ProgressPage /> },
    ],
  },
]);