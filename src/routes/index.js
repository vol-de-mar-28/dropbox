import { useRoutes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Folder from '../pages/Folder';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/:pathParam1?/:pathParam2?/:pathParam3?/:pathParam4?/:pathParam5?/:pathParam6?/:pathParam7?/:pathParam8?',
      element: <Folder />,
    },
  ]);
}
