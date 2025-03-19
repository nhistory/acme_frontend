import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white py-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-30 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          ACME Sports
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/nfl-teams" className="hover:text-blue-500">
                NFL Teams
              </Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
