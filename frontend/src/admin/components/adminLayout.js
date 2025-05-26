import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAdminInfo({
        name: "Admin User",
        email: "admin@example.com",
      });
    } else {
      setAdminInfo(null);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
              </svg>
            </button>
            <Link to="/dashboard" className="ml-2 text-xl font-semibold dark:text-white">
              Удирдлага
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/your-repo"
              className="hidden sm:inline-block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 rounded-lg"
            >
              GitHub
            </a>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 z-50 my-4 w-48 bg-white rounded shadow dark:bg-gray-700">
                  {adminInfo ? (
                    <>
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 dark:text-white">{adminInfo.name}</p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                          {adminInfo.email}
                        </p>
                      </div>
                      <ul className="py-1">
                        <li>
                          <Link
                            to="/account"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                          >
                            Account
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">Нэвтрээгүй байна</p>
                      <Link
                        to="/admin/login"
                        className="block mt-2 px-4 py-2 text-sm text-blue-600 hover:underline"
                      >
                        Нэвтрэх
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const menuItems = [
    { 
      name: 'users',
      label: 'Хэрэглэгч',
      path: '/dashboard'
    },
    { 
      name: 'medicines',
      label: 'Эм',
      path: '/dashboard/medicines'
    },
    { 
      name: 'news',
      label: 'Мэдээ',
      path: '/dashboard/news'
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={closeSidebar}
                >
                  <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d={item.icon} />
                  </svg>
                  <span className="ms-3">{item.label}</span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => setIsPagesOpen(!isPagesOpen)}
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
                <span className="flex-1 ms-3 text-left whitespace-nowrap">Бусад</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isPagesOpen ? "M5 5 1 1l4 4" : "m1 1 4 4 4-4"}/>
                </svg>
              </button>
              
              {isPagesOpen && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      onClick={closeSidebar}
                    >
                      Нэвтрэх
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <Sidebar isOpen={isMobileMenuOpen} closeSidebar={() => setIsMobileMenuOpen(false)} />
      
      <main className="p-4 sm:ml-64 pt-20">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;