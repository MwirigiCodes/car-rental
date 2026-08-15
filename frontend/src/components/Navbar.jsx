import { useState } from "react";
import { Link, NavLink } from "react-router";
import { HamburgerMenu } from "iconsax-reactjs";
// import { AnimatePresence, motion } from "motion/react";
// TODO: install motion package

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navlinks = [
    { nav: "Home", path: "/" },
    { nav: "Cars", path: "/cars" },
    { nav: "About", path: "/about" },
    { nav: "Contact", path: "/contact" },
  ];
  return (
    <header className="flex justify-between items-center p-4 backdrop-blur-2xl shadow-sm rounded-full">
      <h3 className="font-semibold tracking-widest">Car Rental</h3>
      <nav className="hidden md:flex gap-x-5">
        {navlinks.map(({ nav, path }) => (
          <NavLink
            to={path}
            key={nav}
            className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            {nav}
          </NavLink>
        ))}
      </nav>
      <div className="hidden md:flex space-x-5">
        <button className="border rounded px-3 py-1">
          <Link to="/auth/login" class>
            Login
          </Link>
        </button>
        <button className="bg-blue-500 text-blue-50 px-3 py-1 rounded">
          <Link to="/auth/signup">Get started</Link>
        </button>
      </div>
      <div className="md:hidden flex justify-center">
        {!menuOpen ? (
          <HamburgerMenu onClick={() => setMenuOpen((prev) => !prev)} />
        ) : (
          <button onClick={() => setMenuOpen((prev) => !prev)}>X</button>
        )}
      </div>
      {menuOpen && (
        <div className="absolute top-20 left-0 z-40 min-h-screen w-full flex justify-center">
          <nav className="flex flex-col gap-y-5 items-center mt-35">
            {navlinks.map(({ nav, path }) => (
              <Link to={path} key={path} className="text-2xl">
                {nav}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
