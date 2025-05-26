import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Токен баталгаажуулалт алдаатай:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow px-10 py-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3 text-cyan-600 font-bold text-2xl ml-40">
        <Link to="/">Edrug</Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-4 text-base ml-auto">
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 text-cyan-500 font-semibold focus:outline-none"
            >
              {/* Profile initials */}
              <div className="w-8 h-8 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-700 font-bold uppercase">
                {(user.name?.[0] || user.username?.[0] || user.email?.[0]) || "U"}
              </div>
              <span>{user.name || user.username || user.email || "U"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-cyan-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Профайл
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-cyan-50"
                >
                  Гарах
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register">
              <button className="bg-cyan-500 text-white px-5 py-2 rounded-full text-base font-semibold hover:bg-cyan-600">
                Бүртгүүлэх
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-cyan-500 text-white px-5 py-2 rounded-full text-base font-semibold hover:bg-cyan-600">
                Нэвтрэх
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden ml-auto">
        <button className="text-3xl">☰</button>
      </div>
    </nav>
  );
}
