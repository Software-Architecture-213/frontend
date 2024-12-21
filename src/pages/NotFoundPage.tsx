import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4 text-gray-700">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export default NotFoundPage;
