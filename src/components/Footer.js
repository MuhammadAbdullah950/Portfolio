import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-300 py-6 text-center">
      <div className="container mx-auto px-6">
        <p>© {new Date().getFullYear()} Muhammad Abdullah. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;