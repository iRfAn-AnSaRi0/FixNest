import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "../auth/AuthModel";
import SidebarModel from "../ui/SideBarModel";
import  UpdateProfileForm  from "../auth/UpdateNameAndPhone";
import { techAuth } from "../../context/AuthContext";
import Model from "../ui/Model"
import Button from "../ui/Button"
import Avatar from "react-avatar";

const MobileNavbar = ({ isOpen, setIsOpen }) => {

  const [openSetting, setOpenSetting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("name");
  const { user, logout, loading, openAuth, setOpenAuth, authType } = techAuth();
  const isPending = user?.status === "pending";

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
            <>
              {/* 👤 USER INFO */}
              <div className="py-3 flex items-center border-b border-border">
                <Avatar
                  name={user?.name}
                  size="40"
                  round={true}
                  className="mb-2 mr-3"
                />
                <div>
                  <p className="text-md font-semibold text-text">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted">
                    {user?.phone || "Phone"}
                  </p>
                </div>
              </div>

              {/* 🟡 PENDING USER */}
              {isPending ? (
                <>
                  <p className="text-warning text-sm mt-2">
                    ⏳ Account under review
                  </p>

                  <Button
                    variant="accent"
                    onClick={() => {
                      logout();
                      handleCloseSidebar();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  {/* 🟢 APPROVED USER */}

                  <Link to="/my-bookings?tab=current" onClick={handleCloseSidebar}>
                    My Booking
                  </Link>

                  <Link to="/my-bookings?tab=history" onClick={handleCloseSidebar}>
                    History
                  </Link>

                  {/* SETTINGS */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => setOpenSetting(prev => !prev)}
                      className="flex justify-between items-center"
                    >
                      <span>Setting</span>
                      <span className="text-sm">
                        {openSetting ? "▲" : "▼"}
                      </span>
                    </button>

                    {openSetting && (
                      <div className="ml-4 mt-1 border-l border-border">

                        <button
                          onClick={() => {
                            setFormType("name");
                            setShowModal(true);
                            handleCloseSidebar();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        >
                          Change Name
                        </button>

                        <button
                          onClick={() => {
                            setFormType("phone");
                            setShowModal(true);
                            handleCloseSidebar();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        >
                          Change Phone
                        </button>

                        <button
                          onClick={() => {
                            setFormType("address");
                            setShowModal(true);
                            handleCloseSidebar();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        >
                          Change Address
                        </button>

                      </div>
                    )}
                  </div>

                  <Button
                    variant="accent"
                    onClick={() => {
                      logout();
                      handleCloseSidebar();
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </>
          ) : null}

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
