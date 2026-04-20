import { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { techAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import Model from "../ui/Model"
import UpdateProfileForm from "../auth/UpdateNameAndPhone"

const AvatarDropdown = () => {
  const { user, logout } = techAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(""); // "name" | "phone"
  const menuRef = useRef();

  const isPending = user?.status === "pending";

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
    <div className="relative" ref={menuRef}>

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
          <p className="text-sm font-semibold text-text">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-muted mt-1">
            {user?.phone || "Phone"}
          </p>
        </div>

        {/* 🟡 PENDING USER → ONLY LOGOUT */}
        {isPending ? (
          <div>
            <div className="px-4 py-3 text-xs text-warning">
              Account under review
            </div>

            <Button
              onClick={handleLogout}
              variant="accent"
              className="w-full rounded-none"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            {/* ✅ FULL ACCESS USER */}

            <div className="text-sm">
              <Link
                to="/dashboard"
                onClick={handleCloseMenu}
                className="block px-4 py-2 hover:bg-primary/10"
              >
                Dashboard
              </Link>
            </div>

            {/* SETTINGS */}
            <div className="relative">
              <button
                onClick={() => setOpenSetting(prev => !prev)}
                className="w-full flex justify-between px-4 py-2 hover:bg-primary/10"
              >
                Setting
                <span>{openSetting ? "▲" : "▼"}</span>
              </button>

              {openSetting && (
                <div className="ml-4 border-l border-border">
                  <button
                    onClick={() => {
                      setFormType("name");
                      setShowModal(true);
                      handleCloseMenu();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-primary/10"
                  >
                    Change Name
                  </button>

                  <button
                    onClick={() => {
                      setFormType("phone");
                      setShowModal(true);
                      handleCloseMenu();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-primary/10"
                  >
                    Change Phone
                  </button>

                  <button
                    onClick={() => {
                      setFormType("address");
                      setShowModal(true);
                      handleCloseMenu();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-primary/10"
                  >
                    Change Address
                  </button>
                </div>
              )}
            </div>

            {/* LOGOUT */}
            <div className="border-t border-border" />
            <Button
              onClick={handleLogout}
              variant="accent"
              className="w-full rounded-none"
            >
              Logout
            </Button>
          </>
        )}
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