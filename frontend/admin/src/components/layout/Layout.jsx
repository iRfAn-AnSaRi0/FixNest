import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Tabs from "../ui/Tabs";

const AdminLayout = () => {
  return (
    <div className="bg-surface min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Tabs */}
      <Tabs />

      {/* Page Content */}
      <div className="px-4">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;