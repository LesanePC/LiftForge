import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '../../components/layout/Layout'; // ← убрали default

const DashboardPage = lazy(() => import('../../pages/DashboardPage'));
const NewWorkoutPage = lazy(() => import('../../pages/NewWorkoutPage'));
const HistoryPage = lazy(() => import('../../pages/HistoryPage'));
const ProgressPage = lazy(() => import('../../pages/ProgressPage'));
const ExercisesPage = lazy(() => import('../../pages/ExercisesPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'new-workout',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NewWorkoutPage />
          </Suspense>
        ),
      },
      {
        path: 'history',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HistoryPage />
          </Suspense>
        ),
      },
      {
        path: 'progress',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProgressPage />
          </Suspense>
        ),
      },
      {
        path: 'exercises',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ExercisesPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
  path: 'profile',
  element: (
    <Suspense fallback={<LoadingFallback />}>
      <ProfilePage />
    </Suspense>
  ),
},
]);