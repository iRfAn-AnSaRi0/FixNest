import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { techAuth } from "../../context/AuthContext";
import { login } from "../../services/SignupAndLoginApi";

const LoginForm = ({ onClose, switchToSignup, onSubmit }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const {user} = techAuth();
//   const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) return setError("Phone number is required");
    if (!/^[0-9]{10}$/.test(phone))
      return setError("Enter valid 10-digit phone number");

    setLoading(true)

    try {
       const res = await login({ phone })
        console.log(res.data);
      // ✅ FAKE DELAY (optional, for realistic feel)
    // await new Promise((resolve) => setTimeout(resolve, 800));

    // // ✅ FAKE SUCCESS
    // toast.success("OTP sent successfully");

      // toast.success(res.data.message);  
      onSubmit(phone) // 🔥 GO TO OTP
      // setOtp(res.data.otp) // 🔥 TEMP: show OTP in console for testing
    } catch (error) {
       console.error(error.response || "Something went wrong")
       toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // 🔥 stop loading ALWAYS
    }

  };

  return (
    <div className="relative">


      <button
        // onClick={onClose}
        // className="absolute top-0 right-0 text-muted hover:text-text text-lg"
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
          Enter your phone number to continue
        </p>
      </div>


      <form onSubmit={handleSubmit} className="space-y-5">

        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {error && (
          <p className="text-sm text-danger">{error}</p>
        )}

        {/* <Button variant="accent" className="w-full">
          Continue
        </Button> */}


        <Button variant="accent" disabled={loading} className="w-full">
          {/* {loading ? "Sending OTP..." : "Continue"} */}
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Sending OTP...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>


      <p className="text-sm text-center text-muted mt-6">
        New here?{" "}
        <span
           onClick={() => {
            if (!loading) switchToSignup();
          }}
          className={`text-accent font-medium hover:underline ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
        >
          Sign up
        </span>
      </p>

    </div>


  );
};

export default LoginForm;