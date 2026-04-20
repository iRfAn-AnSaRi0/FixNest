import { ShieldX } from "lucide-react";
import { techAuth } from "../../context/AuthContext";

const AccessDenied = () => {
  const { logout, setAccessDenied  } = techAuth();

  const handleLogout = async () => {
    setAccessDenied(false);
    await logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md w-full">

        {/* Icon */}
        <div className="flex justify-center">
          <ShieldX className="text-red-500" size={50} />
        </div>

        {/* Code */}
        <h1 className="mt-4 text-6xl font-bold text-red-500">403</h1>

        {/* Title */}
        <h2 className="mt-3 text-2xl font-semibold text-gray-800">
          Access Denied
        </h2>

        {/* Message */}
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          You don’t have permission to access this page. Only technicians are allowed.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          
          {/* Go Home */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90 transition"
          >
            Go to Home
          </button>

        </div>

      </div>
    </div>
  );
};

export default AccessDenied;