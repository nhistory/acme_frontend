import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-14 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} ACME Sports. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
