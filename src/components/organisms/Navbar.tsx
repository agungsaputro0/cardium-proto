import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { UseScroll } from '../hooks/UseScroll';
import { Link, useLocation } from 'react-router-dom'; 
import useIsMobile from '../hooks/useMobile';
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const navigation = [
  { name: 'Beranda', to: '/Welcome', current: false },
  { name: 'EnsycloCardium', to: '/EnsycloCardium', current: false },
  { name: 'Kalkulator Jantung', to: '/HeartCalculator', current: false },
  { name: 'Tentang Kami', to: '/AboutUs', current: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const isScrolled = UseScroll();
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <Disclosure as="nav" className={`${isScrolled ? 'bg-black/50' : 'bg-maintheme'} transition duration-300 w-full fixed z-50`}>
      {() => (
        <>
         {!isScrolled && (
            <svg
              className="absolute top-0 right-0 w-3/5 md:w-1/2 h-full opacity-25"
              viewBox="0 0 500 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Poligon kiri pertama */}
              <polygon points="160,10 240,0 220,60 140,80" fill="white" />
              
              {/* Poligon kanan pertama */}
              <polygon points="280,20 350,0 330,80 220,100" fill="white" />

              {/* Poligon kiri tambahan (lebih kanan dan miring) */}
              <polygon points="360,10 440,0 420,60 340,80" fill="white" transform="rotate(5,400,40)" />

              {/* Poligon kanan tambahan (lebih kanan dan sedikit lebih besar) */}
              <polygon points="430,15 500,0 480,80 380,100" fill="white" transform="rotate(-3,460,50)" />

              {/* Beberapa lingkaran tambahan untuk variasi */}
              <circle cx="200" cy="50" r="10" fill="white" />
              <circle cx="300" cy="80" r="8" fill="white" />
              <circle cx="400" cy="30" r="6" fill="white" />
              <circle cx="460" cy="70" r="12" fill="white" />

              {/* Garis diagonal tambahan */}
              <line x1="150" y1="10" x2="500" y2="110" stroke="white" strokeWidth="2" />
              <line x1="190" y1="0" x2="500" y2="90" stroke="white" strokeWidth="1.5" />

              {/* Persegi miring tambahan */}
              <rect x="260" y="20" width="30" height="30" fill="white" transform="rotate(20,260,20)" />
              <rect x="370" y="40" width="25" height="25" fill="white" transform="rotate(-15,370,40)" />
              <rect x="450" y="50" width="28" height="28" fill="white" transform="rotate(10,450,50)" />
            </svg>
          )}
          <div className="w-screen">
            <div className="relative flex h-16 ml-[10px] mr-[10px] items-center justify-between px-2 sm:px-6 lg:px-8">
              <div className="flex flex-1 w-[100vw] items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/assets/img/cardium-logo.png" 
                  alt="Cardium Logo"
                  className="h-10 w-30 min-w-30"
                />
                {/* <b className="text-white"><span className="text-amber-400">| Terra</span>Hive</b> */}
              </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.to;

                    return (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          isActive ? 'text-white border-b-2 border-white pb-[6px] rounded-none' : 
                          isScrolled ? 'text-white hover:bg-[#c2beba]' : 'text-white hover:bg-[#c2beba] hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {!isMobile && (
                  <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="text-white border border-white relative flex items-center gap-2 rounded-md text-sm hover:bg-[#c2beba]/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:text-white focus:ring-offset-gray-800 transition-all px-3 py-2">
                      <span className="sr-only">Open user menu</span>
                      <span className="font-bold text-sm hidden sm:inline">Sign Up | Log In</span>
                    </Menu.Button>
                  </div>
                
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="transform opacity-0 scale-90"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white/80 backdrop-blur-md shadow-xl ring-1 ring-black/10 focus:outline-none border border-gray-300 overflow-hidden">
                      <div className="px-4 py-2 text-xs bg-footerbody text-boldmaintheme font-semibold border-b border-gray-200">Masuk ke Akun</div>
                
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center gap-2 px-4 py-3 text-sm text-gray-800 transition-all"
                            )}
                          >
                            <FaSignInAlt className="text-gray-500" />
                            Login
                          </Link>
                        )}
                      </Menu.Item>
                
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/SignUp"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center gap-2 px-4 py-3 text-sm text-gray-800 transition-all"
                            )}
                          >
                            <FaUserPlus className="text-gray-500" />
                            Sign Up
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                >
                  <Disclosure.Button
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : isScrolled ? 'text-white hover:bg-gray-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
