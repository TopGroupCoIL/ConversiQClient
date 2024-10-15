import { Outlet } from 'react-router-dom';

export const Administration = () => (
  <div className="w-full h-full py-16 px-4 overflow-auto">
    <Outlet />
  </div>
);
