import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold tracking-wider">MindsDB KB</a>
        <div className="space-x-4">
          <a href="/" className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">Home</a>
          <a href="/kbs" className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">Knowledge Bases</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
