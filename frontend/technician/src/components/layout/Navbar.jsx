import { useState, useEffect } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import MobileNavbar from "./MobileNavbar";
import AvatarDropdown from "./AvatarDropdown";
import { techAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = techAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="bg-surface border-b border-border sticky top-0 z-navbar">
        <Container className="flex items-center justify-between h-16">

          {/* 🔹 LOGO */}
          {/* <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="FixNest logo" className="w-8 h-8" />
            <span className="font-heading font-semibold">
              Fix<span className="text-accent font-bold">Nest</span>
            </span>
          </Link> */}

          <div className="text-2xl font-heading font-bold text-primary">
            <Link
              to="/"
              className="flex items-center gap-2 transition duration-200"
            >
              <img
                src={logo}
                alt="FixNest logo"
                className="w-8 h-8 object-contain"
              />

              <span className="font-semibold font-heading">
                Fix<span className="text-accent font-bold">Nest</span>
              </span>
            </Link>
          </div>

          {/* 🔹 RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* 👤 SHOW AVATAR ONLY IF LOGGED IN & DESKTOP */}
            {user && !menuOpen && (
              <div className="hidden lg:block">
                <AvatarDropdown />
              </div>
            )}

            {/* 🍔 HAMBURGER */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>

          </div>
        </Container>
      </header>

      <MobileNavbar isOpen={menuOpen} setIsOpen={setMenuOpen} />
    </>
  );
};

export default Navbar;
