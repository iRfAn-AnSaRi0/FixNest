import { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import Model from "../ui/Model"
import UpdateProfileForm from "../auth/UpdateNameAndPhone"

const AvatarDropdown = () => {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(""); // "name" | "phone"
  const menuRef = useRef();

  // 🔥 close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpenMenu(false);
        setOpenSetting(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const handleLogout = async () => {
    await logout();     // call context logout
    setOpenMenu(false); // 🔥 close dropdown
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    setOpenSetting(false); // 🔥 important
  };

  return (
    <div className="relative hidden lg:block" ref={menuRef}>

      {/* 🔹 AVATAR */}
      <div
        onClick={() => setOpenMenu((prev) => !prev)}
        className="cursor-pointer"
      >
        <Avatar
          name={user?.name}
          size="38"
          round={true}
          className="hidden lg:block"
        />
      </div>

      {/* 🔻 DROPDOWN */}
      <div
        className={`
          absolute right-0 mt-3 w-60
          bg-surface border border-border rounded-xl
          shadow-card z-50 overflow-hidden

          transform transition-all duration-200 origin-top-right
          ${openMenu ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        `}
      >

        {/* 👤 USER INFO */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold text-text font-heading">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-muted font-sans mt-1">
            {/* Logged in */}
            {user?.email || "Email"}
          </p>
          <p className="text-xs text-muted font-sans mt-1">
            {/* Logged in */}
            {user?.phone || "Phone"}
          </p>
        </div>

        {/* 📌 MENU */}
        <div className="text-sm font-sans">

          <Link
            to="/my-bookings?tab=current"
            onClick={handleCloseMenu}
            className="block w-full text-left px-4 py-2 hover:bg-primary/10 transition"
          >
            My Bookings
          </Link>
        </div>

        <div className="text-sm font-sans">
          <Link
            to="/my-bookings?tab=history"
            onClick={handleCloseMenu}
            className="block w-full text-left px-4 py-2 hover:bg-primary/10 transition"
          >
            History
          </Link>
        </div>
        {/* <div className="text-sm font-sans">
          <Link
            to="/setting"
            onClick={() => setOpenMenu(false)}
            className="block w-full text-left px-4 py-2 hover:bg-primary/10 transition"
          >
            Setting
          </Link>
        </div> */}

        <div className="text-sm font-sans relative">

          {/* 🔥 MAIN BUTTON */}
          <button
            onClick={() => setOpenSetting(prev => !prev)}
            className="w-full flex justify-between items-center px-4 py-2 hover:bg-primary/10 transition"
          >
            <span>Setting</span>

            {/* 🔻 ARROW */}
            <span className="text-xs">
              {openSetting ? "▲" : "▼"}
            </span>
          </button>

          {/* 🔽 DROPDOWN */}
          {openSetting && (
            <div className="ml-4 mt-1 border-l border-border">

              <button
                onClick={() => {
                  setFormType("name");
                  setShowModal(true);

                  handleCloseMenu();     // 🔥 CLOSE EVERYTHING
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
              >
                Change Name
              </button>

              <button
                onClick={() => {
                  setFormType("phone");
                  setShowModal(true);
                  handleCloseMenu();     // 🔥 CLOSE EVERYTHING
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
              >
                Change Phone
              </button>

            </div>
          )}

        </div>

        {/* ⚡ DIVIDER */}
        <div className="border-t border-border" />

        {/* 🚪 LOGOUT */}
        <div>
          <Button
            onClick={handleLogout}
            variant="accent"
            className="w-full rounded-none"
          >
            Logout
          </Button>
        </div>

      </div>
      <Model open={showModal} onClose={() => setShowModal(false)}>
        <UpdateProfileForm
          type={formType}
          user={user}
          onClose={() => setShowModal(false)}
        />
      </Model>
    </div >

  );
};

export default AvatarDropdown;