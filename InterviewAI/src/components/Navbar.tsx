import React from "react";
import logo from "../resources/InterviewAI.png";

const Navbar: React.FC = () => {
  return (
    <header className="bg-white text-black p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="InterviewAI logo" className="h-12 mr-8" />
          </a>
          <div className="hidden md:flex gap-8">
            <a href="/explore" className="hover:text-purple-600">
              Explore
            </a>
            <a href="/pricing" className="hover:text-purple-600">
              Pricing
            </a>
            <a href="/enterprise" className="hover:text-purple-600">
              Enterprise
            </a>
            <a href="/resources" className="hover:text-purple-600">
              Resources
            </a>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button className="text-white bg-purple-600 px-6 py-2 rounded-md shadow-md">
            Log In
          </button>
          <button className="text-white bg-red-500 px-6 py-2 rounded-md shadow-md">
            Join for free
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
