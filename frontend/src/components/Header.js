import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">MindsDB KB</a>
        <div>
          <a href="/" className="px-4 py-2 rounded hover:bg-blue-700">Home</a>
          <a href="/kbs" className="px-4 py-2 rounded hover:bg-blue-700">Knowledge Bases</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
