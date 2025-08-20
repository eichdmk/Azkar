import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">📿 Азкары</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Главная</Link></li>
            <li><Link to="/morning" className="hover:underline">Утро</Link></li>
            <li><Link to="/evening" className="hover:underline">Вечер</Link></li>
            <li><Link to="/general" className="hover:underline">Общие</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;