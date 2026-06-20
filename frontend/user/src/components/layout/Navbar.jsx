import { useState, useEffect } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
// import logo from "../../assets/FixNest-logo.png"
import MobileNavbar from "./MobileNavbar";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModel";
import { useAuth } from "../../context/AuthContext";
import AvatarDropdown from "./AvatarDropdown";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  //  const [openAuth, setOpenAuth] = useState(false);
  //  const [authType, setAuthType] = useState("login")

const { user, loading, authType, setAuthType, openAuth, setOpenAuth } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      <header className="bg-surface border-b border-border sticky top-0 z-navbar">
        <Container className="flex items-center justify-between h-16">
          <div className="text-2xl font-heading font-bold text-primary">
            <Link
              to="/"
              className="flex items-center gap-2 transition duration-200"
            >
              <img
                src={logo}
                alt="FixNest logo"
                className="w-10 h-10 object-contain"
              />

              <span className="font-semibold font-heading pt-1">
                Fix<span className="text-accent font-bold">Nest</span>
              </span>
            </Link>
          </div>
          <nav className="hidden lg:flex font-sans items-center gap-8 font-medium text-text">
            <Link
              to="/services"
              className="hover:text-primary transition duration-200"
            >
              Services
            </Link>

            <Link
              to="/how-it-works"
              className="hover:text-primary transition duration-200"
            >
              How It Works
            </Link>

            <Link
              to="/help"
              className="hover:text-primary transition duration-200"
            >
              Help
            </Link>

            <Link
              to="/professionals"
              className="hover:text-primary transition duration-200"
            >
              For Professionals
            </Link>
          </nav>

          {loading ? (
            // 🔥 Skeleton (no flicker)
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-20 h-8 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          ) : user ? (
            // ✅ Logged in
            <AvatarDropdown />
          ) : (
            // ❌ Not logged in
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setAuthType("login");
                  setOpenAuth(true);
                  // console.log(authType);
                  
                }}
              >
                Sign in
              </Button>

              <Button
                variant="accent"
                onClick={() => {
                  setAuthType("register");
                  setOpenAuth(true);
                  // console.log(authType);
                  
                }}
              >
                Get Started
              </Button>
            </div>
          )}

          <button
            className="lg:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </Container>
      </header>
      <MobileNavbar isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <AuthModal
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        initialStep={authType}
      />

    </>
  );
};

export default Navbar;
