import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "../auth/AuthModel";
import SidebarModel from "../ui/SideBarModel";
import UpdateProfileForm from "../auth/UpdateNameAndPhone";
import { useAuth } from "../../context/AuthContext";
import Model from "../ui/Model"
import Button from "../ui/Button"
import Avatar from "react-avatar";

const MobileNavbar = ({ isOpen, setIsOpen }) => {

  // const [openAuth, setOpenAuth] = useState(false);
  // const [authType, setAuthType] = useState("login")
  const [openSetting, setOpenSetting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("name");
  const { user, logout, loading, openAuth, setOpenAuth, authType, setAuthType } = useAuth();

  const handleCloseSidebar = () => {
    setIsOpen(false);
    setOpenSetting(false); 
  };

  return (
    <>

      <SidebarModel isOpen={isOpen} onClose={handleCloseSidebar}>

        <nav className="flex flex-col font-sans gap-6 text-text text-lg font-medium">

          {/* 🔥 AUTH SECTION */}
          {loading ? (
            // ✅ Skeleton
            <div className="px-4 py-3 border-b border-border">
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse mb-2"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : user ? (
            // ✅ Logged in
            <>
              <div className="py-3 flex items-center border-b border-border">
                <Avatar
                  name={user.name}
                  size="40"
                  round={true}
                  className="mb-2 mr-3"
                />
                <div>
                  <p className="text-md font-semibold text-text font-heading">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs text-muted font-sans">
                    {user?.email || "Email"}
                  </p>

                  <p className="text-xs text-muted font-sans">
                    {user?.phone || "Phone"}
                  </p>
                </div>
              </div>

              <Link to="/my-bookings?tab=current" onClick={() => setIsOpen(false)}>
                My Booking
              </Link>

              <Link to="/my-bookings?tab=history" onClick={() => setIsOpen(false)}>
                History
              </Link>

              {/* <Link to="/settings" onClick={() => setIsOpen(false)}>
                Setting
              </Link> */}
              <div className="flex flex-col">

                {/* 🔥 Setting button */}
                <button
                  onClick={() => setOpenSetting(prev => !prev)}
                  className="flex justify-between items-center"
                >
                  <span>Setting</span>
                  <span className="text-sm">
                    {openSetting ? "▲" : "▼"}
                  </span>
                </button>

                {/* 🔽 Submenu */}
                {openSetting && (

                  <div className="ml-4 mt-1 border-l border-border">

                    <button
                      onClick={() => {
                        setFormType("name");
                        setShowModal(true);
                        setIsOpen(false);
                        setOpenSetting(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition"
                    >
                      Change Name
                    </button>

                    <button
                      onClick={() => {
                        setFormType("phone");
                        setShowModal(true);
                        setIsOpen(false);
                        setOpenSetting(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition"
                    >
                      Change Phone
                    </button>

                  </div>
                )}
              </div>
            </>
          ) : null}

          {/* 🔥 COMMON LINKS (always visible) */}
          <Link to="/services" onClick={() => setIsOpen(false)}>
            Services
          </Link>

          <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
            How It Works
          </Link>

          <Link to="/help" onClick={() => setIsOpen(false)}>
            Help
          </Link>

          <Link to="/professionals" onClick={() => setIsOpen(false)}>
            For Professionals
          </Link>

          {user ? (
            <>
              <Button variant="accent" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>

              <Button variant="accent" onClick={() => { setOpenAuth(true), setAuthType("signup") }}>
                Get Started
              </Button>

              <Button variant="outline" className="mt-[-15px]" onClick={() => { setOpenAuth(true), setAuthType("login") }}>
                Sign in
              </Button>
            </>
          )}

        </nav>

      </SidebarModel>


      <AuthModal
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        initialStep={authType}
      />

      <Model open={showModal} onClose={() => setShowModal(false)}>
        <UpdateProfileForm
          type={formType}
          onClose={() => setShowModal(false)}
        />
      </Model>

    </>
  )
}

export default MobileNavbar
