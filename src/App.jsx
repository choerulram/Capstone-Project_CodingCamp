import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          React + Tailwind + Webpack
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-700 text-lg">
            If you can see this styled with Tailwind CSS, everything is working!
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
