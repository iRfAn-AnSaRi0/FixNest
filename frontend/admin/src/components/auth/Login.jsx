import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { adminAuth } from "../../context/AuthContext";
import { login } from "../../services/LoginApi";

const Login = ({ onClose }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = adminAuth(); // ✅ use setter

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) return setError("Phone number is required");
    if (!/^[0-9]{10}$/.test(phone))
      return setError("Enter valid 10-digit phone number");

    if (!password) return setError("Password is required");

    setLoading(true);
    const data = { phone, password };
    try {
      const res = await login(data);
      // console.log(res.data.data);

      // ✅ Set user (optional if /me is used)
      localStorage.setItem("token", res.data.data.token)
      setUser(res.data.data);
       
      toast.success(res.data.message || "Login successful");

      onClose(); // ✅ close modal

      // 👉 optional redirect
      // navigate("/admin/dashboard");

    } catch (error) {
      console.error(error.response || "Something went wrong");
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">

      <button
        onClick={() => {
          if (user) onClose(); // ✅ only allow if logged in
        }}
        className={`absolute top-0 right-0 text-lg ${!user ? "opacity-40 cursor-not-allowed" : "hover:text-text"
          }`}
      >
        ✕
      </button>

      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Fix<span className="text-accent">Nest</span>
        </h2>
        <p className="text-sm text-muted mt-1">
          Admin Login
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button variant="accent" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>

      </form>
    </div>
  );
};

export default Login;