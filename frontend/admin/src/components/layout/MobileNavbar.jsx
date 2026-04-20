import SidebarModel from "../ui/SideBarModel";
import { adminAuth } from "../../context/AuthContext";
import Button from "../ui/Button"
import Avatar from "react-avatar";

const MobileNavbar = ({ isOpen, setIsOpen }) => {

  const { user, logout, loading} = adminAuth();

  const handleCloseSidebar = () => {
    setIsOpen(false);
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
            
                  ):( null )}
        </nav>

      </SidebarModel>


    </>
  )
}

export default MobileNavbar
