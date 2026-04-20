import { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { adminAuth } from "../../context/AuthContext";
import Button from "../ui/Button";


const AvatarDropdown = () => {
  const { user, logout } = adminAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();


  // 🔥 close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const handleLogout = async () => {
   await logout();     // call context logout
    setOpenMenu(false); // 🔥 close dropdown
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

       

            {/* LOGOUT */}
            <div className="border-t border-border" />
            <Button
              onClick={handleLogout}
              variant="accent"
              className="w-full rounded-none"
            >
              Logout
            </Button>
  
      </div>
    </div >

  );
};

export default AvatarDropdown;